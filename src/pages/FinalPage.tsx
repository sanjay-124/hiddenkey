import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { KeySquare } from 'lucide-react';

export default function FinalPage() {
  const [revealed, setRevealed] = useState(false);
  const navigate = useNavigate();

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const element = e.currentTarget;
    const scrollPercentage = (element.scrollTop / (element.scrollHeight - element.clientHeight)) * 100;
    
    if (scrollPercentage > 90) {
      setRevealed(true);
      setTimeout(() => navigate('/revelation'), 2000);
    }
  };

  return (
    <div 
      className="h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-auto"
      onScroll={handleScroll}
    >
      <div className="min-h-[200vh] relative">
        <div className="sticky top-0 p-8 text-center">
          <h1 className="text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-violet-600">
            The truth lies at the bottom
          </h1>
          
          <KeySquare className="w-12 h-12 mx-auto text-blue-400 animate-bounce" />
          
          <p className="text-slate-400 mt-4">
            Keep scrolling to reveal the truth
          </p>
        </div>

        <div className={`fixed inset-0 bg-black/90 flex items-center justify-center transition-opacity duration-1000 ${
          revealed ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}>
          <p className="text-3xl font-bold text-white text-center animate-fade-in">
            The key was never meant to be found...
          </p>
        </div>
      </div>
    </div>
  );
}