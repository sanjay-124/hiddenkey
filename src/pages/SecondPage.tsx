import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, KeyRound } from 'lucide-react';

export default function SecondPage() {
  const navigate = useNavigate();
  const [pattern, setPattern] = useState<number[]>([]);
  const [showingSequence, setShowingSequence] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // The correct sequence pattern (now with more steps)
  const correctPattern = [2, 4, 1, 3, 2, 6, 8, 5, 7];

  useEffect(() => {
    if (pattern.length === correctPattern.length) {
      if (pattern.every((num, idx) => num === correctPattern[idx])) {
        navigate('/mirror-dimension');
      } else {
        setPattern([]);
      }
    }
  }, [pattern, navigate]);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (showingSequence) {
      timeout = setTimeout(() => {
        if (currentIndex < correctPattern.length) {
          setCurrentIndex(prev => prev + 1);
        } else {
          setShowingSequence(false);
          setCurrentIndex(0);
        }
      }, 800);
    }
    return () => clearTimeout(timeout);
  }, [currentIndex, showingSequence]);

  const handleClick = (index: number) => {
    if (!showingSequence) {
      setPattern(prev => [...prev, index + 1]);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-8">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-600">
          Follow the Path of Light
        </h1>

        <div className="grid grid-cols-3 gap-4 mt-12 max-w-2xl mx-auto">
          {Array.from({ length: 9 }).map((_, index) => (
            <button
              key={index}
              onClick={() => handleClick(index)}
              className={`relative aspect-square rounded-lg transition-all duration-300
                ${showingSequence && currentIndex < correctPattern.length && 
                  correctPattern[currentIndex] === index + 1
                  ? 'bg-cyan-500/50'
                  : 'bg-slate-800/30 hover:bg-slate-700/50'
                }
                ${Math.random() > 0.7 && !showingSequence ? 'animate-pulse' : ''}
              `}
            >
              <KeyRound className={`w-8 h-8 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
                ${showingSequence ? 'opacity-0' : 'opacity-100'}
                transition-all duration-300`}
              />
              
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/20 to-cyan-500/0
                opacity-0 hover:opacity-100 transition-all duration-500 rounded-lg"
              />
            </button>
          ))}
        </div>

        <div className="mt-8 flex justify-center space-x-2">
          {Array.from({ length: correctPattern.length }).map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index < pattern.length ? 'bg-cyan-400' : 'bg-slate-700'
              }`}
            />
          ))}
        </div>

        <p className="text-slate-400 mt-8 animate-pulse">
          {showingSequence ? "Watch carefully..." : "Recreate the sequence"}
        </p>

        <button
          onClick={() => {
            setShowingSequence(true);
            setCurrentIndex(0);
            setPattern([]);
          }}
          className="mt-4 p-2 rounded-full bg-slate-800/50 hover:bg-slate-700/50 transition-all duration-300"
        >
          <Eye className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}