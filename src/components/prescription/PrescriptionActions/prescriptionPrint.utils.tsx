import React from "react";
import { createRoot } from "react-dom/client";

import { Prescription } from "@/Types/types";
import PrescriptionPrint from "@/components/prescription/print/PrescriptionPrint/PrescriptionPrint";

const PRINT_DELAY = 800;

export function printPrescription(prescription: Prescription): void {
  const printWindow = window.open("", "_blank", "width=900,height=1200");

  if (!printWindow) {
    throw new Error("پنجره چاپ توسط مرورگر مسدود شده است.");
  }

  const doc = printWindow.document;

  doc.title = `نسخه پزشکی ${prescription.prescriptionNumber}`;

  doc.documentElement.lang = "fa";
  doc.documentElement.dir = "rtl";

  addMetaTags(doc);

  // انتقال CSSهای صفحه اصلی
  copyStyles(document, doc);

  // فقط تنظیمات پایه چاپ
  addPrintStyles(doc);

  const container = doc.createElement("div");
  container.id = "prescription-print-root";

  doc.body.appendChild(container);

  const root = createRoot(container);

  root.render(<PrescriptionPrint prescription={prescription} />);

  setupPrint(root, printWindow);
}

function addMetaTags(doc: Document): void {
  const charset = doc.createElement("meta");

  charset.setAttribute("charset", "UTF-8");

  doc.head.appendChild(charset);

  const viewport = doc.createElement("meta");

  viewport.setAttribute("name", "viewport");
  viewport.setAttribute("content", "width=device-width, initial-scale=1.0");

  doc.head.appendChild(viewport);
}

function copyStyles(sourceDocument: Document, targetDocument: Document): void {
  // Copy Tailwind / global CSS
  const links = sourceDocument.querySelectorAll<HTMLLinkElement>(
    'link[rel="stylesheet"]',
  );

  links.forEach((link) => {
    const newLink = targetDocument.createElement("link");

    newLink.rel = "stylesheet";
    newLink.href = link.href;

    targetDocument.head.appendChild(newLink);
  });

  // Copy inline styles
  const styles = sourceDocument.querySelectorAll("style");

  styles.forEach((style) => {
    const newStyle = targetDocument.createElement("style");

    newStyle.textContent = style.textContent;

    targetDocument.head.appendChild(newStyle);
  });
}

function addPrintStyles(doc: Document): void {
  const style = doc.createElement("style");

  style.textContent = `
    @page {
      size: A4;
      margin: 0;
    }

    html,
    body {
      margin: 0;
      padding: 0;
      background: #ffffff;
    }

    @media print {
      html,
      body {
        width: 210mm;
        min-height: 297mm;
        margin: 0;
        padding: 0;
        background: #ffffff;
      }
    }
  `;

  doc.head.appendChild(style);
}

async function waitForStyles(printWindow: Window): Promise<void> {
  const links = Array.from(
    printWindow.document.querySelectorAll<HTMLLinkElement>(
      'link[rel="stylesheet"]',
    ),
  );

  await Promise.all(
    links.map(
      (link) =>
        new Promise<void>((resolve) => {
          link.addEventListener("load", () => resolve(), { once: true });

          link.addEventListener("error", () => resolve(), { once: true });
        }),
    ),
  );

  // صبر برای render شدن React و CSS
  await new Promise((resolve) => setTimeout(resolve, PRINT_DELAY));
}

function setupPrint(
  root: ReturnType<typeof createRoot>,
  printWindow: Window,
): void {
  waitForStyles(printWindow).then(() => {
    printWindow.focus();
    printWindow.print();
  });

  printWindow.addEventListener(
    "afterprint",
    () => {
      root.unmount();
      printWindow.close();
    },
    { once: true },
  );
}
