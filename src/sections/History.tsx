import { useEffect, useRef, useState } from 'react';
import { 
  Scroll, 
  ScrollText, 
  Brain, 
  Cpu, 
  Lock, 
  Atom, 
  ChevronRight, 
  Sparkles,
  History as HistoryIcon,
  Landmark,
  Key,
  Binary,
  Zap
} from 'lucide-react';

const historyEvents = [
  {
    year: '4000 до н.э.',
    title: 'Древний Египет',
    description: 'Первые шифры в иероглифах. Необычные символы использовались для сокрытия смысла текста.',
    icon: Landmark,
    color: 'from-amber-500 to-orange-600',
    detail: 'Египтяне использовали специальные иероглифы, которые заменяли обычные символы.',
  },
  {
    year: 'V в. до н.э.',
    title: 'Древняя Спарта',
    description: 'Изобретение скиталы — первого криптографического устройства. Стержень с намотанной лентой.',
    icon: Scroll,
    color: 'from-red-500 to-rose-600',
    detail: 'Скитала представляла собой стержень, на который наматывалась лента. Текст писался вдоль стержня.',
  },
  {
    year: 'I в. до н.э.',
    title: 'Римская империя',
    description: 'Шифр Цезаря — простой сдвиг букв алфавита. Использовался для военной переписки.',
    icon: ScrollText,
    color: 'from-purple-500 to-violet-600',
    detail: 'Юлий Цезарь использовал сдвиг на 3 позиции: A → D, B → E, C → F.',
  },
  {
    year: 'IX в.',
    title: 'Арабский мир',
    description: 'Аль-Кинди разработал метод частотного анализа — начало криптоанализа.',
    icon: Brain,
    color: 'from-emerald-500 to-teal-600',
    detail: 'Частотный анализ позволяет взламывать шифры, подсчитывая частоту букв.',
  },
  {
    year: 'XV в.',
    title: 'Европа',
    description: 'Леон Альберти создал полиалфавитный шифр и шифровальный диск.',
    icon: Cpu,
    color: 'from-blue-500 to-cyan-600',
    detail: 'Шифровальный диск Альберти использовал два вращающихся диска с алфавитами.',
  },
  {
    year: 'XX в.',
    title: 'Вторая мировая война',
    description: 'Машина «Энигма» и её взлом Аланом Тьюрингом. Рождение компьютеров.',
    icon: Lock,
    color: 'from-slate-500 to-zinc-600',
    detail: 'Взлом Энигмы в Блетчли-парке сократил войну на 2-4 года и привёл к созданию компьютеров.',
  },
  {
    year: '1977',
    title: 'Алгоритм RSA',
    description: 'Ривест, Шамир и Адлеман создали первый асимметричный алгоритм шифрования.',
    icon: Key,
    color: 'from-indigo-500 to-blue-600',
    detail: 'RSA использует два ключа: открытый для шифрования и закрытый для дешифрования.',
  },
  {
    year: '2001',
    title: 'Стандарт AES',
    description: 'Advanced Encryption Standard стал мировым стандартом симметричного шифрования.',
    icon: Binary,
    color: 'from-green-500 to-emerald-600',
    detail: 'AES заменил устаревший DES и используется повсеместно: от Wi-Fi до банковских систем.',
  },
  {
    year: '2026',
    title: 'Квантовая криптография',
    description: 'Развитие квантовых технологий и постквантовой криптографии.',
    icon: Atom,
    color: 'from-ios-blue to-ios-purple',
    detail: 'Квантовые компьютеры угрожают современной криптографии, но и создают новые возможности.',
  },
];

export default function History() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [progressLine, setProgressLine] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isVisible) {
      const interval = setInterval(() => {
        setProgressLine(prev => Math.min(prev + 1, 100));
      }, 30);
      return () => clearInterval(interval);
    }
  }, [isVisible]);

  return (
    <section
      id="history"
      ref={sectionRef}
      className="section-padding bg-black relative overflow-hidden"
    >
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-ios-blue/5 rounded-full blur-[150px] -translate-y-1/2" />
        <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-ios-purple/5 rounded-full blur-[150px] -translate-y-1/2" />
      </div>

      <div className="container-max relative z-10">
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full mb-6">
            <HistoryIcon className="w-4 h-4 text-ios-purple" />
            <span className="text-sm text-white/70">Путешествие во времени</span>
          </div>
          
          <h2 className="text-title font-bold mb-4">
            <span className="gradient-text">История</span>
            <br />
            <span className="text-white">Криптографии</span>
          </h2>
          <p className="text-white/60 max-w-xl mx-auto">
            От древних египетских иероглифов до квантовых технологий 2026 года
          </p>
        </div>

        <div className="max-w-4xl mx-auto relative">
          <div className="absolute left-4 lg:left-1/2 top-0 bottom-0 w-1 bg-white/5 rounded-full lg:-translate-x-1/2">
            <div 
              className="absolute top-0 left-0 right-0 bg-gradient-to-b from-ios-blue via-ios-purple to-ios-pink rounded-full transition-all duration-100"
              style={{ height: `${progressLine}%` }}
            />
          </div>

          <div className="space-y-8">
            {historyEvents.map((event, index) => {
              const isEven = index % 2 === 0;
              const Icon = event.icon;
              const isActive = activeIndex === index;
              
              return (
                <div
                  key={index}
                  className={`relative flex items-start gap-6 lg:gap-8 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div 
                    className={`absolute left-4 lg:left-1/2 w-5 h-5 rounded-full border-2 border-black lg:-translate-x-1/2 z-10 mt-6 transition-all duration-300 ${
                      isActive ? 'scale-125' : ''
                    }`}
                    style={{
                      background: isActive 
                        ? 'linear-gradient(135deg, #007AFF, #BF5AF2)' 
                        : '#1a1a1a',
                      boxShadow: isActive ? '0 0 20px rgba(0, 122, 255, 0.5)' : 'none'
                    }}
                  />

                  <div 
                    className={`ml-12 lg:ml-0 lg:w-1/2 ${isEven ? 'lg:pr-12 lg:text-right' : 'lg:ml-auto lg:pl-12'}`}
                    onMouseEnter={() => setActiveIndex(index)}
                    onMouseLeave={() => setActiveIndex(null)}
                  >
                    <div 
                      className={`glass-card p-6 cursor-pointer transition-all duration-300 ${
                        isActive ? 'scale-[1.02] shadow-glow-lg' : ''
                      }`}
                    >
                      <div className={`flex items-start gap-4 mb-3 ${isEven ? 'lg:flex-row-reverse' : ''}`}>
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${event.color} flex items-center justify-center flex-shrink-0 transition-transform duration-300 ${isActive ? 'scale-110' : ''}`}>
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                            <span className="px-2 py-0.5 bg-white/10 rounded text-xs font-mono text-ios-blue">{event.year}</span>
                          </div>
                          <h3 className="text-lg font-semibold text-white">{event.title}</h3>
                        </div>
                      </div>
                      
                      <p className="text-white/60 text-sm leading-relaxed mb-3">{event.description}</p>
                      
                      <div className={`overflow-hidden transition-all duration-300 ${isActive ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0'}`}>
                        <div className="pt-3 border-t border-white/10">
                          <p className="text-white/50 text-xs flex items-start gap-2">
                            <Sparkles className="w-3 h-3 text-ios-yellow mt-0.5 flex-shrink-0" />
                            {event.detail}
                          </p>
                        </div>
                      </div>

                      {!isActive && (
                        <div className="mt-2 flex items-center gap-1 text-xs text-white/30">
                          <ChevronRight className="w-3 h-3" />
                          <span>Наведите для подробностей</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div 
          className={`max-w-2xl mx-auto mt-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          style={{ transitionDelay: '1000ms' }}
        >
          <div className="glass rounded-2xl p-6 flex items-start gap-4 hover:bg-white/10 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-ios-yellow/20 flex items-center justify-center flex-shrink-0 animate-pulse">
              <Zap className="w-6 h-6 text-ios-yellow" />
            </div>
            <div>
              <h4 className="font-semibold text-white mb-2">Интересный факт</h4>
              <p className="text-white/60 text-sm leading-relaxed">
                Слово «криптография» происходит от греческих слов «криптос» (скрытый) и «графо» (пишу). 
                Буквально — «тайнопись». Наука о защите информации насчитывает более 6000 лет истории!
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
