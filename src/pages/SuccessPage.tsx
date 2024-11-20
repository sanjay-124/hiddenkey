import React from 'react';
import { Sparkles } from 'lucide-react';

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white flex items-center justify-center p-8">
      <div className="max-w-2xl text-center relative">
        <Sparkles className="w-16 h-16 mx-auto text-amber-400 animate-float mb-8" />
        
        <h1 className="text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-purple-600">
          What if I told you I'm closer than you think?
        </h1>
        
        <p className="text-slate-300 text-lg mb-6">
          Through shadows and light, through patterns and chaos, you've discovered that sometimes...
        </p>
        
        <div className="mt-12 p-6 bg-slate-800/50 rounded-lg backdrop-blur-sm border border-amber-500/20">
          <p className="text-amber-400 text-lg italic">
            "The most profound truths are often hidden in plain sight, waiting not to be found, but to be realized."
          </p>
        </div>

        {/* Decorative elements */}
        <div className="absolute -top-12 -left-12 w-24 h-24 bg-gradient-to-r from-amber-500/20 to-purple-500/20 rounded-full blur-xl" />
        <div className="absolute -bottom-12 -right-12 w-24 h-24 bg-gradient-to-r from-purple-500/20 to-amber-500/20 rounded-full blur-xl" />
      </div>
    </div>
  );
}