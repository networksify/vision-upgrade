"use client";

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  BookOpenIcon,
  LayoutDashboardIcon,
  MessagesSquareIcon,
  SettingsIcon,
  UsersIcon,
} from 'lucide-react';

import { NavUser } from '@/components/dashboard/nav-user';
import { Logo } from '@/components/ui/Logo';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from '@/components/ui/sidebar';
import { Brand } from '@/data/brand';

/**
 * Navigation model for the dashboard shell.
 *
 * `href` values are plain routes so the active state can be derived from the
 * current pathname without any client state.
 */
export const DASHBOARD_NAV_SECTIONS = [
  {
    label: 'Workspace',
    items: [
      {
        title: 'Dashboard overview',
        href: '/dashboard',
        icon: LayoutDashboardIcon,
      },
      {
        title: 'Admin accounts',
        href: '/dashboard/accounts',
        icon: UsersIcon,
      },
      {
        title: 'Courses',
        href: '/dashboard/courses',
        icon: BookOpenIcon,
      },
      {
        title: 'Company chat',
        href: '/dashboard/chat',
        icon: MessagesSquareIcon,
      },
    ],
  },
  {
    label: 'Manage',
    items: [
      {
        title: 'Settings',
        href: '/dashboard/settings',
        icon: SettingsIcon,
      },
    ],
  },
] as const;

export const isNavItemActive = (href: string, pathname: string): boolean =>
  href === '/dashboard' ? pathname === href : pathname === href || pathname.startsWith(`${href}/`);

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              size="lg"
              className="data-[slot=sidebar-menu-button]:p-2!"
            >
              <Link href="/dashboard" aria-label="Vision Upgrade dashboard home">
                <Logo
                  brand={Brand}
                  variant="light"
                  asLink={false}
                  markClassName="h-7 w-auto"
                  wordmarkClassName="h-4 w-auto"
                  markSizes="28px"
                  wordmarkSizes="112px"
                />
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        {DASHBOARD_NAV_SECTIONS.map((section) => (
          <SidebarGroup key={section.label}>
            <SidebarGroupLabel>{section.label}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {section.items.map((item) => {
                  const active = isNavItemActive(item.href, pathname);

                  return (
                    <SidebarMenuItem key={item.href}>
                      <SidebarMenuButton
                        asChild
                        isActive={active}
                        tooltip={item.title}
                        className={
                          active
                            ? 'data-active:bg-brand data-active:font-semibold data-active:text-navy'
                            : undefined
                        }
                      >
                        <Link href={item.href} aria-current={active ? 'page' : undefined}>
                          <item.icon aria-hidden="true" />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <NavUser />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
