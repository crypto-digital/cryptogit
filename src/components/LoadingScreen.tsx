import { useState, useEffect } from 'react';
import { Lock, Shield, Key } from 'lucide-react';

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsExiting(true);
            setTimeout(onComplete, 500);
          }, 300);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div 
      className={`fixed inset-0 z-[100] bg-black flex items-center justify-center transition-all duration-500 ${
        isExiting ? 'opacity-0 scale-110' : 'opacity-100 scale-100'
      }`}
    >
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-ios-blue/20 rounded-full blur-[128px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-ios-purple/20 rounded-full blur-[128px] animate-pulse animation-delay-500" />
      </div>

      <div className="relative z-10 text-center">
        <div className="relative w-32 h-32 mx-auto mb-8">
          <div className="absolute inset-0 flex items-center justify-center">
            <div 
              className="w-24 h-24 rounded-3xl bg-gradient-to-br from-ios-blue to-ios-purple flex items-center justify-center animate-pulse-glow"
              style={{ animationDuration: '2s' }}
            >
              <Lock className="w-12 h-12 text-white" />
            </div>
          </div>
          
          <div 
            className="absolute inset-0 animate-spin"
            style={{ animationDuration: '8s' }}
          >
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-8 rounded-xl bg-ios-green/30 flex items-center justify-center">
              <Shield className="w-4 h-4 text-ios-green" />
            </div>
          </div>
          
          <div 
            className="absolute inset-0 animate-spin"
            style={{ animationDuration: '12s', animationDirection: 'reverse' }}
          >
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-8 h-8 rounded-xl bg-ios-pink/30 flex items-center justify-center">
              <Key className="w-4 h-4 text-ios-pink" />
            </div>
          </div>
        </div>

        <h1 className="text-3xl font-bold text-white mb-2">
          <span className="gradient-text">КриптоГид</span>
        </h1>
        <p className="text-white/50 mb-8">Загрузка ресурсов...</p>

        <div className="w-64 h-2 bg-white/10 rounded-full overflow-hidden mx-auto">
          <div 
            className="h-full bg-gradient-to-r from-ios-blue via-ios-purple to-ios-pink rounded-full transition-all duration-100"
            style={{ 
              width: `${progress}%`,
              boxShadow: '0 0 20px rgba(0, 122, 255, 0.5)'
            }}
          />
        </div>

        <p className="text-white/30 text-sm mt-3 font-mono">{progress}%</p>
      </div>

      <style>{`
        .animation-delay-500 {
          animation-delay: 500ms;
        }
      `}</style>
    </div>
  );
}
