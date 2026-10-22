"use client";

import * as React from 'react';
import { usePathname } from 'next/navigation';

import { AuthGuard } from '@/components/auth/auth-guard';
import { AppSidebar } from '@/components/dashboard/app-sidebar';
import { DASHBOARD_PAGES, SiteHeader } from '@/components/dashboard/site-header';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';

type DashboardShellProps = {
  children: React.ReactNode;
};

/**
 * Application shell for the internal dashboard.
 *
 * Adapted from the shadcn/ui `sidebar` and `dashboard-01` blocks (MIT) and
 * re-skinned with the Vision Upgrade palette: navy sidebar, orange active
 * highlight, light content surface.
 */
export function DashboardShell({ children }: DashboardShellProps) {
  const pathname = usePathname();

  // Mirrors the breadcrumb in the header. The heading is visually hidden because
  // the page title is already shown in the header, but it keeps every screen
  // anchored to a single <h1> for assistive technology.
  const current =
    DASHBOARD_PAGES.find((page) =>
      page.href === '/dashboard' ? pathname === page.href : pathname.startsWith(page.href),
    ) ?? DASHBOARD_PAGES[0];

  return (
    <AuthGuard>
      <a
        href="#dashboard-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:rounded-md focus:bg-navy focus:px-3 focus:py-2 focus:text-sm focus:font-medium focus:text-white"
      >
        Skip to content
      </a>

      <SidebarProvider>
        <AppSidebar />
        <SidebarInset className="min-w-0 bg-surface">
          <SiteHeader />
          <div id="dashboard-content" tabIndex={-1} className="flex flex-1 flex-col gap-6 p-4 outline-none lg:p-6">
            <h1 className="sr-only">{current.title}</h1>
            {children}
          </div>
        </SidebarInset>
      </SidebarProvider>
    </AuthGuard>
  );
}
