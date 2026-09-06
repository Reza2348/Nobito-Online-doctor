// =========================================================
// FOOTER
// =========================================================

export interface FooterLink {
  name: string;
  href: string;
  badge?: string;
  external?: boolean;
}

export interface FooterSection {
  title: string;
  links: FooterLink[];
}
