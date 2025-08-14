'use client';

import { MockSessionProvider } from '@/lib/mock/auth';
import { ReactNode } from 'react';

interface SessionWrapperProps {
  children: ReactNode;
}

export default function SessionWrapper({ children }: SessionWrapperProps) {
  return <MockSessionProvider>{children}</MockSessionProvider>;
}
