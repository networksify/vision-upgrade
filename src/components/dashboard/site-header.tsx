"use client";

import * as React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LogOutIcon, SettingsIcon, UserRoundIcon } from 'lucide-react';

import { useAuth } from '@/components/auth/auth-provider';
import { GlobalSearch } from '@/components/dashboard/global-search';
import { NotificationsMenu } from '@/components/dashboard/notifications-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { ROLE_LABELS } from '@/lib/labels';

/** Page titles used by the header and the breadcrumbs. */
export const DASHBOARD_PAGES = [
  { href: '/dashboard', title: 'Dashboard overview' },
  { href: '/dashboard/accounts', title: 'Admin accounts' },
  { href: '/dashboard/courses', title: 'Courses' },
  { href: '/dashboard/chat', title: 'Company chat' },
  { href: '/dashboard/settings', title: 'Settings' },
] as const;

const initialsOf = (name: string): string =>
  name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('');

export function SiteHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, signOut } = useAuth();
  const [signingOut, setSigningOut] = React.useState(false);

  const current =
    DASHBOARD_PAGES.find((page) =>
      page.href === '/dashboard' ? pathname === page.href : pathname.startsWith(page.href),
    ) ?? DASHBOARD_PAGES[0];

  const handleSignOut = async () => {
    setSigningOut(true);
    await signOut();
    router.replace('/login');
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center gap-2 border-b bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/80 lg:px-6">
      <SidebarTrigger className="-ml-1" aria-label="Toggle navigation" />

      <Separator orientation="vertical" className="mx-1 data-vertical:h-4" />

      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem className="hidden md:block">
            <BreadcrumbLink asChild>
              <Link href="/dashboard">Dashboard</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator className="hidden md:block" />
          <BreadcrumbItem>
            <BreadcrumbPage>{current.title}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="ml-auto flex items-center gap-1.5">
        <GlobalSearch />
        <NotificationsMenu />

        {user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon-sm" className="rounded-full" aria-label="Your account">
                <Avatar className="size-7 rounded-full">
                  <AvatarFallback className="rounded-full bg-navy text-[11px] font-semibold text-white">
                    {initialsOf(user.name)}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-56 rounded-lg">
              <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                  <Avatar className="size-8 rounded-full">
                    <AvatarFallback className="rounded-full bg-navy text-[11px] font-semibold text-white">
                      {initialsOf(user.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium">{user.name}</span>
                    <span className="truncate text-xs text-muted-foreground">
                      {ROLE_LABELS[user.role]}
                    </span>
                  </div>
                </div>
              </DropdownMenuLabel>

              <DropdownMenuSeparator />

              <DropdownMenuGroup>
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/settings">
                    <UserRoundIcon aria-hidden="true" />
                    Account settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/settings">
                    <SettingsIcon aria-hidden="true" />
                    Workspace settings
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuGroup>

              <DropdownMenuSeparator />

              <DropdownMenuItem
                variant="destructive"
                disabled={signingOut}
                onSelect={(event) => {
                  event.preventDefault();
                  void handleSignOut();
                }}
              >
                <LogOutIcon aria-hidden="true" />
                {signingOut ? 'Signing out…' : 'Sign out'}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : null}
      </div>
    </header>
  );
}
