import { NextRequest, NextResponse } from "next/server";

import { getAdmin } from "@/lib/getAdmin";
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

/* =========================================================
   Storage Config
========================================================= */

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

/* =========================================================
   Image Validation
========================================================= */

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

/* =========================================================
   Supabase Error Helper
========================================================= */

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
      statusCode?: string | number;
    };

    return [
      supabaseError.message,
      supabaseError.details,
      supabaseError.hint,
      supabaseError.code ? `code=${supabaseError.code}` : undefined,
      supabaseError.statusCode
        ? `status=${supabaseError.statusCode}`
        : undefined,
    ]
      .filter(Boolean)
      .join(" | ");
  }

  return String(error);
}

/* =========================================================
   Response Helpers
========================================================= */

function errorResponse(
  message: string,
  status = 500,
  extra?: Record<string, unknown>,
) {
  return NextResponse.json(
    {
      ok: false,
      error: message,
      ...extra,
    },
    { status },
  );
}

function successResponse(data: Record<string, unknown>, status = 200) {
  return NextResponse.json(
    {
      ok: true,
      ...data,
    },
    { status },
  );
}

/* =========================================================
   POST
   Upload Professional Photo
========================================================= */

export async function POST(request: NextRequest) {
  let supabaseAdmin: ReturnType<typeof getSupabaseAdmin> | null = null;

  let uploadedPath: string | null = null;

  let uploadedBucket: "doctor-photos" | "consultants" | "clinics" | null = null;

  try {
    /* -----------------------------------------------------
       1. Admin Authentication
    ----------------------------------------------------- */

    const admin = await getAdmin();

    if (!admin) {
      return errorResponse(
        "دسترسی غیرمجاز. فقط ادمین می‌تواند تصویر آپلود کند.",
        403,
      );
    }

    /* -----------------------------------------------------
       2. Supabase Admin Client
    ----------------------------------------------------- */

    try {
      supabaseAdmin = getSupabaseAdmin();
    } catch (error) {
      console.error(
        "[admin/photo] Supabase Admin initialization error:",
        error,
      );

      return errorResponse("اتصال مدیریتی به Supabase برقرار نشد.", 500, {
        details: getSupabaseError(error),
      });
    }

    /* -----------------------------------------------------
       3. Parse FormData
    ----------------------------------------------------- */

    let formData: FormData;

    try {
      formData = await request.formData();
    } catch (error) {
      console.error("[admin/photo] FormData parsing error:", error);

      return errorResponse("اطلاعات آپلود تصویر قابل دریافت نیست.", 400, {
        details: getSupabaseError(error),
      });
    }

    const file = formData.get("file");
    const professionalId = formData.get("professionalId");
    const type = formData.get("type");

    /* -----------------------------------------------------
       4. Validate File
    ----------------------------------------------------- */

    if (!(file instanceof File)) {
      return errorResponse("فایل تصویر ارسال نشده است.", 400);
    }

    if (file.size <= 0) {
      return errorResponse("فایل تصویر خالی است.", 400);
    }

    if (file.size > MAX_FILE_SIZE) {
      return errorResponse("حجم تصویر نباید بیشتر از ۵ مگابایت باشد.", 400);
    }

    /* -----------------------------------------------------
       5. Validate Professional ID
    ----------------------------------------------------- */

    if (typeof professionalId !== "string" || !professionalId.trim()) {
      return errorResponse("شناسه متخصص ارسال نشده است.", 400);
    }

    const normalizedProfessionalId = professionalId.trim();

    /* -----------------------------------------------------
       6. Validate Professional Type
    ----------------------------------------------------- */

    if (typeof type !== "string" || !type.trim()) {
      return errorResponse("نوع متخصص مشخص نشده است.", 400);
    }

    const normalizedType = type.trim().toLowerCase() as ProfessionalType;

    const config = getStorageConfig(normalizedType);

    if (!config) {
      return errorResponse(
        "نوع متخصص باید doctor، consultant یا clinic باشد.",
        400,
      );
    }

    /* -----------------------------------------------------
       7. Validate Image MIME Type
    ----------------------------------------------------- */

    if (!isAllowedImageType(file.type)) {
      return errorResponse("فرمت تصویر باید JPG، PNG یا WEBP باشد.", 400);
    }

    /* -----------------------------------------------------
       8. Log Request
    ----------------------------------------------------- */

    console.log("[admin/photo] Upload request:", {
      admin: admin.username ?? "admin",
      table: config.table,
      bucket: config.bucket,
      type: normalizedType,
      professionalId: normalizedProfessionalId,
      fileName: file.name,
      fileSize: file.size,
      mimeType: file.type,
    });

    /* -----------------------------------------------------
       9. Check Professional
    ----------------------------------------------------- */

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

      return errorResponse("خطا در دریافت اطلاعات متخصص.", 500, {
        details: getSupabaseError(professionalError),
        table: config.table,
        professionalId: normalizedProfessionalId,
      });
    }

    if (!professional) {
      console.error("[admin/photo] Professional not found:", {
        table: config.table,
        id: normalizedProfessionalId,
      });

      return errorResponse("متخصص موردنظر پیدا نشد.", 404, {
        table: config.table,
        professionalId: normalizedProfessionalId,
      });
    }

    /* -----------------------------------------------------
       10. Verify Storage Bucket
    ----------------------------------------------------- */

    console.log("[admin/photo] Checking storage bucket:", config.bucket);

    const { data: buckets, error: bucketsError } =
      await supabaseAdmin.storage.listBuckets();

    if (bucketsError) {
      console.error("[admin/photo] LIST BUCKETS ERROR:", bucketsError);

      return errorResponse("امکان بررسی Storage در Supabase وجود ندارد.", 500, {
        details: getSupabaseError(bucketsError),
        bucket: config.bucket,
      });
    }

    const bucketExists = buckets?.some(
      (bucket) => bucket.name === config.bucket,
    );

    if (!bucketExists) {
      console.error("[admin/photo] STORAGE BUCKET NOT FOUND:", config.bucket);

      return errorResponse(
        `Bucket با نام "${config.bucket}" در Supabase وجود ندارد.`,
        500,
        {
          bucket: config.bucket,
          availableBuckets: buckets?.map((bucket) => bucket.name) ?? [],
        },
      );
    }

    /* -----------------------------------------------------
       11. Generate File Path
    ----------------------------------------------------- */

    const fileName = generateFileName(file.name);

    const filePath =
      `${config.pathPrefix}/` + `${normalizedProfessionalId}/` + fileName;

    uploadedPath = filePath;
    uploadedBucket = config.bucket;

    console.log("[admin/photo] Generated file path:", filePath);

    /* -----------------------------------------------------
       12. Convert File To Buffer
    ----------------------------------------------------- */

    let fileBuffer: Buffer;

    try {
      const arrayBuffer = await file.arrayBuffer();

      fileBuffer = Buffer.from(arrayBuffer);
    } catch (error) {
      console.error("[admin/photo] FILE BUFFER ERROR:", error);

      return errorResponse("خواندن فایل تصویر انجام نشد.", 400, {
        details: getSupabaseError(error),
      });
    }

    /* -----------------------------------------------------
       13. Upload To Supabase Storage
    ----------------------------------------------------- */

    console.log("[admin/photo] Uploading to Storage:", {
      bucket: config.bucket,
      path: filePath,
      size: file.size,
      type: file.type,
    });

    const { data: uploadData, error: uploadError } = await supabaseAdmin.storage
      .from(config.bucket)
      .upload(filePath, fileBuffer, {
        contentType: file.type,
        cacheControl: "3600",
        upsert: false,
      });

    if (uploadError) {
      console.error("[admin/photo] STORAGE UPLOAD ERROR:", uploadError);

      uploadedPath = null;
      uploadedBucket = null;

      return errorResponse("آپلود تصویر در Storage انجام نشد.", 500, {
        details: getSupabaseError(uploadError),
        bucket: config.bucket,
        path: filePath,
      });
    }

    console.log("[admin/photo] Storage upload successful:", uploadData);

    /* -----------------------------------------------------
       14. Get Public URL
    ----------------------------------------------------- */

    const { data: publicUrlData } = supabaseAdmin.storage
      .from(config.bucket)
      .getPublicUrl(filePath);

    const publicUrl = publicUrlData?.publicUrl?.trim();

    if (!publicUrl) {
      console.error("[admin/photo] PUBLIC URL NOT FOUND:", {
        bucket: config.bucket,
        path: filePath,
      });

      /* Cleanup uploaded file */

      await supabaseAdmin.storage.from(config.bucket).remove([filePath]);

      uploadedPath = null;
      uploadedBucket = null;

      return errorResponse("آدرس عمومی تصویر ساخته نشد.", 500);
    }

    console.log("[admin/photo] Public URL generated:", publicUrl);

    /* -----------------------------------------------------
       15. Update Database
    ----------------------------------------------------- */

    console.log("[admin/photo] Updating photo_url:", {
      table: config.table,
      id: normalizedProfessionalId,
      url: publicUrl,
    });

    const { data: updatedProfessional, error: updateError } =
      await supabaseAdmin
        .from(config.table)
        .update({
          photo_url: publicUrl,
        })
        .eq("id", normalizedProfessionalId)
        .select("id, photo_url")
        .maybeSingle();

    if (updateError) {
      console.error("[admin/photo] PHOTO URL UPDATE ERROR:", updateError);

      /* Cleanup Storage */

      const { error: cleanupError } = await supabaseAdmin.storage
        .from(config.bucket)
        .remove([filePath]);

      if (cleanupError) {
        console.error("[admin/photo] CLEANUP ERROR:", cleanupError);
      }

      uploadedPath = null;
      uploadedBucket = null;

      return errorResponse(
        "عکس آپلود شد اما آدرس آن در پایگاه داده ذخیره نشد.",
        500,
        {
          details: getSupabaseError(updateError),
          table: config.table,
          professionalId: normalizedProfessionalId,
        },
      );
    }

    if (!updatedProfessional) {
      console.error("[admin/photo] DATABASE UPDATE RETURNED NO ROW:", {
        table: config.table,
        id: normalizedProfessionalId,
      });

      /* Cleanup Storage */

      await supabaseAdmin.storage.from(config.bucket).remove([filePath]);

      uploadedPath = null;
      uploadedBucket = null;

      return errorResponse("آدرس تصویر در پایگاه داده ذخیره نشد.", 500, {
        table: config.table,
        professionalId: normalizedProfessionalId,
      });
    }

    /* -----------------------------------------------------
       16. Success
    ----------------------------------------------------- */

    uploadedPath = null;
    uploadedBucket = null;

    console.log("[admin/photo] PHOTO UPLOAD COMPLETE:", {
      admin: admin.username ?? "admin",
      professionalId: normalizedProfessionalId,
      type: normalizedType,
      table: config.table,
      bucket: config.bucket,
      path: filePath,
      url: publicUrl,
    });

    return successResponse({
      message: "تصویر با موفقیت آپلود و ذخیره شد.",
      url: publicUrl,
      path: filePath,
      professionalId: normalizedProfessionalId,
      type: normalizedType,
    });
  } catch (error) {
    console.error("[admin/photo] UNEXPECTED ERROR:", error);

    /* -----------------------------------------------------
       Cleanup unexpected upload
    ----------------------------------------------------- */

    if (uploadedPath && uploadedBucket && supabaseAdmin) {
      try {
        console.error("[admin/photo] Attempting cleanup:", {
          bucket: uploadedBucket,
          path: uploadedPath,
        });

        const { error: cleanupError } = await supabaseAdmin.storage
          .from(uploadedBucket)
          .remove([uploadedPath]);

        if (cleanupError) {
          console.error(
            "[admin/photo] UNEXPECTED CLEANUP ERROR:",
            cleanupError,
          );
        }
      } catch (cleanupException) {
        console.error("[admin/photo] CLEANUP EXCEPTION:", cleanupException);
      }
    }

    return errorResponse("خطایی هنگام آپلود تصویر رخ داد.", 500, {
      details: getSupabaseError(error),
    });
  }
}

/* =========================================================
   DELETE
   Delete Professional Photo
========================================================= */

export async function DELETE(request: NextRequest) {
  let supabaseAdmin: ReturnType<typeof getSupabaseAdmin> | null = null;

  try {
    /* -----------------------------------------------------
       1. Admin Authentication
    ----------------------------------------------------- */

    const admin = await getAdmin();

    if (!admin) {
      return errorResponse("دسترسی غیرمجاز.", 403);
    }

    /* -----------------------------------------------------
       2. Supabase Admin
    ----------------------------------------------------- */

    try {
      supabaseAdmin = getSupabaseAdmin();
    } catch (error) {
      console.error("[admin/photo DELETE] Supabase Admin error:", error);

      return errorResponse("اتصال مدیریتی به Supabase برقرار نشد.", 500, {
        details: getSupabaseError(error),
      });
    }

    /* -----------------------------------------------------
       3. Parse JSON
    ----------------------------------------------------- */

    let body: unknown;

    try {
      body = await request.json();
    } catch (error) {
      console.error("[admin/photo DELETE] JSON parse error:", error);

      return errorResponse("اطلاعات حذف تصویر معتبر نیست.", 400);
    }

    if (typeof body !== "object" || body === null) {
      return errorResponse("اطلاعات حذف تصویر معتبر نیست.", 400);
    }

    const deleteBody = body as {
      path?: unknown;
      type?: unknown;
      professionalId?: unknown;
    };

    const path =
      typeof deleteBody.path === "string" ? deleteBody.path.trim() : "";

    const type =
      typeof deleteBody.type === "string"
        ? deleteBody.type.trim().toLowerCase()
        : "";

    const professionalId =
      typeof deleteBody.professionalId === "string"
        ? deleteBody.professionalId.trim()
        : "";

    /* -----------------------------------------------------
       4. Validate Path
    ----------------------------------------------------- */

    if (!path) {
      return errorResponse("مسیر تصویر مشخص نشده است.", 400);
    }

    /* -----------------------------------------------------
       5. Validate Professional ID
    ----------------------------------------------------- */

    if (!professionalId) {
      return errorResponse("شناسه متخصص مشخص نشده است.", 400);
    }

    /* -----------------------------------------------------
       6. Validate Type
    ----------------------------------------------------- */

    const config = getStorageConfig(type);

    if (!config) {
      return errorResponse(
        "نوع متخصص باید doctor، consultant یا clinic باشد.",
        400,
      );
    }

    /* -----------------------------------------------------
       7. Validate Path Security
    ----------------------------------------------------- */

    const expectedPrefix = `${config.pathPrefix}/${professionalId}/`;

    if (!path.startsWith(expectedPrefix)) {
      console.error("[admin/photo DELETE] Invalid path:", {
        path,
        expectedPrefix,
      });

      return errorResponse("مسیر تصویر معتبر نیست.", 400);
    }

    /* -----------------------------------------------------
       8. Check Professional
    ----------------------------------------------------- */

    const { data: professional, error: professionalError } = await supabaseAdmin
      .from(config.table)
      .select("id")
      .eq("id", professionalId)
      .maybeSingle();

    if (professionalError) {
      console.error(
        "[admin/photo DELETE] PROFESSIONAL LOOKUP ERROR:",
        professionalError,
      );

      return errorResponse("خطا در دریافت اطلاعات متخصص.", 500, {
        details: getSupabaseError(professionalError),
      });
    }

    if (!professional) {
      return errorResponse("متخصص موردنظر پیدا نشد.", 404);
    }

    /* -----------------------------------------------------
       9. Delete From Storage
    ----------------------------------------------------- */

    console.log("[admin/photo DELETE] Removing file:", {
      bucket: config.bucket,
      path,
    });

    const { data: deleteData, error: deleteError } = await supabaseAdmin.storage
      .from(config.bucket)
      .remove([path]);

    if (deleteError) {
      console.error("[admin/photo DELETE] STORAGE DELETE ERROR:", deleteError);

      return errorResponse("حذف تصویر از Storage انجام نشد.", 500, {
        details: getSupabaseError(deleteError),
        bucket: config.bucket,
        path,
      });
    }

    console.log("[admin/photo DELETE] Storage delete result:", deleteData);

    /* -----------------------------------------------------
       10. Clear photo_url
    ----------------------------------------------------- */

    const { data: updatedProfessional, error: updateError } =
      await supabaseAdmin
        .from(config.table)
        .update({
          photo_url: null,
        })
        .eq("id", professionalId)
        .select("id, photo_url")
        .maybeSingle();

    if (updateError) {
      console.error("[admin/photo DELETE] DATABASE UPDATE ERROR:", updateError);

      return errorResponse(
        "تصویر حذف شد اما آدرس تصویر از پایگاه داده پاک نشد.",
        500,
        {
          details: getSupabaseError(updateError),
          table: config.table,
        },
      );
    }

    if (!updatedProfessional) {
      return errorResponse("آدرس تصویر از پایگاه داده پاک نشد.", 500, {
        table: config.table,
        professionalId,
      });
    }

    /* -----------------------------------------------------
       11. Success
    ----------------------------------------------------- */

    console.log("[admin/photo DELETE] PHOTO DELETE COMPLETE:", {
      admin: admin.username ?? "admin",
      professionalId,
      type,
      bucket: config.bucket,
      path,
    });

    return successResponse({
      message: "تصویر با موفقیت حذف شد.",
    });
  } catch (error) {
    console.error("[admin/photo DELETE] UNEXPECTED ERROR:", error);

    return errorResponse("خطایی هنگام حذف تصویر رخ داد.", 500, {
      details: getSupabaseError(error),
    });
  }
}
