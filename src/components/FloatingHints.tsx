import React, { useMemo } from 'react';

interface FloatingHintsProps {
  attempts: number;
  lastClickTime: number;
}

export function FloatingHints({ attempts, lastClickTime }: FloatingHintsProps) {
  const hints = useMemo(() => {
    if (attempts < 3) return [];
    
    const baseHints = [
      "Some things shine brighter than others...",
      "Not all that glitters is gold",
      "The path most traveled might be wrong",
      "What catches your eye might blind you from truth",
    ];

    if (attempts > 7) {
      baseHints.push("Have you tried looking at things differently?");
      baseHints.push("Sometimes the answer is in the question itself");
    }

    if (attempts > 12) {
      baseHints.push("The title holds more than just words");
      baseHints.push("What happens when you interact with text?");
    }

    return baseHints;
  }, [attempts]);

  if (hints.length === 0) return null;

  return (
    <div className="absolute inset-0 pointer-events-none select-none">
      {hints.map((hint, index) => {
        const delay = ((index * 0.5) + (lastClickTime % 2)).toFixed(1);
        const top = `${20 + Math.random() * 60}%`;
        const left = `${10 + Math.random() * 80}%`;
        
        return (
          <div
            key={`${index}-${lastClickTime}`}
            className="absolute animate-float opacity-0"
            style={{
              top,
              left,
              animation: `float 3s ease-in-out infinite ${delay}s, fade-in 0.5s ease-out ${delay}s forwards`,
              color: `rgba(255,255,255,${0.1 + (Math.random() * 0.2)})`,
            }}
          >
            {hint}
          </div>
        );
      })}
    </div>
  );
}