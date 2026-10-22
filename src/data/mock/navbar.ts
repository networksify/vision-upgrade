import { Brand } from '@/data/brand';
import type { NavLink, NavbarProps } from '@/types/types';

export { Brand };

export const NavbarLinks: NavLink[] = [
  { id: 1, title: 'Home', href: '/#home' },
  { id: 2, title: 'VU Kids', href: '/#vu-kids' },
  { id: 3, title: 'Vision Upgrade', href: '/#vision-upgrade' },
  { id: 4, title: 'Digital Marketing', href: '/#digital-marketing' },
  { id: 5, title: 'About', href: '/#about' },
  { id: 6, title: 'Contact', href: '/#contact' },
];

export const NavbarCta = {
  label: 'Explore Our Programs',
  href: '/#programs',
};

export const NavbarSection: NavbarProps = {
  brand: Brand,
  links: NavbarLinks,
  cta: NavbarCta,
};
