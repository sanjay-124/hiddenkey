import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Key, Search, Eye } from 'lucide-react';

export default function HomePage() {
  const navigate = useNavigate();
  const [selectedLetters, setSelectedLetters] = useState<string[]>([]);
  const [showHint, setShowHint] = useState(false);
  
  // The secret word is "HIDDEN" - must be collected in order
  const secretWord = "HIDDEN";
  
  useEffect(() => {
    if (selectedLetters.join('') === secretWord) {
      navigate('/shadow-realm');
    }
  }, [selectedLetters, navigate]);

  const handleLetterClick = (letter: string, index: number) => {
    if (letter === secretWord[selectedLetters.length]) {
      setSelectedLetters(prev => [...prev, letter]);
    } else {
      setSelectedLetters([]);
    }
  };

  // Text that contains the hidden letters
  const paragraphs = [
    "Here lies the beginning of your journey.",
    "Inside every shadow, a secret waits.",
    "Darkness conceals what light reveals.",
    "Deeper meanings hide in plain sight.",
    "Examine carefully, for truth is elusive.",
    "Nowhere is as it seems here."
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
          The Key is Not What You Seek
        </h1>

        <div className="grid grid-cols-1 gap-8 mt-12">
          {paragraphs.map((text, index) => (
            <div 
              key={index}
              className="relative group"
            >
              <p className="text-lg text-slate-400 leading-relaxed">
                {text.split('').map((letter, letterIndex) => (
                  <span
                    key={letterIndex}
                    className={`inline-block transition-all duration-300 cursor-default
                      ${secretWord.includes(letter) ? 'hover:text-purple-400 hover:scale-110' : ''}
                    `}
                    onClick={() => handleLetterClick(letter, index)}
                  >
                    {letter}
                  </span>
                ))}
              </p>
              
              {/* Floating decorative keys as distractions */}
              <Key 
                className={`absolute -right-4 top-1/2 transform -translate-y-1/2 
                  text-slate-700 opacity-30 w-6 h-6 transition-all duration-500
                  group-hover:rotate-45 group-hover:scale-110`}
              />
            </div>
          ))}
        </div>

        {/* Progress indicator */}
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="flex items-center space-x-2">
            {Array.from({ length: secretWord.length }).map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index < selectedLetters.length
                    ? 'bg-purple-400 scale-110'
                    : 'bg-slate-700'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Hint button */}
        <button
          onClick={() => setShowHint(!showHint)}
          className="fixed bottom-8 right-8 p-2 rounded-full bg-slate-800/50 
            hover:bg-slate-700/50 transition-all duration-300"
        >
          {showHint ? <Eye className="w-5 h-5" /> : <Search className="w-5 h-5" />}
        </button>

        {/* Hint panel */}
        {showHint && (
          <div className="fixed bottom-24 right-8 w-64 p-4 bg-slate-800/90 
            rounded-lg shadow-lg backdrop-blur-sm animate-fade-in">
            <p className="text-sm text-slate-400">
              "First letters hold power, but only when found in the right order..."
            </p>
          </div>
        )}
      </div>
    </div>
  );
}