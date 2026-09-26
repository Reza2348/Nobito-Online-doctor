import { NextRequest, NextResponse } from "next/server";

import { getAdmin } from "@/lib/getAdmin";
import { getSupabaseAdmin } from "@/lib/supabaseAdmin";

import type { AdminConsultant } from "@/Types/types";

const CONSULTANTS_TABLE = "consultants";

export type UpdateConsultantData = Partial<
  Pick<AdminConsultant, "name" | "specialty" | "address" | "fields" | "rating">
>;
// PATCH: ویرایش مشاور (فقط ادمین)
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

    const { id, ...updates } = body as { id?: string } & UpdateConsultantData;

    if (!id || typeof id !== "string") {
      return NextResponse.json(
        { error: "شناسه مشاور الزامی است." },
        { status: 400 },
      );
    }

    const supabaseAdmin = getSupabaseAdmin();

    const { data, error } = await supabaseAdmin
      .from(CONSULTANTS_TABLE)
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("UPDATE CONSULTANT ERROR:", error);

      return NextResponse.json(
        { error: error.message || "خطا در ویرایش مشاور" },
        { status: 500 },
      );
    }

    if (!data) {
      return NextResponse.json(
        { error: "مشاور موردنظر پیدا نشد" },
        { status: 404 },
      );
    }

    return NextResponse.json({ consultant: data as AdminConsultant });
  } catch (error) {
    console.error("PATCH /api/admin/consultants error:", error);

    return NextResponse.json({ error: "خطای داخلی سرور" }, { status: 500 });
  }
}

// DELETE: حذف مشاور (فقط ادمین)
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
        { error: "شناسه مشاور الزامی است." },
        { status: 400 },
      );
    }

    const supabaseAdmin = getSupabaseAdmin();

    const { error } = await supabaseAdmin
      .from(CONSULTANTS_TABLE)
      .delete()
      .eq("id", id);

    if (error) {
      console.error("DELETE CONSULTANT ERROR:", error);

      return NextResponse.json(
        { error: error.message || "خطا در حذف مشاور" },
        { status: 500 },
      );
    }

    return NextResponse.json({ message: "مشاور با موفقیت حذف شد." });
  } catch (error) {
    console.error("DELETE /api/admin/consultants error:", error);

    return NextResponse.json({ error: "خطای داخلی سرور" }, { status: 500 });
  }
}
