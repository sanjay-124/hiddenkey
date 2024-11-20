import React, { useEffect, useState } from 'react';
import { Timer } from 'lucide-react';

interface TimeoutPanelProps {
  attempts: number;
  onTimeoutEnd: () => void;
}

export function TimeoutPanel({ attempts, onTimeoutEnd }: TimeoutPanelProps) {
  const [timeLeft, setTimeLeft] = useState(0);

  const getTimeoutDuration = () => {
    if (attempts < 8) return 180; // 3 minutes
    if (attempts < 15) return 300; // 5 minutes
    if (attempts < 20) return 480; // 8 minutes
    return 600; // 10 minutes
  };

  useEffect(() => {
    if (attempts > 10 && timeLeft === 0) {
      setTimeLeft(getTimeoutDuration());
    }
  }, [attempts]);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            onTimeoutEnd();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [timeLeft, onTimeoutEnd]);

  if (timeLeft === 0) return null;

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 animate-fade-in">
      <div className="bg-slate-800 p-8 rounded-lg shadow-xl border border-red-500/30 max-w-md w-full mx-4">
        <div className="flex items-center justify-center mb-6">
          <Timer className="w-12 h-12 text-red-500 animate-pulse" />
        </div>
        <h3 className="text-2xl font-bold text-center mb-4">Time Out!</h3>
        <p className="text-slate-300 text-center mb-6">
          Too many attempts! Please wait before trying again.
        </p>
        <div className="text-4xl text-center font-mono text-red-400">
          {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
        </div>
        <p className="text-sm text-slate-400 text-center mt-6">
          Hint: Take a moment to think about where the key might be hiding.
          Sometimes the obvious is deliberately misleading.
        </p>
      </div>
    </div>
  );
}