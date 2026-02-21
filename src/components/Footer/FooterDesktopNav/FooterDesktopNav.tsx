"use client"; // ← اضافه شود چون فرم و hook داریم

import { FOOTER_NAV } from "@/components/Footer/footer data/footer.data";
import Newsletter from "@/components/Footer/Newsletter/Newsletter";
import * as F from "@/Imports/FooterImports/FooterImports";

type Props = {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

export default function FooterDesktopNav({ onSubmit }: Props) {
  return (
    <div className="hidden md:grid max-w-7xl mx-auto px-6 md:grid-cols-3 lg:grid-cols-5 gap-8 py-14">
      {FOOTER_NAV.map((section) => (
        <div key={section.title} className="text-right space-y-5">
          <h3 className="font-bold">{section.title}</h3>
          <ul className="space-y-3 text-sm text-gray-600">
            {section.links.map((link) => (
              <li key={link.name}>
                <F.Link href={link.href}>{link.name}</F.Link>
              </li>
            ))}
          </ul>
        </div>
      ))}

      <Newsletter onSubmit={onSubmit} />
    </div>
  );
}
