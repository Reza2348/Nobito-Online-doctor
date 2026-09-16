import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const adminEmail = process.env.ADMIN_EMAIL!;

const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

// GET: دریافت لیست کاربران
export async function GET() {
  try {
    // بررسی وجود کاربر ادمین
    // فعلاً بر اساس ADMIN_EMAIL انجام می‌شود.
    // در نسخه بعدی بهتر است role-based authentication اضافه کنیم.
    if (!adminEmail) {
      return NextResponse.json(
        { error: "ADMIN_EMAIL تنظیم نشده است." },
        { status: 500 },
      );
    }

    const {
      data: { users },
      error,
    } = await supabaseAdmin.auth.admin.listUsers({
      page: 1,
      perPage: 1000,
    });

    if (error) {
      console.error("Supabase listUsers error:", error);

      return NextResponse.json(
        { error: "خطا در دریافت کاربران" },
        { status: 500 },
      );
    }

    const filteredUsers = users
      .filter((user) => user.email !== adminEmail)
      .map((user) => ({
        id: user.id,
        email: user.email ?? null,
        full_name:
          user.user_metadata?.full_name ?? user.user_metadata?.name ?? null,
        created_at: user.created_at,
      }));

    return NextResponse.json({
      users: filteredUsers,
      total: filteredUsers.length,
    });
  } catch (error) {
    console.error("GET /api/admin/users error:", error);

    return NextResponse.json({ error: "خطای داخلی سرور" }, { status: 500 });
  }
}

// PATCH: ویرایش نام و ایمیل کاربر
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();

    const { id, full_name, email } = body;

    if (!id) {
      return NextResponse.json(
        { error: "شناسه کاربر الزامی است." },
        { status: 400 },
      );
    }

    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { error: "ایمیل معتبر الزامی است." },
        { status: 400 },
      );
    }

    if (typeof full_name !== "string") {
      return NextResponse.json(
        { error: "نام کاربر معتبر نیست." },
        { status: 400 },
      );
    }

    // اول کاربر را پیدا می‌کنیم
    const {
      data: { user },
      error: getUserError,
    } = await supabaseAdmin.auth.admin.getUserById(id);

    if (getUserError || !user) {
      return NextResponse.json({ error: "کاربر پیدا نشد." }, { status: 404 });
    }

    // جلوگیری از تغییر اطلاعات ادمین
    if (user.email === adminEmail) {
      return NextResponse.json(
        { error: "امکان ویرایش ادمین وجود ندارد." },
        { status: 403 },
      );
    }

    // آپدیت Auth User
    const { data: updatedUserData, error: updateAuthError } =
      await supabaseAdmin.auth.admin.updateUserById(id, {
        email,
        user_metadata: {
          ...user.user_metadata,
          full_name,
        },
      });

    if (updateAuthError) {
      console.error("Supabase updateUserById error:", updateAuthError);

      return NextResponse.json(
        {
          error: updateAuthError.message || "خطا در بروزرسانی کاربر",
        },
        { status: 400 },
      );
    }

    // اگر جدول profiles داری، اطلاعات آن را هم آپدیت می‌کنیم
    const { error: profileError } = await supabaseAdmin
      .from("profiles")
      .update({
        full_name,
        email,
      })
      .eq("id", id);

    if (profileError) {
      console.error("Profile update error:", profileError);

      // Auth آپدیت شده، ولی profiles خطا داده
      return NextResponse.json(
        {
          error: "اطلاعات Auth تغییر کرد ولی profiles بروزرسانی نشد.",
        },
        { status: 500 },
      );
    }

    return NextResponse.json({
      message: "اطلاعات کاربر با موفقیت بروزرسانی شد.",
      user: {
        id: updatedUserData.user.id,
        email: updatedUserData.user.email,
        full_name,
        created_at: updatedUserData.user.created_at,
      },
    });
  } catch (error) {
    console.error("PATCH /api/admin/users error:", error);

    return NextResponse.json({ error: "خطای داخلی سرور" }, { status: 500 });
  }
}
