import React from 'react';

const SkeletonBase = ({ className }) => (
  <div className={`bg-white/5 animate-pulse-slow rounded-2xl ${className}`} />
);

export const SkeletonHero = () => (
  <div className="relative h-[80vh] w-full flex items-center justify-center overflow-hidden bg-background-dark">
    <div className="max-w-[1400px] w-full px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
      <div className="space-y-8">
        <SkeletonBase className="h-4 w-32" />
        <div className="space-y-4">
          <SkeletonBase className="h-20 w-full" />
          <SkeletonBase className="h-20 w-3/4" />
        </div>
        <SkeletonBase className="h-6 w-1/2" />
        <div className="flex space-x-4">
          <SkeletonBase className="h-14 w-40" />
          <SkeletonBase className="h-14 w-40" />
        </div>
      </div>
      <div className="hidden lg:block">
        <SkeletonBase className="h-[600px] w-full rounded-[3rem]" />
      </div>
    </div>
  </div>
);

export const SkeletonCard = () => (
  <div className="flex flex-col space-y-6">
    <SkeletonBase className="h-96 w-full rounded-[2.5rem]" />
    <div className="space-y-4 px-4">
      <SkeletonBase className="h-8 w-1/2" />
      <SkeletonBase className="h-12 w-full" />
    </div>
  </div>
);

export const SkeletonText = ({ lines = 3 }) => (
  <div className="space-y-3">
    {[...Array(lines)].map((_, i) => (
      <SkeletonBase key={i} className={`h-4 ${i === lines - 1 ? 'w-2/3' : 'w-full'}`} />
    ))}
  </div>
);

export default { SkeletonHero, SkeletonCard, SkeletonText };
