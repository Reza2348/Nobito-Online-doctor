import type { Role, Account } from "@/Types/types";

/**
 * رمزهای عبور هرگز در کد نگهداری نمی‌شوند؛ فقط هش bcrypt در متغیر محیطی.
 *
 * ساخت هش:  npm run hash-password
 *
 * نکته: هش bcrypt علامت `$` دارد و فایل‌های .env آن را تفسیر می‌کنند.
 * یا هر `$` را با `\$` بنویسید، یا مقدار base64 که اسکریپت چاپ می‌کند
 * را در متغیر *_PASSWORD_HASH_B64 بگذارید.
 */
function readHash(name: string): string {
  const plain = process.env[name]?.trim() ?? "";

  if (plain.startsWith("$2")) {
    return plain;
  }

  const encoded = process.env[`${name}_B64`]?.trim() ?? "";

  if (encoded) {
    const decoded = Buffer.from(encoded, "base64").toString("utf8");

    if (decoded.startsWith("$2")) {
      return decoded;
    }
  }

  return "";
}

function readUsername(name: string, fallback: string): string {
  return process.env[name]?.trim() || fallback;
}

export function getAccounts(): Record<Role, Account> {
  return {
    admin: {
      username: readUsername("ADMIN_USERNAME", "systemadmin"),
      passwordHash: readHash("ADMIN_PASSWORD_HASH"),
      path: "/Admin/dashboard",
    },

    consultant: {
      username: readUsername("CONSULTANT_USERNAME", "consultant"),
      passwordHash: readHash("CONSULTANT_PASSWORD_HASH"),
      path: "/Admin/Consultant",
    },

    content: {
      username: readUsername("CONTENT_USERNAME", "contentmanager"),
      passwordHash: readHash("CONTENT_PASSWORD_HASH"),
      path: "/Admin/Content",
    },
  };
}
