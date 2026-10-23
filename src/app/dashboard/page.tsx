import type { Metadata } from "next";

import { OverviewDashboard } from "@/components/dashboard/overview-dashboard";

export const metadata: Metadata = {
  title: "Dashboard overview",
  description: "Overview of Vision Upgrade administrator accounts and courses.",
};

/*
 * The dashboard layout renders a session-check screen instead of `{children}`
 * while `AuthGuard` resolves, so a prerender drops this page from the tree.
 * Next.js 16 then can't validate the segment for instant navigation; opting out
 * is the documented remedy for a route gated behind client-side auth.
 */
export const instant = false;

export default function DashboardPage() {
  return <OverviewDashboard />;
}
