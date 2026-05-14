import React from 'react';

const SkeletonBase = ({ className }) => (
  <div className={`bg-white/5 animate-pulse-slow rounded-2xl ${className}`} />
);

export const SkeletonHero = () => (
  <div className="relative min-h-[60vh] md:h-[80vh] w-full flex items-center justify-center overflow-hidden bg-background-dark pt-20 md:pt-0">
    <div className="max-w-[1400px] w-full px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-center">
      <div className="space-y-6 md:space-y-8 text-center lg:text-left">
        <SkeletonBase className="h-4 w-32 mx-auto lg:mx-0" />
        <div className="space-y-4">
          <SkeletonBase className="h-12 md:h-20 w-full" />
          <SkeletonBase className="h-12 md:h-20 w-3/4 mx-auto lg:mx-0" />
        </div>
        <SkeletonBase className="h-6 w-1/2 mx-auto lg:mx-0" />
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center lg:justify-start">
          <SkeletonBase className="h-12 md:h-14 w-full sm:w-40" />
          <SkeletonBase className="h-12 md:h-14 w-full sm:w-40" />
        </div>
      </div>
      <div className="block">
        <SkeletonBase className="aspect-[4/3] md:aspect-auto md:h-[500px] lg:h-[600px] w-full rounded-[2rem] md:rounded-[3rem]" />
      </div>
    </div>
  </div>
);

export const SkeletonCard = () => (
  <div className="flex flex-col space-y-4 md:space-y-6">
    <SkeletonBase className="aspect-[4/5] md:h-96 w-full rounded-[2rem] md:rounded-[2.5rem]" />
    <div className="space-y-3 md:space-y-4 px-2 md:px-4">
      <SkeletonBase className="h-6 md:h-8 w-1/2" />
      <SkeletonBase className="h-10 md:h-12 w-full" />
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
