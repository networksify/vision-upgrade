"use client";

import * as React from 'react';

import type { DashboardServices } from '@/lib/services';

import { createMockServices } from './mock';

const ServicesContext = React.createContext<DashboardServices | null>(null);

type ServicesProviderProps = {
  children: React.ReactNode;
};

/**
 * Makes the active provider set available to the dashboard UI.
 *
 * The prototype mounts the mock providers. When the backend lands, swap
 * `createMockServices()` for an HTTP-backed implementation of the same
 * `DashboardServices` interface — no component reads anything else.
 */
export function ServicesProvider({ children }: ServicesProviderProps) {
  const services = React.useMemo(() => createMockServices(), []);

  return <ServicesContext.Provider value={services}>{children}</ServicesContext.Provider>;
}

export function useServices(): DashboardServices {
  const services = React.useContext(ServicesContext);

  if (!services) {
    throw new Error('useServices must be used inside a <ServicesProvider>.');
  }

  return services;
}
