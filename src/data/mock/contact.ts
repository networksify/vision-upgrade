import type { ContactProps } from '@/types/types';

/**
 * Contact content.
 *
 * NOTE: the repository does not contain any verified company contact details,
 * so the values below are clearly marked placeholders and `detailsNotice`
 * surfaces that on the page. Replace them with real channels before launch.
 */
export const ContactSection: ContactProps = {
  eyebrow: 'Contact',
  title: 'Let’s build something worth upgrading.',
  description:
    'Tell us about your program, product or campaign and we will come back with a clear next step — no hard sell, no vague promises.',
  detailsNotice:
    'Contact details below are placeholders. Replace them with verified channels before launch.',
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
      value: '+00 000 000 0000',
      href: 'tel:+00000000000',
    },
    {
      id: 3,
      icon: 'mapPin',
      label: 'Studio',
      value: 'Address to be confirmed',
    },
    {
      id: 4,
      icon: 'clock',
      label: 'Hours',
      value: 'Monday – Friday, 09:00 – 18:00',
    },
  ],
  notes: [
    {
      id: 1,
      title: 'Replies within two working days',
      description:
        'Every enquiry is read by a person and answered with a concrete proposal.',
    },
    {
      id: 2,
      title: 'A short call before a long proposal',
      description:
        'We start by understanding the problem, then suggest the smallest useful next step.',
    },
    {
      id: 3,
      title: 'No obligation',
      description:
        'You will get a clear recommendation, including when the answer is not to work with us.',
    },
  ],
  form: {
    // `demo` keeps the form entirely on the client. The success state says
    // plainly that nothing was transmitted instead of pretending to send.
    mode: 'demo',
    submitLabel: 'Send message',
    submittingLabel: 'Sending…',
    successTitle: 'Thanks — your message is ready to send.',
    successMessage:
      'This site is running without a contact backend, so nothing was transmitted. Use the email address on the left to reach us, or ask your developer to connect the form to an API endpoint.',
    demoNotice:
      'Demo mode: this form validates in the browser but is not connected to a server yet.',
    errorTitle: 'Something went wrong.',
    errorMessage:
      'Your message could not be sent. Please try again, or email us directly.',
    retryLabel: 'Try again',
    resetLabel: 'Write another message',
    fields: [
      {
        id: 'name',
        name: 'name',
        label: 'Full name',
        type: 'text',
        placeholder: 'Your name',
        required: true,
        autoComplete: 'name',
      },
      {
        id: 'email',
        name: 'email',
        label: 'Email address',
        type: 'email',
        placeholder: 'you@company.com',
        required: true,
        autoComplete: 'email',
      },
      {
        id: 'phone',
        name: 'phone',
        label: 'Phone',
        type: 'tel',
        placeholder: 'Optional',
        required: false,
        autoComplete: 'tel',
      },
      {
        id: 'interest',
        name: 'interest',
        label: 'I am interested in',
        type: 'select',
        placeholder: 'Choose an area',
        required: true,
        fullWidth: true,
        options: [
          { id: 1, label: 'VU Kids — education programs' },
          { id: 2, label: 'Vision Upgrade — software & technology' },
          { id: 3, label: 'Digital marketing & branding' },
          { id: 4, label: 'Something else' },
        ],
      },
      {
        id: 'message',
        name: 'message',
        label: 'Message',
        type: 'textarea',
        placeholder: 'Tell us about your goals, timing and budget range.',
        required: true,
        rows: 5,
        fullWidth: true,
      },
    ],
  },
};
