'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import {
  DatabaseIcon,
  KeyRoundIcon,
  LogOutIcon,
  ServerIcon,
  ShieldCheckIcon,
} from 'lucide-react';

import { useAuth } from '@/components/auth/auth-provider';
import { DemoNotice } from '@/components/dashboard/demo-notice';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Spinner } from '@/components/ui/spinner';
import { ROLE_LABELS } from '@/lib/labels';

const LIMITATIONS = [
  {
    title: 'Data lives in memory',
    description:
      'Accounts, courses and messages are held in JavaScript memory. A reload resets every change to the demo seed data.',
  },
  {
    title: 'Sign-in checks nothing',
    description:
      'The demo adapter accepts any non-empty password for a known username. It never compares a credential and never issues a real session.',
  },
  {
    title: 'No session cookie',
    description:
      'The session is React state only. Refreshing the page signs you out, because a browser-held flag is not an authorisation boundary.',
  },
  {
    title: 'Nothing leaves the browser',
    description:
      'There is no API server behind this build. No request is sent anywhere, and no real Vision Upgrade data is involved.',
  },
] as const;

const PRODUCTION_STEPS = [
  'Replace the mock providers in src/lib/providers with HTTP implementations of the same service contracts.',
  'Authenticate over HTTPS and store the session in an HttpOnly, Secure, SameSite cookie set by the server.',
  'Hash and verify passwords server-side, and re-check the caller’s role before every privileged mutation.',
  'Send new administrators an invitation so no password is ever typed into or stored by the browser.',
  'Add a re-authenticated password change flow, plus audit logging for account and course changes.',
] as const;

/** Account and workspace settings, with an honest statement of limits. */
export function SettingsPage() {
  const { user, signOut } = useAuth();
  const router = useRouter();
  const [signingOut, setSigningOut] = React.useState(false);

  const handleSignOut = async () => {
    setSigningOut(true);
    await signOut();
    router.replace('/login');
  };

  return (
    <div className="flex max-w-3xl flex-col gap-6">
      <DemoNotice>
        Everything on this page describes the prototype build. Treat it as a preview of the
        dashboard, not as a production security posture.
      </DemoNotice>

      <Card className="gap-0 border-line bg-white">
        <CardHeader>
          <CardTitle className="text-base text-navy">Signed-in account</CardTitle>
          <CardDescription>
            The demo session associated with this browser tab.
          </CardDescription>
        </CardHeader>

        <CardContent className="flex flex-col gap-4">
          {user ? (
            <>
              <dl className="grid gap-4 sm:grid-cols-2">
                <div>
                  <dt className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                    Name
                  </dt>
                  <dd className="mt-1 text-sm text-foreground">{user.name}</dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                    Username
                  </dt>
                  <dd className="mt-1 font-mono text-sm text-foreground">{user.username}</dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                    Role
                  </dt>
                  <dd className="mt-1">
                    <Badge variant="outline" className="border-line text-navy">
                      {ROLE_LABELS[user.role]}
                    </Badge>
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                    Session
                  </dt>
                  <dd className="mt-1">
                    <Badge variant="secondary" className="bg-brand-tint text-brand-ink hover:bg-brand-tint">
                      Demo only
                    </Badge>
                  </dd>
                </div>
              </dl>

              <Separator />

              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="text-sm text-muted-foreground">
                  Signing out clears the in-memory session.
                </p>
                <Button
                  variant="outline"
                  onClick={() => void handleSignOut()}
                  disabled={signingOut}
                >
                  {signingOut ? <Spinner /> : <LogOutIcon />}
                  Sign out
                </Button>
              </div>
            </>
          ) : (
            <p className="text-sm text-muted-foreground">
              No session is active in this tab.
            </p>
          )}
        </CardContent>
      </Card>

      <Card className="gap-0 border-line bg-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base text-navy">
            <KeyRoundIcon className="size-4" aria-hidden="true" />
            Password and credentials
          </CardTitle>
          <CardDescription>
            Why this build has no “change password” form.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <p className="text-sm leading-relaxed text-muted-foreground">
            A password form on the client cannot change a password: it would have to collect the
            current and new secret in the browser, which is exactly what this prototype refuses to
            do. Password changes belong to the backend, where the request can be authenticated,
            re-authenticated and rate limited. When that backend exists, this card becomes the entry
            point for the real flow — until then it stays a written note rather than a form that
            only pretends to work.
          </p>
        </CardContent>
      </Card>

      <Card className="gap-0 border-line bg-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base text-navy">
            <ShieldCheckIcon className="size-4" aria-hidden="true" />
            What this prototype does not protect
          </CardTitle>
          <CardDescription>
            Accepted limits of a front-end-only build.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <ul className="flex flex-col gap-4">
            {LIMITATIONS.map((limitation) => (
              <li key={limitation.title} className="flex items-start gap-3">
                <span
                  aria-hidden="true"
                  className="mt-1.5 size-1.5 shrink-0 rounded-full bg-brand-ink"
                />
                <div>
                  <p className="text-sm font-semibold text-navy">{limitation.title}</p>
                  <p className="mt-0.5 text-sm leading-relaxed text-muted-foreground">
                    {limitation.description}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card className="gap-0 border-line bg-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base text-navy">
            <ServerIcon className="size-4" aria-hidden="true" />
            Connecting a backend
          </CardTitle>
          <CardDescription>
            The service interfaces are the only seam that has to change.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <ol className="flex list-decimal flex-col gap-2.5 pl-5 text-sm leading-relaxed text-muted-foreground marker:font-semibold marker:text-navy">
            {PRODUCTION_STEPS.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>

          <div className="mt-5 flex items-start gap-3 rounded-lg border border-line bg-surface p-3.5">
            <DatabaseIcon className="mt-0.5 size-4 shrink-0 text-navy" aria-hidden="true" />
            <p className="text-sm text-muted-foreground">
              Components, forms and pages all talk to the interfaces in{' '}
              <code className="rounded bg-white px-1 py-0.5 font-mono text-xs text-navy">
                src/lib/services/contracts.ts
              </code>
              . No screen imports mock data directly.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
