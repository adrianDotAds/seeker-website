import { useState, useEffect } from 'react';

// Hook to track window size
export function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });

  useEffect(() => {
    // Only run if window is defined
    if (typeof window === 'undefined') return;

    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    
    // Cleanup on unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
}

// Usage in a component
export default function CheckSize() {
  const { width, height } = useWindowSize();

  return (
    {width, height}
  );
}
