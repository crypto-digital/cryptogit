import { useEffect, useRef, useState } from 'react';
import { 
  ArrowDown, 
  Shield, 
  Key, 
  Lock, 
  Sparkles, 
  ChevronRight, 
  Wrench,
  Fingerprint,
  Eye,
  FileKey
} from 'lucide-react';

const floatingIcons = [
  { Icon: Lock, delay: 0, x: '8%', y: '15%', size: 'w-10 h-10', opacity: 0.15 },
  { Icon: Key, delay: 1.5, x: '90%', y: '20%', size: 'w-8 h-8', opacity: 0.12 },
  { Icon: Shield, delay: 3, x: '85%', y: '65%', size: 'w-12 h-12', opacity: 0.1 },
  { Icon: Lock, delay: 0.5, x: '12%', y: '70%', size: 'w-6 h-6', opacity: 0.08 },
  { Icon: Key, delay: 2.5, x: '92%', y: '45%', size: 'w-7 h-7', opacity: 0.1 },
  { Icon: Sparkles, delay: 4, x: '5%', y: '45%', size: 'w-9 h-9', opacity: 0.12 },
  { Icon: Shield, delay: 2, x: '20%', y: '85%', size: 'w-8 h-8', opacity: 0.08 },
  { Icon: Fingerprint, delay: 3.5, x: '75%', y: '80%', size: 'w-6 h-6', opacity: 0.06 },
  { Icon: Eye, delay: 1, x: '95%', y: '75%', size: 'w-7 h-7', opacity: 0.09 },
  { Icon: FileKey, delay: 2.8, x: '3%', y: '25%', size: 'w-8 h-8', opacity: 0.11 },
];

const stats = [
  { value: '4000+', label: 'Лет истории', suffix: '' },
  { value: '100', label: 'Видов шифров', suffix: '+' },
  { value: '∞', label: 'Возможностей', suffix: '' },
];

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        setMousePosition({
          x: (e.clientX - rect.left - rect.width / 2) / 50,
          y: (e.clientY - rect.top - rect.height / 2) / 50,
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black"
    >
      <div className="absolute inset-0">
        <div 
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-ios-blue/20 rounded-full blur-[150px] animate-pulse transition-transform duration-300"
          style={{ transform: `translate(${mousePosition.x * -1}px, ${mousePosition.y * -1}px)` }}
        />
        <div 
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-ios-purple/15 rounded-full blur-[150px] animate-pulse transition-transform duration-300"
          style={{ 
            transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
            animationDelay: '1s' 
          }}
        />
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-ios-pink/10 rounded-full blur-[150px] animate-pulse transition-transform duration-300"
          style={{ 
            transform: `translate(calc(-50% + ${mousePosition.x * 0.5}px), calc(-50% + ${mousePosition.y * 0.5}px))`,
            animationDelay: '2s' 
          }}
        />

        {floatingIcons.map(({ Icon, delay, x, y, size, opacity }, index) => (
          <div
            key={index}
            className="absolute animate-float"
            style={{
              left: x,
              top: y,
              animationDelay: `${delay}s`,
              animationDuration: `${6 + index}s`,
              opacity,
            }}
          >
            <Icon className={`${size} text-white`} />
          </div>
        ))}

        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '80px 80px',
          }}
        />

        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white/20 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 pt-20 pb-24 text-center">
        <div 
          className={`inline-flex items-center gap-2 px-4 py-2 glass rounded-full mb-8 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '200ms' }}
        >
          <Sparkles className="w-4 h-4 text-ios-blue animate-pulse" />
          <span className="text-sm text-white/80">Образовательный проект • 2026</span>
          <div className="w-1.5 h-1.5 rounded-full bg-ios-green animate-pulse" />
        </div>

        <div 
          className={`mb-6 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '400ms' }}
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
            <span className="relative inline-block">
              <span className="gradient-text animate-shimmer bg-gradient-to-r from-ios-blue via-ios-purple to-ios-pink bg-[length:200%_auto]">
                Криптография:
              </span>
            </span>
            <br />
            <span className="text-white">Шифрование</span>
            <br />
            <span className="text-white/80">и Дешифрование</span>
          </h1>
        </div>

        <p 
          className={`text-lg sm:text-xl text-white/60 max-w-2xl mx-auto mb-10 leading-relaxed transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '600ms' }}
        >
          Погрузитесь в мир тайнописи — от{' '}
          <span className="text-ios-blue">древних шифров</span> до{' '}
          <span className="text-ios-purple">современных алгоритмов</span> защиты данных
        </p>

        <div 
          className={`flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '800ms' }}
        >
          <button 
            onClick={() => scrollToSection('#history')}
            className="group relative px-8 py-4 rounded-2xl font-semibold text-white overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-glow-lg"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-ios-blue to-ios-purple" />
            <div className="absolute inset-0 bg-gradient-to-r from-ios-purple to-ios-pink opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative z-10 flex items-center gap-2">
              Начать изучение
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </button>
          
          <button 
            onClick={() => scrollToSection('#tools')}
            className="group px-8 py-4 glass rounded-2xl font-semibold text-white hover:bg-white/15 transition-all duration-300 hover:scale-105"
          >
            <span className="flex items-center gap-2">
              <Wrench className="w-5 h-5 text-ios-blue" />
              Попробовать шифрование
            </span>
          </button>
        </div>

        <div 
          className={`grid grid-cols-3 gap-4 max-w-xl mx-auto transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '1000ms' }}
        >
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="glass rounded-2xl p-4 hover:bg-white/10 transition-all duration-300 group cursor-default"
            >
              <div className="text-2xl sm:text-3xl font-bold gradient-text-blue group-hover:scale-110 transition-transform">
                {stat.value}{stat.suffix}
              </div>
              <div className="text-xs sm:text-sm text-white/50 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        <div 
          className={`absolute bottom-8 left-1/2 -translate-x-1/2 transition-all duration-700 ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ transitionDelay: '1200ms' }}
        >
          <button 
            onClick={() => scrollToSection('#comparison')}
            className="flex flex-col items-center gap-2 text-white/40 hover:text-white/60 transition-colors group"
          >
            <span className="text-xs">Листайте вниз</span>
            <div className="w-10 h-10 rounded-full glass flex items-center justify-center group-hover:bg-white/10 transition-colors">
              <ArrowDown className="w-5 h-5 animate-bounce-subtle" />
            </div>
          </button>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black via-black/50 to-transparent pointer-events-none" />
    </section>
  );
}
