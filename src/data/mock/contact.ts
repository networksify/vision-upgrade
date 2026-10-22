import type { ContactProps } from '@/types/types';

export const ContactSection: ContactProps = {
  eyebrow: 'Contact Us',
  title: 'Let us look at your use case',
  description:
    'Tell us what you want to detect, measure or automate. A solution engineer will reply with a concrete next step within one business day.',
  details: [
    {
      id: 1,
      icon: 'mail',
      label: 'Email',
      value: 'hello@visionupgrade.com',
      href: 'mailto:hello@visionupgrade.com',
    },
    {
      id: 2,
      icon: 'phone',
      label: 'Phone',
      value: '+1 (555) 014-2200',
      href: 'tel:+15550142200',
    },
    {
      id: 3,
      icon: 'mapPin',
      label: 'Head office',
      value: '240 Innovation Drive, San Francisco, CA',
    },
    {
      id: 4,
      icon: 'clock',
      label: 'Support hours',
      value: 'Monday to Friday, 9:00 to 18:00 PST',
    },
  ],
  sideCard: {
    title: 'Prefer a live walkthrough?',
    description:
      'We run a 30-minute demo every week with a sample feed, so you can see detections running end to end.',
    link: {
      label: 'Create an account',
      href: '/login',
    },
  },
  form: {
    submitLabel: 'Send message',
    successTitle: 'Message received',
    successMessage:
      'Thanks for reaching out. A solution engineer will get back to you within one business day.',
    resetLabel: 'Send another message',
    fields: [
      {
        id: 'contact-name',
        name: 'name',
        label: 'Your name',
        type: 'text',
        placeholder: 'Jordan Reyes',
        required: true,
        autoComplete: 'name',
      },
      {
        id: 'contact-email',
        name: 'email',
        label: 'Work email',
        type: 'email',
        placeholder: 'jordan@company.com',
        required: true,
        autoComplete: 'email',
      },
      {
        id: 'contact-company',
        name: 'company',
        label: 'Company',
        type: 'text',
        placeholder: 'Acme Industries',
        required: false,
        autoComplete: 'organization',
        fullWidth: true,
      },
      {
        id: 'contact-message',
        name: 'message',
        label: 'How can we help?',
        type: 'textarea',
        placeholder:
          'We want to detect defective parts on two production lines...',
        required: true,
        rows: 5,
        fullWidth: true,
      },
    ],
  },
};
