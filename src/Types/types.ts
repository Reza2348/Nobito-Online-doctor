export interface User {
  id: string;
  username: string;
  email: string;
}

export interface NavLink {
  href: string;
  label: string;
}

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
