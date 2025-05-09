// src/app/ssk/page.js
'use client';
import { Suspense } from 'react';
import dynamic from 'next/dynamic';

// Use relative paths for local components
const WebchatPreview = dynamic(() => import('./WebchatPreview'), { 
  ssr: false,
  loading: () => <SkeletonLoader />
});

// Import components using correct paths
const SafeImage = dynamic(() => import('@/components/SafeImage'), { ssr: false });
const CurrentImage = dynamic(() => import('@/components/CurrentImage'), { ssr: false });

// Keep your existing SkeletonLoader component
const SkeletonLoader = () => {/* ... */};

export default function Page() {
  return (
    <Suspense fallback={<SkeletonLoader />}>
      <WebchatPreview>
        <SafeImage>
          <CurrentImage />
        </SafeImage>
      </WebchatPreview>
    </Suspense>
  );
}