import { useEffect, useRef, useState } from 'react';
import { 
  Wifi, 
  Lock, 
  Unlock, 
  AlertTriangle, 
  CheckCircle, 
  ArrowRight, 
  Shield, 
  Zap,
  User,
  FileText,
  Settings,
  EyeOff,
  Eye,
  Key
} from 'lucide-react';

export default function DataComparison() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [animationStep, setAnimationStep] = useState(0);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isVisible) {
      const interval = setInterval(() => {
        setAnimationStep((prev) => (prev + 1) % 5);
      }, 2500);
      return () => clearInterval(interval);
    }
  }, [isVisible]);

  return (
    <section
      id="comparison"
      ref={sectionRef}
      className="section-padding bg-black relative overflow-hidden"
    >
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-ios-blue/5 rounded-full blur-[150px]" />
        
        <svg className="absolute inset-0 w-full h-full opacity-10">
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#007AFF" stopOpacity="0" />
              <stop offset="50%" stopColor="#007AFF" stopOpacity="1" />
              <stop offset="100%" stopColor="#007AFF" stopOpacity="0" />
            </linearGradient>
          </defs>
          {[...Array(5)].map((_, i) => (
            <line
              key={i}
              x1="0"
              y1={`${20 + i * 15}%`}
              x2="100%"
              y2={`${20 + i * 15}%`}
              stroke="url(#lineGradient)"
              strokeWidth="1"
              strokeDasharray="10 20"
              className="animate-pulse"
              style={{ animationDelay: `${i * 200}ms` }}
            />
          ))}
        </svg>
      </div>

      <div className="container-max relative z-10">
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full mb-6">
            <Zap className="w-4 h-4 text-ios-yellow" />
            <span className="text-sm text-white/70">Сравнение методов передачи</span>
          </div>
          
          <h2 className="text-title font-bold mb-4">
            <span className="gradient-text">Обычная</span>
            <span className="text-white"> vs </span>
            <span className="text-ios-green">Зашифрованная</span>
          </h2>
          <p className="text-white/60 max-w-xl mx-auto">
            Узнайте, как шифрование защищает ваши данные от перехвата злоумышленниками
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <div 
            className={`relative transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            style={{ transitionDelay: '200ms' }}
            onMouseEnter={() => setHoveredCard(0)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div className={`glass-card p-8 h-full transition-all duration-300 ${hoveredCard === 0 ? 'scale-[1.02] border-ios-red/30' : ''}`}>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-ios-red/30 to-rose-600/30 flex items-center justify-center animate-pulse">
                  <Unlock className="w-7 h-7 text-ios-red" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white">Обычная передача</h3>
                  <p className="text-sm text-white/50">Данные в открытом виде</p>
                </div>
              </div>

              <div className="bg-black/50 rounded-2xl p-6 mb-6 border border-white/5">
                <div className="flex items-center justify-between relative">
                  <div className="text-center z-10">
                    <div className="w-14 h-14 rounded-2xl bg-zinc-800 flex items-center justify-center mb-2 border border-white/10">
                      <User className="w-7 h-7 text-white/60" />
                    </div>
                    <span className="text-xs text-white/50">Отправитель</span>
                  </div>

                  <div className="flex-1 mx-4 relative">
                    <div className="h-1 bg-zinc-700 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-zinc-500 rounded-full transition-all duration-1000"
                        style={{ 
                          width: animationStep < 3 ? '100%' : '0%',
                          opacity: animationStep < 3 ? 1 : 0.3
                        }}
                      />
                    </div>
                    
                    <div 
                      className="absolute top-1/2 -translate-y-1/2 w-10 h-10 rounded-lg bg-zinc-600 flex items-center justify-center transition-all duration-1000 shadow-lg"
                      style={{
                        left: animationStep === 0 ? '0%' : animationStep === 1 ? '50%' : animationStep === 2 ? '100%' : '0%',
                        transform: `translateY(-50%) translateX(${animationStep === 2 ? '-100%' : animationStep === 1 ? '-50%' : '0%'})`,
                        opacity: animationStep < 3 ? 1 : 0,
                      }}
                    >
                      <FileText className="w-5 h-5 text-white" />
                    </div>

                    <div className="absolute -bottom-6 left-1/2 -translate-x-1/2">
                      <Wifi className="w-4 h-4 text-zinc-600" />
                    </div>
                  </div>

                  <div className="text-center z-10">
                    <div className="w-14 h-14 rounded-2xl bg-zinc-800 flex items-center justify-center mb-2 border border-white/10">
                      <User className="w-7 h-7 text-white/60" />
                    </div>
                    <span className="text-xs text-white/50">Получатель</span>
                  </div>
                </div>

                <div className="mt-8 flex justify-center">
                  <div className={`text-center transition-all duration-500 ${animationStep === 1 ? 'scale-110' : 'scale-100'}`}>
                    <div className="w-12 h-12 rounded-xl bg-ios-red/20 flex items-center justify-center mb-1 border border-ios-red/30">
                      <Eye className="w-6 h-6 text-ios-red" />
                    </div>
                    <span className="text-xs text-ios-red font-medium flex items-center gap-1 justify-center">
                      <AlertTriangle className="w-3 h-3" />
                      Перехват!
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-ios-red/10 rounded-xl border border-ios-red/20">
                <div className="w-10 h-10 rounded-xl bg-ios-red/20 flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-ios-red" />
                </div>
                <div>
                  <div className="text-ios-red font-semibold text-sm">Уязвимо для перехвата</div>
                  <div className="text-white/50 text-xs">Любой может прочитать данные</div>
                </div>
              </div>
            </div>
          </div>

          <div 
            className={`relative transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            style={{ transitionDelay: '400ms' }}
            onMouseEnter={() => setHoveredCard(1)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div className={`glass-card p-8 h-full transition-all duration-300 ${hoveredCard === 1 ? 'scale-[1.02] border-ios-green/30' : ''}`}>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-ios-green/30 to-emerald-600/30 flex items-center justify-center animate-pulse">
                  <Lock className="w-7 h-7 text-ios-green" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white">Зашифрованная передача</h3>
                  <p className="text-sm text-white/50">Данные защищены</p>
                </div>
              </div>

              <div className="bg-black/50 rounded-2xl p-6 mb-6 border border-white/5">
                <div className="flex items-center justify-between relative">
                  <div className="text-center z-10">
                    <div className="w-14 h-14 rounded-2xl bg-zinc-800 flex items-center justify-center mb-2 border border-white/10">
                      <User className="w-7 h-7 text-white/60" />
                    </div>
                    <span className="text-xs text-white/50">Отправитель</span>
                  </div>

                  <div className="flex-1 mx-4 relative">
                    <div className="h-1 bg-gradient-to-r from-ios-blue/30 via-ios-purple/30 to-ios-green/30 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-ios-blue to-ios-green rounded-full transition-all duration-1000"
                        style={{ 
                          width: animationStep < 3 ? '100%' : '0%',
                          opacity: animationStep < 3 ? 1 : 0.3
                        }}
                      />
                    </div>
                    
                    <div 
                      className="absolute top-1/2 -translate-y-1/2 w-10 h-10 rounded-lg bg-gradient-to-br from-ios-blue to-ios-purple flex items-center justify-center transition-all duration-1000 shadow-lg shadow-ios-blue/30"
                      style={{
                        left: animationStep === 0 ? '0%' : animationStep === 1 ? '50%' : animationStep === 2 ? '100%' : '0%',
                        transform: `translateY(-50%) translateX(${animationStep === 2 ? '-100%' : animationStep === 1 ? '-50%' : '0%'})`,
                        opacity: animationStep < 3 ? 1 : 0,
                      }}
                    >
                      <Lock className="w-5 h-5 text-white" />
                    </div>

                    <div className="absolute -bottom-6 left-1/2 -translate-x-1/2">
                      <Lock className="w-4 h-4 text-ios-blue" />
                    </div>
                  </div>

                  <div className="text-center z-10">
                    <div className="w-14 h-14 rounded-2xl bg-zinc-800 flex items-center justify-center mb-2 border border-white/10">
                      <User className="w-7 h-7 text-white/60" />
                    </div>
                    <span className="text-xs text-white/50">Получатель</span>
                  </div>
                </div>

                <div className="mt-8 flex justify-center">
                  <div className="text-center opacity-30">
                    <div className="w-12 h-12 rounded-xl bg-zinc-800 flex items-center justify-center mb-1">
                      <EyeOff className="w-6 h-6 text-white/40" />
                    </div>
                    <span className="text-xs text-white/40 flex items-center gap-1 justify-center">
                      <Shield className="w-3 h-3" />
                      Нет доступа
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-ios-green/10 rounded-xl border border-ios-green/20">
                <div className="w-10 h-10 rounded-xl bg-ios-green/20 flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-ios-green" />
                </div>
                <div>
                  <div className="text-ios-green font-semibold text-sm">Защищено от перехвата</div>
                  <div className="text-white/50 text-xs">Только получатель может прочитать</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div 
          className={`mt-16 max-w-4xl mx-auto transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          style={{ transitionDelay: '600ms' }}
        >
          <div className="glass rounded-3xl p-8">
            <h3 className="text-center text-lg font-semibold mb-8 flex items-center justify-center gap-2">
              <Zap className="w-5 h-5 text-ios-yellow" />
              Как работает шифрование
            </h3>
            
            <div className="flex flex-wrap items-center justify-center gap-3">
              {[
                { icon: FileText, label: 'Исходный текст', color: 'bg-zinc-800', desc: 'Обычный текст' },
                { icon: Key, label: 'Ключ', color: 'bg-ios-blue/20', desc: 'Секретный ключ' },
                { icon: Settings, label: 'Алгоритм', color: 'bg-ios-purple/20', desc: 'Шифрование' },
                { icon: Lock, label: 'Шифротекст', color: 'bg-ios-green/20', desc: 'Защищено' },
                { icon: FileText, label: 'Расшифровка', color: 'bg-zinc-800', desc: 'Исходный текст' },
              ].map((step, index) => {
                const Icon = step.icon;
                return (
                  <div key={index} className="flex items-center gap-3">
                    <div className={`${step.color} rounded-2xl px-5 py-4 text-center group hover:scale-105 transition-transform cursor-default min-w-[100px]`}>
                      <Icon className="w-6 h-6 mx-auto mb-2 text-white/70 group-hover:text-white group-hover:scale-110 transition-all" />
                      <div className="text-xs font-medium text-white/80">{step.label}</div>
                      <div className="text-[10px] text-white/40">{step.desc}</div>
                    </div>
                    {index < 4 && (
                      <ArrowRight className="w-5 h-5 text-white/20 hidden sm:block" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
