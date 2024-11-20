import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, Palette, KeyRound } from 'lucide-react';

export default function ThirdPage() {
  const navigate = useNavigate();
  const [showHint, setShowHint] = useState(false);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [visibleCircles, setVisibleCircles] = useState<number[]>([]);
  const [revealedKey, setRevealedKey] = useState(false);

  // The secret color sequence that reveals the key
  const correctSequence = ['purple', 'cyan', 'amber', 'emerald', 'purple'];
  const colorOptions = [
    { name: 'purple', bg: 'bg-purple-500', hover: 'hover:bg-purple-400' },
    { name: 'cyan', bg: 'bg-cyan-500', hover: 'hover:bg-cyan-400' },
    { name: 'amber', bg: 'bg-amber-500', hover: 'hover:bg-amber-400' },
    { name: 'emerald', bg: 'bg-emerald-500', hover: 'hover:bg-emerald-400' },
    { name: 'rose', bg: 'bg-rose-500', hover: 'hover:bg-rose-400' }, // Decoy color
  ];

  useEffect(() => {
    // Show circles one by one
    const interval = setInterval(() => {
      setVisibleCircles(prev => {
        if (prev.length < 12) {
          const newCircle = Math.floor(Math.random() * 12);
          return [...new Set([...prev, newCircle])];
        }
        return prev;
      });
    }, 300);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (selectedColors.length === correctSequence.length) {
      const isCorrect = selectedColors.every(
        (color, index) => color === correctSequence[index]
      );
      if (isCorrect) {
        setRevealedKey(true);
        setTimeout(() => navigate('/final-truth'), 2000);
      } else {
        setSelectedColors([]);
      }
    }
  }, [selectedColors, navigate]);

  const handleColorClick = (colorName: string) => {
    if (selectedColors.length < correctSequence.length) {
      setSelectedColors(prev => [...prev, colorName]);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-8 relative overflow-hidden">
      {/* Background circles */}
      {Array.from({ length: 12 }).map((_, index) => (
        <div
          key={index}
          className={`absolute w-32 h-32 rounded-full transition-all duration-1000 opacity-0
            ${visibleCircles.includes(index) ? 'opacity-10' : ''}`}
          style={{
            left: `${(index % 4) * 30}%`,
            top: `${Math.floor(index / 4) * 30}%`,
            background: `radial-gradient(circle, ${
              colorOptions[index % colorOptions.length].name
            } 0%, transparent 70%)`,
            transform: `scale(${1 + Math.sin(index) * 0.5})`,
          }}
        />
      ))}

      <div className="max-w-4xl mx-auto relative z-10">
        <h1 className="text-4xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-cyan-400 to-emerald-400">
          The Chromatic Gateway
        </h1>

        {/* Color selection grid */}
        <div className="grid grid-cols-5 gap-6 max-w-2xl mx-auto mb-12">
          {colorOptions.map((color) => (
            <button
              key={color.name}
              onClick={() => handleColorClick(color.name)}
              className={`aspect-square rounded-lg transition-all duration-300 transform
                ${color.bg} ${color.hover} hover:scale-105 hover:shadow-lg
                hover:shadow-${color.name}-500/20`}
            >
              <span className="sr-only">{color.name}</span>
            </button>
          ))}
        </div>

        {/* Selected colors display */}
        <div className="flex justify-center space-x-4 mb-8">
          {Array.from({ length: correctSequence.length }).map((_, index) => (
            <div
              key={index}
              className={`w-8 h-8 rounded-full transition-all duration-300 ${
                selectedColors[index]
                  ? `bg-${selectedColors[index]}-500`
                  : 'bg-slate-700'
              }`}
            />
          ))}
        </div>

        {/* Revealed key animation */}
        {revealedKey && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <KeyRound className="w-24 h-24 text-purple-400 animate-pulse" />
          </div>
        )}

        {/* Hint button */}
        <button
          onClick={() => setShowHint(!showHint)}
          className="fixed bottom-8 right-8 p-2 rounded-full bg-slate-800/50 hover:bg-slate-700/50 transition-all duration-300"
        >
          <Eye className="w-5 h-5" />
        </button>

        {showHint && (
          <div className="fixed bottom-24 right-8 w-64 p-4 bg-slate-800/90 rounded-lg shadow-lg backdrop-blur-sm animate-fade-in">
            <p className="text-sm text-slate-400">
              "The title holds the key. Follow its flow, and the path will reveal itself..."
            </p>
          </div>
        )}

        {/* Color palette icon */}
        <div className="fixed bottom-8 left-8">
          <Palette className="w-6 h-6 text-slate-400 animate-pulse" />
        </div>
      </div>
    </div>
  );
}