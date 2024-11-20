import React from 'react';
import { CheckCircle } from 'lucide-react';

export function SuccessMessage() {
  return (
    <div className="bg-emerald-900/30 p-8 rounded-lg shadow-xl border border-emerald-700/50 animate-fade-in backdrop-blur-sm">
      <div className="flex justify-center mb-6">
        <CheckCircle className="w-16 h-16 text-emerald-400 animate-float" />
      </div>
      <p className="text-emerald-200 text-2xl mb-4">
        Congratulations! You found the hidden key!
      </p>
      <p className="text-emerald-400 mt-4">
        The key was hiding in plain sight - within the shimmering title itself.
        While everyone was searching for buttons and clicking around, the answer
        was right at the top, masked by its own brilliance.
      </p>
    </div>
  );
}