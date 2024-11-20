import React from 'react';
import { Key, KeySquare, KeyRound } from 'lucide-react';

interface DecoyContainerProps {
  handleAttempt: () => void;
  attempts: number;
}

export function DecoyContainer({ handleAttempt, attempts }: DecoyContainerProps) {
  const decoyMessages = [
    { icon: Key, text: "This must be it!" },
    { icon: KeySquare, text: "The key to everything?" },
    { icon: KeyRound, text: "Found something!" },
    { icon: Key, text: "Could this be it?" },
    { icon: KeySquare, text: "Almost there..." },
    { icon: KeyRound, text: "Getting closer!" },
  ];

  return (
    <>
      {decoyMessages.map((decoy, index) => {
        const Icon = decoy.icon;
        const delay = (index * 0.1).toFixed(1);
        const rotateClass = attempts > 5 ? "hover:rotate-45" : "hover:rotate-12";
        
        return (
          <button
            key={index}
            onClick={handleAttempt}
            style={{ animationDelay: `${delay}s` }}
            className={`group relative p-4 bg-slate-800/50 rounded-lg border border-slate-700 
              transition-all duration-300 hover:bg-slate-800/70 animate-fade-in backdrop-blur-sm
              ${attempts > 10 ? "hover:scale-95" : "hover:scale-105"}`}
          >
            <Icon className={`w-6 h-6 text-amber-500 transition-all duration-300 ${rotateClass}`} />
            <p className="mt-2 text-sm text-slate-400 group-hover:text-slate-300">{decoy.text}</p>
            <div className="absolute -inset-px bg-gradient-to-r from-amber-500/10 to-purple-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>
        );
      })}
    </>
  );
}