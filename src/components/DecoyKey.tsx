import React from 'react';
import { Key } from 'lucide-react';

interface DecoyKeyProps {
  message: string;
  setAttempts: () => void;
  disabled?: boolean;
}

export function DecoyKey({ message, setAttempts, disabled }: DecoyKeyProps) {
  return (
    <button
      onClick={setAttempts}
      disabled={disabled}
      className={`group relative p-4 bg-slate-800/50 rounded-lg border border-slate-700 transition-all duration-300
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-slate-800/70'}`}
    >
      <Key className="w-6 h-6 text-amber-500 group-hover:rotate-12 transition-transform duration-300" />
      <p className="mt-2 text-sm text-slate-400 group-hover:text-slate-300">{message}</p>
      <div className="absolute -inset-px bg-gradient-to-r from-amber-500/10 to-purple-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </button>
  );
}