import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/jwt";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";

export const runtime = "nodejs";

const MAX_FILE_SIZE = 5 * 1024 * 1024;

const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
] as const;

type ProfessionalType = "doctor" | "consultant" | "clinic";

type StorageConfig = {
  bucket: "doctor-photos" | "consultants" | "clinics";
  pathPrefix: "doctors" | "consultants" | "clinics";
  table: "doctors" | "consultants" | "clinics";
};

function getStorageConfig(type: string): StorageConfig | null {
  switch (type) {
    case "doctor":
      return {
        bucket: "doctor-photos",
        pathPrefix: "doctors",
        table: "doctors",
      };

    case "consultant":
      return {
        bucket: "consultants",
        pathPrefix: "consultants",
        table: "consultants",
      };

    case "clinic":
      return {
        bucket: "clinics",
        pathPrefix: "clinics",
        table: "clinics",
      };

    default:
      return null;
  }
}

function isAllowedImageType(type: string): boolean {
  return (ALLOWED_IMAGE_TYPES as readonly string[]).includes(type);
}

function getFileExtension(fileName: string): string {
  const extension = fileName.split(".").pop()?.toLowerCase();

  if (
    extension === "jpg" ||
    extension === "jpeg" ||
    extension === "png" ||
    extension === "webp"
  ) {
    return extension;
  }

  return "jpg";
}

function generateFileName(fileName: string): string {
  const extension = getFileExtension(fileName);

  return `${Date.now()}-${crypto.randomUUID()}.${extension}`;
}

async function getAdmin() {
  const cookieStore = await cookies();

  const token = cookieStore.get("auth-token")?.value;

  if (!token) {
    return null;
  }

  const user = await verifyToken(token);

  if (!user) {
    return null;
  }

  if (user.role !== "admin") {
    return null;
  }

  return user;
}

/**
 * تبدیل خطاهای Supabase به متن قابل نمایش
 */
function getSupabaseError(error: unknown): string {
  if (!error) {
    return "خطای نامشخص";
  }

  if (typeof error === "object" && error !== null) {
    const supabaseError = error as {
      message?: string;
      details?: string;
      hint?: string;
      code?: string;
    };

    return [
      supabaseError.message,
      supabaseError.details,
      supabaseError.hint,
      supabaseError.code ? `code=${supabaseError.code}` : undefined,
    ]
      .filter(Boolean)
      .join(" | ");
  }

  return String(error);
}

/* =========================================================
   POST
   آپلود عکس متخصص - فقط ادمین
========================================================= */

export async function POST(request: NextRequest) {
  let uploadedPath: string | null = null;
  let supabaseAdmin;

  try {
    // -----------------------------------------------------
    // 1. بررسی ادمین
    // -----------------------------------------------------

    const admin = await getAdmin();

    if (!admin) {
      return NextResponse.json(
        {
          ok: false,
          error: "دسترسی غیرمجاز. فقط ادمین می‌تواند تصویر آپلود کند.",
        },
        { status: 403 },
      );
    }

    // -----------------------------------------------------
    // 2. ساخت Supabase Admin Client
    // -----------------------------------------------------

    try {
      supabaseAdmin = getSupabaseAdmin();
    } catch (error) {
      console.error(
        "[admin/photo] Supabase Admin initialization error:",
        error,
      );

      return NextResponse.json(
        {
          ok: false,
          error: "اتصال مدیریتی به Supabase برقرار نشد.",
          details: getSupabaseError(error),
        },
        { status: 500 },
      );
    }

    // -----------------------------------------------------
    // 3. دریافت FormData
    // -----------------------------------------------------

    const formData = await request.formData();

    const file = formData.get("file");
    const professionalId = formData.get("professionalId");
    const type = formData.get("type");

    // -----------------------------------------------------
    // 4. بررسی فایل
    // -----------------------------------------------------

    if (!(file instanceof File)) {
      return NextResponse.json(
        {
          ok: false,
          error: "فایل تصویر ارسال نشده است.",
        },
        { status: 400 },
      );
    }

    // -----------------------------------------------------
    // 5. بررسی ID
    // -----------------------------------------------------

    if (typeof professionalId !== "string" || !professionalId.trim()) {
      return NextResponse.json(
        {
          ok: false,
          error: "شناسه متخصص ارسال نشده است.",
        },
        { status: 400 },
      );
    }

    const normalizedProfessionalId = professionalId.trim();

    // -----------------------------------------------------
    // 6. بررسی نوع متخصص
    // -----------------------------------------------------

    if (typeof type !== "string" || !type.trim()) {
      return NextResponse.json(
        {
          ok: false,
          error: "نوع متخصص مشخص نشده است.",
        },
        { status: 400 },
      );
    }

    const normalizedType = type.trim().toLowerCase();

    const config = getStorageConfig(normalizedType);

    if (!config) {
      return NextResponse.json(
        {
          ok: false,
          error: "نوع متخصص باید doctor، consultant یا clinic باشد.",
        },
        { status: 400 },
      );
    }

    // -----------------------------------------------------
    // 7. بررسی حجم فایل
    // -----------------------------------------------------

    if (file.size === 0) {
      return NextResponse.json(
        {
          ok: false,
          error: "فایل تصویر خالی است.",
        },
        { status: 400 },
      );
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        {
          ok: false,
          error: "حجم تصویر نباید بیشتر از ۵ مگابایت باشد.",
        },
        { status: 400 },
      );
    }

    // -----------------------------------------------------
    // 8. بررسی فرمت
    // -----------------------------------------------------

    if (!isAllowedImageType(file.type)) {
      return NextResponse.json(
        {
          ok: false,
          error: "فرمت تصویر باید JPG، PNG یا WEBP باشد.",
        },
        { status: 400 },
      );
    }

    // -----------------------------------------------------
    // 9. پیدا کردن متخصص
    //
    // فقط id را می‌گیریم.
    // این کار باعث می‌شود اگر photo_url مشکل داشته باشد،
    // مرحله پیدا کردن متخصص خراب نشود.
    // -----------------------------------------------------

    console.log("[admin/photo] Looking for professional:", {
      table: config.table,
      id: normalizedProfessionalId,
      type: normalizedType,
    });

    const { data: professional, error: professionalError } = await supabaseAdmin
      .from(config.table)
      .select("id")
      .eq("id", normalizedProfessionalId)
      .maybeSingle();

    if (professionalError) {
      console.error(
        "[admin/photo] PROFESSIONAL LOOKUP ERROR:",
        professionalError,
      );

      return NextResponse.json(
        {
          ok: false,
          error: "خطا در دریافت اطلاعات متخصص.",
          details: getSupabaseError(professionalError),
          table: config.table,
          professionalId: normalizedProfessionalId,
        },
        { status: 500 },
      );
    }

    if (!professional) {
      console.error("[admin/photo] Professional not found:", {
        table: config.table,
        id: normalizedProfessionalId,
      });

      return NextResponse.json(
        {
          ok: false,
          error: "متخصص موردنظر پیدا نشد.",
          table: config.table,
          professionalId: normalizedProfessionalId,
        },
        { status: 404 },
      );
    }

    // -----------------------------------------------------
    // 10. ساخت مسیر فایل
    // -----------------------------------------------------

    const fileName = generateFileName(file.name);

    const filePath =
      `${config.pathPrefix}/` + `${normalizedProfessionalId}/` + fileName;

    uploadedPath = filePath;

    console.log("[admin/photo] Uploading file:", {
      bucket: config.bucket,
      path: filePath,
      size: file.size,
      type: file.type,
    });

    // -----------------------------------------------------
    // 11. تبدیل فایل به Buffer
    // -----------------------------------------------------

    const arrayBuffer = await file.arrayBuffer();

    const fileBuffer = Buffer.from(arrayBuffer);

    // -----------------------------------------------------
    // 12. آپلود به Storage
    // -----------------------------------------------------

    const { error: uploadError } = await supabaseAdmin.storage
      .from(config.bucket)
      .upload(filePath, fileBuffer, {
        contentType: file.type,
        cacheControl: "3600",
        upsert: false,
      });

    if (uploadError) {
      console.error("[admin/photo] STORAGE UPLOAD ERROR:", uploadError);

      return NextResponse.json(
        {
          ok: false,
          error: "آپلود تصویر در Storage انجام نشد.",
          details: getSupabaseError(uploadError),
          bucket: config.bucket,
          path: filePath,
        },
        { status: 500 },
      );
    }

    console.log("[admin/photo] File uploaded successfully.");

    // -----------------------------------------------------
    // 13. گرفتن Public URL
    // -----------------------------------------------------

    const { data: publicUrlData } = supabaseAdmin.storage
      .from(config.bucket)
      .getPublicUrl(filePath);

    const publicUrl = publicUrlData?.publicUrl;

    console.log("[admin/photo] Public URL:", publicUrl);

    if (!publicUrl) {
      await supabaseAdmin.storage.from(config.bucket).remove([filePath]);

      uploadedPath = null;

      return NextResponse.json(
        {
          ok: false,
          error: "آدرس عمومی تصویر ساخته نشد.",
        },
        { status: 500 },
      );
    }

    // -----------------------------------------------------
    // 14. ذخیره URL در Database
    // -----------------------------------------------------

    console.log("[admin/photo] Updating photo_url:", {
      table: config.table,
      id: normalizedProfessionalId,
      url: publicUrl,
    });

    const { error: updateError } = await supabaseAdmin
      .from(config.table)
      .update({
        photo_url: publicUrl,
      })
      .eq("id", normalizedProfessionalId);

    if (updateError) {
      console.error("[admin/photo] PHOTO URL UPDATE ERROR:", updateError);

      // اگر ثبت URL شکست خورد، فایل آپلودشده را پاک کن
      await supabaseAdmin.storage.from(config.bucket).remove([filePath]);

      uploadedPath = null;

      return NextResponse.json(
        {
          ok: false,
          error: "عکس آپلود شد اما آدرس آن در پایگاه داده ذخیره نشد.",
          details: getSupabaseError(updateError),
          table: config.table,
        },
        { status: 500 },
      );
    }

    // -----------------------------------------------------
    // 15. موفقیت
    // -----------------------------------------------------

    console.log("[admin/photo] PHOTO UPLOAD COMPLETE:", {
      id: normalizedProfessionalId,
      type: normalizedType,
      bucket: config.bucket,
      path: filePath,
      url: publicUrl,
    });

    return NextResponse.json(
      {
        ok: true,
        message: "تصویر با موفقیت آپلود و ذخیره شد.",
        url: publicUrl,
        path: filePath,
        professionalId: normalizedProfessionalId,
        type: normalizedType,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("[admin/photo] UNEXPECTED ERROR:", error);

    // اگر فایل آپلود شده ولی خطای غیرمنتظره رخ داده،
    // تلاش برای حذف فایل
    if (uploadedPath && supabaseAdmin) {
      try {
        const typeFromRequest = request.headers.get("x-professional-type");

        console.error("[admin/photo] Uploaded file may need cleanup:", {
          uploadedPath,
          typeFromRequest,
        });
      } catch {
        // ignore cleanup logging error
      }
    }

    return NextResponse.json(
      {
        ok: false,
        error: "خطایی هنگام آپلود تصویر رخ داد.",
        details: getSupabaseError(error),
      },
      { status: 500 },
    );
  }
}

/* =========================================================
   DELETE
   حذف عکس - فقط ادمین
========================================================= */

export async function DELETE(request: NextRequest) {
  let supabaseAdmin;

  try {
    // -----------------------------------------------------
    // 1. بررسی ادمین
    // -----------------------------------------------------

    const admin = await getAdmin();

    if (!admin) {
      return NextResponse.json(
        {
          ok: false,
          error: "دسترسی غیرمجاز.",
        },
        { status: 403 },
      );
    }

    // -----------------------------------------------------
    // 2. Supabase Admin
    // -----------------------------------------------------

    try {
      supabaseAdmin = getSupabaseAdmin();
    } catch (error) {
      console.error("[admin/photo DELETE] Supabase Admin error:", error);

      return NextResponse.json(
        {
          ok: false,
          error: "اتصال مدیریتی به Supabase برقرار نشد.",
          details: getSupabaseError(error),
        },
        { status: 500 },
      );
    }

    // -----------------------------------------------------
    // 3. دریافت اطلاعات
    // -----------------------------------------------------

    const body = await request.json();

    const path = typeof body.path === "string" ? body.path.trim() : "";

    const type =
      typeof body.type === "string" ? body.type.trim().toLowerCase() : "";

    const professionalId =
      typeof body.professionalId === "string" ? body.professionalId.trim() : "";

    // -----------------------------------------------------
    // 4. اعتبارسنجی
    // -----------------------------------------------------

    if (!path) {
      return NextResponse.json(
        {
          ok: false,
          error: "مسیر تصویر مشخص نشده است.",
        },
        { status: 400 },
      );
    }

    if (!professionalId) {
      return NextResponse.json(
        {
          ok: false,
          error: "شناسه متخصص مشخص نشده است.",
        },
        { status: 400 },
      );
    }

    const config = getStorageConfig(type);

    if (!config) {
      return NextResponse.json(
        {
          ok: false,
          error: "نوع متخصص باید doctor، consultant یا clinic باشد.",
        },
        { status: 400 },
      );
    }

    // -----------------------------------------------------
    // 5. جلوگیری از حذف فایل خارج از پوشه متخصص
    // -----------------------------------------------------

    const expectedPrefix = `${config.pathPrefix}/${professionalId}/`;

    if (!path.startsWith(expectedPrefix)) {
      return NextResponse.json(
        {
          ok: false,
          error: "مسیر تصویر معتبر نیست.",
        },
        { status: 400 },
      );
    }

    // -----------------------------------------------------
    // 6. حذف فایل
    // -----------------------------------------------------

    const { error: deleteError } = await supabaseAdmin.storage
      .from(config.bucket)
      .remove([path]);

    if (deleteError) {
      console.error("[admin/photo DELETE] STORAGE DELETE ERROR:", deleteError);

      return NextResponse.json(
        {
          ok: false,
          error: "حذف تصویر از Storage انجام نشد.",
          details: getSupabaseError(deleteError),
        },
        { status: 500 },
      );
    }

    // -----------------------------------------------------
    // 7. خالی کردن photo_url
    // -----------------------------------------------------

    const { error: updateError } = await supabaseAdmin
      .from(config.table)
      .update({
        photo_url: null,
      })
      .eq("id", professionalId);

    if (updateError) {
      console.error("[admin/photo DELETE] DATABASE UPDATE ERROR:", updateError);

      return NextResponse.json(
        {
          ok: false,
          error: "تصویر حذف شد اما آدرس تصویر از پایگاه داده پاک نشد.",
          details: getSupabaseError(updateError),
        },
        { status: 500 },
      );
    }

    return NextResponse.json(
      {
        ok: true,
        message: "تصویر با موفقیت حذف شد.",
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("[admin/photo DELETE] UNEXPECTED ERROR:", error);

    return NextResponse.json(
      {
        ok: false,
        error: "خطایی هنگام حذف تصویر رخ داد.",
        details: getSupabaseError(error),
      },
      { status: 500 },
    );
  }
}
