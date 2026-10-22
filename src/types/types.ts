export type IconName =
  | 'arrowRight'
  | 'spark'
  | 'cap'
  | 'blocks'
  | 'code'
  | 'cpu'
  | 'layers'
  | 'cloud'
  | 'megaphone'
  | 'chart'
  | 'trending'
  | 'share'
  | 'cursor'
  | 'book'
  | 'lightbulb'
  | 'target'
  | 'mail'
  | 'phone'
  | 'mapPin'
  | 'clock'
  | 'linkedin'
  | 'twitter'
  | 'instagram'
  | 'facebook'
  | 'youtube'
  | 'check'
  | 'plus'
  | 'menu';

export type NavLink = {
  id: number;
  title: string;
  href: string;
};

export type CallToAction = {
  label: string;
  href: string;
};

export type BrandAssets = {
  name: string;
  mark: string;
  wordmark: string;
  wordmarkLight: string;
  full: string;
};

export type NavbarProps = {
  brand: BrandAssets;
  links: NavLink[];
  cta: CallToAction;
};

export type HeroRow = {
  id: number;
  icon: IconName;
  label: string;
  caption: string;
  /** Percentage width of the accent bar, 0-100. */
  fill: number;
};

export type HeroBadge = {
  id: number;
  icon: IconName;
  label: string;
  value: string;
};

export type HeroProps = {
  brand: BrandAssets;
  eyebrow: string;
  title: string;
  titleAccent: string;
  description: string;
  primaryCta: CallToAction;
  secondaryCta: CallToAction;
  visual: {
    title: string;
    status: string;
    rows: HeroRow[];
    badge: HeroBadge;
  };
  pillars: {
    id: number;
    icon: IconName;
    title: string;
    description: string;
  }[];
};

export type ProgramSummary = {
  id: number;
  index: string;
  icon: IconName;
  title: string;
  description: string;
  href: string;
};

export type ProgramsIntroProps = {
  eyebrow: string;
  title: string;
  description: string;
  items: ProgramSummary[];
};

export type ProgramFeature = {
  id: number;
  title: string;
  description: string;
};

export type ProgramProps = {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  icon: IconName;
  features: ProgramFeature[];
  cta: CallToAction;
  secondaryCta?: CallToAction;
  /** Short label used inside the decorative visual */
  visual: {
    label: string;
    headline: string;
    items: { id: number; icon: IconName; title: string; caption: string }[];
  };
};

export type AboutProps = {
  eyebrow: string;
  title: string;
  description: string;
  body: string;
  pillars: {
    id: number;
    icon: IconName;
    label: string;
    caption: string;
  }[];
  points: { id: number; title: string; description: string }[];
  cta: CallToAction;
};

export type WhyUsProps = {
  eyebrow: string;
  title: string;
  description: string;
  items: {
    id: number;
    icon: IconName;
    title: string;
    description: string;
  }[];
};

export type ContactDetail = {
  id: number;
  icon: IconName;
  label: string;
  value: string;
  href?: string;
};

export type FormFieldConfig = {
  id: string;
  name: string;
  label: string;
  type: 'text' | 'email' | 'tel' | 'textarea' | 'select';
  placeholder: string;
  required: boolean;
  autoComplete?: string;
  rows?: number;
  fullWidth?: boolean;
  options?: { id: number; label: string }[];
};

export type ContactProps = {
  eyebrow: string;
  title: string;
  description: string;
  details: ContactDetail[];
  /** Shown when the listed details are placeholders rather than verified channels. */
  detailsNotice?: string;
  notes: { id: number; title: string; description: string }[];
  form: {
    /**
     * `demo` keeps everything on the client and states plainly that no
     * backend is wired up. `api` posts to `endpoint` instead.
     */
    mode: 'demo' | 'api';
    endpoint?: string;
    submitLabel: string;
    submittingLabel: string;
    successTitle: string;
    successMessage: string;
    demoNotice: string;
    errorTitle: string;
    errorMessage: string;
    retryLabel: string;
    resetLabel: string;
    fields: FormFieldConfig[];
  };
};

export type FooterColumn = {
  id: number;
  title: string;
  links: NavLink[];
};

export type SocialLink = {
  id: number;
  icon: IconName;
  label: string;
  href: string;
};

export type FooterProps = {
  brand: BrandAssets;
  name: string;
  description: string;
  columns: FooterColumn[];
  socials: SocialLink[];
  copyright: string;
  legal: NavLink[];
};

export type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  tone?: 'light' | 'dark';
  id?: string;
};
