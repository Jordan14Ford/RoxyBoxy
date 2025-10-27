'use client';

export const LoadingSpinner = ({ size = 20 }: { size?: number }) => {
  const dimension = `${size}px`;
  return (
    <span
      className="inline-block animate-spin rounded-full border-2 border-white/40 border-t-white"
      style={{ width: dimension, height: dimension }}
      aria-label="Loading"
      role="status"
    />
  );
};
