export type UserRow = {
  id: string;
  full_name: string | null;
  email: string | null;
  phone: string | null;
  created_at: string;
};

export type EditPayload = {
  id: string;
  full_name: string;
  email: string;
};

export async function updateUser(payload: EditPayload) {
  const response = await fetch("/api/admin/users", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.error ?? "خطا در ویرایش کاربر");
  }

  return json;
}
