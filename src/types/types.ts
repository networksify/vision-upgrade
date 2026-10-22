export type IconName =
  | 'scan'
  | 'cpu'
  | 'shield'
  | 'zap'
  | 'chart'
  | 'layers'
  | 'mail'
  | 'phone'
  | 'mapPin'
  | 'clock';

export type NavLink = {
  id: number;
  title: string;
  href: string;
};

export type NavbarProps = {
  links?: NavLink[];
};

export type Stat = {
  id: number;
  label: string;
  value: string;
};

export type CallToAction = {
  label: string;
  href: string;
};

export type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description: string;
  align?: 'left' | 'center';
};

export type Detection = {
  id: number;
  label: string;
  confidence: number;
  box: {
    left: string;
    top: string;
    width: string;
    height: string;
  };
  borderClass: string;
  labelClass: string;
};

export type Metric = {
  id: number;
  label: string;
  value: number;
  barClass: string;
};

export type HeroVisual = {
  status: string;
  caption: string;
  detections: Detection[];
  metrics: Metric[];
};

export type HeroProps = {
  badge: string;
  badgeActive: boolean;
  title: string;
  titleAccent: string;
  description: string;
  primaryCta: CallToAction;
  secondaryCta: CallToAction;
  stats: Stat[];
  visual: HeroVisual;
};

export type FeatureItem = {
  id: number;
  icon: IconName;
  title: string;
  description: string;
};

export type AboutProps = {
  eyebrow: string;
  title: string;
  description: string;
  card: {
    eyebrow: string;
    quote: string;
    body: string;
    stats: Stat[];
  };
  content: {
    title: string;
    description: string;
    link: CallToAction;
  };
  values: FeatureItem[];
};

export type ServicesProps = {
  eyebrow: string;
  title: string;
  description: string;
  items: FeatureItem[];
  cta: {
    title: string;
    description: string;
    link: CallToAction;
  };
};

export type ContactDetail = {
  id: number;
  icon: IconName;
  label: string;
  value: string;
  href?: string;
};

export type FormField = {
  id: string;
  name: string;
  label: string;
  type: 'text' | 'email' | 'tel' | 'textarea';
  placeholder: string;
  required: boolean;
  autoComplete?: string;
  rows?: number;
  fullWidth?: boolean;
};

export type ContactProps = {
  eyebrow: string;
  title: string;
  description: string;
  details: ContactDetail[];
  sideCard: {
    title: string;
    description: string;
    link: CallToAction;
  };
  form: {
    submitLabel: string;
    successTitle: string;
    successMessage: string;
    resetLabel: string;
    fields: FormField[];
  };
};

export type FooterColumn = {
  id: number;
  title: string;
  links: NavLink[];
};

export type FooterProps = {
  initial: string;
  name: string;
  description: string;
  columns: FooterColumn[];
  copyright: string;
  tagline: string;
};
