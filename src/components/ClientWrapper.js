"use client";

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const SafeHydration = ({ children }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return <>{children}</>;
};

export default function ClientWrapper({ children }) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SafeHydration>
        {children}
      </SafeHydration>
    </Suspense>
  );
}