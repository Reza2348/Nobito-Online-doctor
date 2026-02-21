import { FOOTER_NAV } from "@/components/Footer/footer data/footer.data";
import MobileSection from "@/components/Footer/MobileSection/MobileSection";
import Newsletter from "@/components/Footer/Newsletter/Newsletter";

type Props = {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

export default function FooterMobileNav({ onSubmit }: Props) {
  return (
    <div className="md:hidden px-6 my-6 bg-white rounded-2xl py-2">
      {FOOTER_NAV.map((section) => (
        <MobileSection key={section.title} {...section} />
      ))}
      <Newsletter mobile onSubmit={onSubmit} />
    </div>
  );
}
