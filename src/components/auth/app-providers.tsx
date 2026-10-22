"use client";

import * as React from 'react';

import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { ServicesProvider } from '@/lib/providers/service-context';

import { AuthProvider } from './auth-provider';

type AppProvidersProps = {
  children: React.ReactNode;
};

/**
 * Client side providers shared by the sign-in screen and the dashboard.
 *
 * `ServicesProvider` decides which data provider implementation the dashboard
 * talks to; `AuthProvider` owns the session; `TooltipProvider` backs the
 * collapsible sidebar labels; `Toaster` renders the confirmation messages.
 */
export function AppProviders({ children }: AppProvidersProps) {
  return (
    <ServicesProvider>
      <AuthProvider>
        <TooltipProvider>
          {children}
          <Toaster position="bottom-right" />
        </TooltipProvider>
      </AuthProvider>
    </ServicesProvider>
  );
}
