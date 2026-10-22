import Link from 'next/link';
import { BookPlusIcon, UserPlusIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

type QuickAction = {
  title: string;
  description: string;
  href: string;
  cta: string;
  icon: typeof UserPlusIcon;
};

const ACTIONS: QuickAction[] = [
  {
    title: 'New administrator account',
    description: 'Add a colleague and choose what they can reach.',
    href: '/dashboard/accounts?create=1',
    cta: 'Add administrator',
    icon: UserPlusIcon,
  },
  {
    title: 'New course',
    description: 'Start a draft and publish it when it is ready.',
    href: '/dashboard/courses?create=1',
    cta: 'Create course',
    icon: BookPlusIcon,
  },
];

/** Shortcuts into the two creation flows the dashboard owns. */
export function QuickActions() {
  return (
    <Card className="gap-0 border-line bg-white">
      <CardHeader>
        <CardTitle className="text-base text-navy">Quick actions</CardTitle>
        <CardDescription>Jump straight into the work you came here to do.</CardDescription>
      </CardHeader>

      <CardContent>
        <ul className="grid gap-3 sm:grid-cols-2">
          {ACTIONS.map((action) => (
            <li key={action.href}>
              <div className="flex h-full flex-col gap-3 rounded-lg border border-line p-4">
                <span
                  aria-hidden="true"
                  className="flex size-9 items-center justify-center rounded-lg bg-navy/8 text-navy"
                >
                  <action.icon className="size-4.5" />
                </span>

                <div>
                  <p className="text-sm font-semibold text-navy">{action.title}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{action.description}</p>
                </div>

                <Button asChild size="sm" className="mt-auto w-fit">
                  <Link href={action.href}>{action.cta}</Link>
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
