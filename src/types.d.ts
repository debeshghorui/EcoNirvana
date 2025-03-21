// Type declarations for libraries without built-in TypeScript definitions
// This resolves "Cannot find module X or its corresponding type declarations" errors

declare module 'react-icons/fa';
declare module 'framer-motion';
declare module 'next/image' {
  import { ComponentType, ReactElement } from 'react';
  
  interface ImageProps {
    src: string;
    alt: string;
    width?: number;
    height?: number;
    fill?: boolean;
    style?: React.CSSProperties;
    priority?: boolean;
    className?: string;
    quality?: number;
    [key: string]: any;
  }

  const Image: ComponentType<ImageProps>;
  export default Image;
}

declare module 'next/link';
declare module 'next/navigation';
declare module '@/components/layout/PageHeader';
declare module '@/components/ui/Container';
declare module '@/components/ui/Card';
declare module '@/components/ui/Button';
declare module '@/context/AuthContext';
declare module '@/lib/gemini';

// Define JSX IntrinsicElements to avoid JSX element implicitly has type 'any' errors
declare namespace JSX {
  interface IntrinsicElements {
    [elemName: string]: any;
  }
} 