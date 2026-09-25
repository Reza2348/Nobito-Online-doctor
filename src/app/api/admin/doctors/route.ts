import { NextRequest, NextResponse } from "next/server";

import { getAdmin } from "@/lib/getAdmin";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";

import type { AdminDoctor } from "@/Types/types";

const DOCTORS_TABLE = "doctors";

export type UpdateDoctorData = Partial<
  Pick<
    AdminDoctor,
    | "name"
    | "specialty"
    | "address"
    | "fields"
    | "rating"
    | "patients_satisfied"
    | "satisfied_percent"
    | "photo_url"
  >
>;

// PATCH: ویرایش پزشک (فقط ادمین)
export async function PATCH(request: NextRequest) {
  try {
    const admin = await getAdmin();

    if (!admin) {
      return NextResponse.json(
        { error: "دسترسی غیرمجاز. لطفاً ابتدا وارد پنل ادمین شوید." },
        { status: 401 },
      );
    }

    const body = await request.json();

    const { id, ...updates } = body as { id?: string } & UpdateDoctorData;

    if (!id || typeof id !== "string") {
      return NextResponse.json(
        { error: "شناسه پزشک الزامی است." },
        { status: 400 },
      );
    }

    const supabaseAdmin = getSupabaseAdmin();

    const { data, error } = await supabaseAdmin
      .from(DOCTORS_TABLE)
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("UPDATE DOCTOR ERROR:", error);

      return NextResponse.json(
        { error: error.message || "خطا در ویرایش پزشک" },
        { status: 500 },
      );
    }

    if (!data) {
      return NextResponse.json(
        { error: "پزشک موردنظر پیدا نشد" },
        { status: 404 },
      );
    }

    return NextResponse.json({ doctor: data as AdminDoctor });
  } catch (error) {
    console.error("PATCH /api/admin/doctors error:", error);

    return NextResponse.json({ error: "خطای داخلی سرور" }, { status: 500 });
  }
}

// DELETE: حذف پزشک (فقط ادمین)
export async function DELETE(request: NextRequest) {
  try {
    const admin = await getAdmin();

    if (!admin) {
      return NextResponse.json(
        { error: "دسترسی غیرمجاز. لطفاً ابتدا وارد پنل ادمین شوید." },
        { status: 401 },
      );
    }

    const body = await request.json().catch(() => null);

    const id = body?.id;

    if (!id || typeof id !== "string") {
      return NextResponse.json(
        { error: "شناسه پزشک الزامی است." },
        { status: 400 },
      );
    }

    const supabaseAdmin = getSupabaseAdmin();

    const { error } = await supabaseAdmin
      .from(DOCTORS_TABLE)
      .delete()
      .eq("id", id);

    if (error) {
      console.error("DELETE DOCTOR ERROR:", error);

      return NextResponse.json(
        { error: error.message || "خطا در حذف پزشک" },
        { status: 500 },
      );
    }

    return NextResponse.json({ message: "پزشک با موفقیت حذف شد." });
  } catch (error) {
    console.error("DELETE /api/admin/doctors error:", error);

    return NextResponse.json({ error: "خطای داخلی سرور" }, { status: 500 });
  }
}
