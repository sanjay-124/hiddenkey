import React from 'react';
import { Search } from 'lucide-react';

interface HintPanelProps {
  attempts: number;
  showHint: boolean;
  setShowHint: (show: boolean) => void;
  disabled?: boolean;
}

export function HintPanel({ attempts, showHint, setShowHint, disabled }: HintPanelProps) {
  const getHintMessage = () => {
    if (attempts < 3) return "Not all keys look like keys. Some are hidden in plain sight...";
    if (attempts < 5) return "Sometimes the answer is right in front of you, in the words you read...";
    if (attempts < 7) return "What if the key isn't something you need to find, but something you already have?";
    return "Look closer at the question itself...";
  };

  return (
    <div className="mt-6 text-center">
      <button
        onClick={() => setShowHint(true)}
        disabled={disabled}
        className={`px-4 py-2 bg-slate-700 rounded-md transition-colors duration-300
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-slate-600'}`}
      >
        <Search className="w-4 h-4 inline-block mr-2" />
        Need a hint?
      </button>
      
      {showHint && !disabled && (
        <p className="text-amber-400/80 text-sm mt-4 italic animate-fade-in">
          {getHintMessage()}
        </p>
      )}
    </div>
  );
}