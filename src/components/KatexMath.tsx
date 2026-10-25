import React, { useMemo } from 'react';
import katex from 'katex';

interface KatexMathProps {
  math: string;
  block?: boolean;
  className?: string;
}

export const KatexMath: React.FC<KatexMathProps> = ({ math, block = false, className = '' }) => {
  const html = useMemo(() => {
    try {
      return katex.renderToString(math, {
        displayMode: block,
        throwOnError: false,
        strict: false
      });
    } catch {
      return math;
    }
  }, [math, block]);

  if (block) {
    return (
      <div 
        className={`katex-block overflow-x-auto py-1 text-center font-mono ${className}`}
        dangerouslySetInnerHTML={{ __html: html }} 
      />
    );
  }

  return (
    <span 
      className={`katex-inline font-mono ${className}`}
      dangerouslySetInnerHTML={{ __html: html }} 
    />
  );
};
