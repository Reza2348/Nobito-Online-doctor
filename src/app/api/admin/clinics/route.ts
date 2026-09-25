import { NextRequest, NextResponse } from "next/server";

import { getAdmin } from "@/lib/getAdmin";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";

import type { AdminClinic } from "@/Types/types";

const CLINICS_TABLE = "clinics";

export type UpdateClinicData = Partial<
  Pick<
    AdminClinic,
    | "name"
    | "specialty"
    | "address"
    | "fields"
    | "rating"
    | "patients_satisfied"
    | "satisfied_percent"
  >
>;
// PATCH: ویرایش کلینیک (فقط ادمین)
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

    const { id, ...updates } = body as { id?: string } & UpdateClinicData;

    if (!id || typeof id !== "string") {
      return NextResponse.json(
        { error: "شناسه کلینیک الزامی است." },
        { status: 400 },
      );
    }

    const supabaseAdmin = getSupabaseAdmin();

    const { data, error } = await supabaseAdmin
      .from(CLINICS_TABLE)
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("UPDATE CLINIC ERROR:", error);

      return NextResponse.json(
        { error: error.message || "خطا در ویرایش کلینیک" },
        { status: 500 },
      );
    }

    if (!data) {
      return NextResponse.json(
        { error: "کلینیک موردنظر پیدا نشد" },
        { status: 404 },
      );
    }

    return NextResponse.json({ clinic: data as AdminClinic });
  } catch (error) {
    console.error("PATCH /api/admin/clinics error:", error);

    return NextResponse.json({ error: "خطای داخلی سرور" }, { status: 500 });
  }
}

// DELETE: حذف کلینیک (فقط ادمین)
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
        { error: "شناسه کلینیک الزامی است." },
        { status: 400 },
      );
    }

    const supabaseAdmin = getSupabaseAdmin();

    const { error } = await supabaseAdmin
      .from(CLINICS_TABLE)
      .delete()
      .eq("id", id);

    if (error) {
      console.error("DELETE CLINIC ERROR:", error);

      return NextResponse.json(
        { error: error.message || "خطا در حذف کلینیک" },
        { status: 500 },
      );
    }

    return NextResponse.json({ message: "کلینیک با موفقیت حذف شد." });
  } catch (error) {
    console.error("DELETE /api/admin/clinics error:", error);

    return NextResponse.json({ error: "خطای داخلی سرور" }, { status: 500 });
  }
}
