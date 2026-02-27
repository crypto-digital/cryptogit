import { useEffect, useRef, useState } from 'react';
import { Cpu, AlertTriangle, Users, Scale, Atom, Brain, Lock } from 'lucide-react';

const problems = [
  {
    icon: Cpu,
    title: 'Квантовые компьютеры',
    description: 'Квантовые компьютеры способны взламывать современные шифры за считанные часы. RSA и ECC под угрозой.',
    threat: 'Высокая',
    color: 'from-ios-red to-rose-600',
  },
  {
    icon: Users,
    title: 'Человеческий фактор',
    description: 'Слабые пароли, фишинг, социальная инженерия — самые распространённые уязвимости.',
    threat: 'Критическая',
    color: 'from-ios-orange to-amber-600',
  },
  {
    icon: Scale,
    title: 'Законодательные ограничения',
    description: 'Некоторые страны ограничивают или запрещают сильное шифрование для граждан.',
    threat: 'Средняя',
    color: 'from-ios-yellow to-orange-600',
  },
];

const futureTech = [
  {
    icon: Atom,
    title: 'Постквантовая криптография',
    description: 'Новые алгоритмы, устойчивые к атакам квантовых компьютеров.',
    status: 'В разработке',
    color: 'ios-blue',
  },
  {
    icon: Brain,
    title: 'Гомоморфное шифрование',
    description: 'Возможность вычислений над зашифрованными данными без расшифровки.',
    status: 'Исследования',
    color: 'ios-purple',
  },
  {
    icon: Lock,
    title: 'Квантовое распределение ключей',
    description: 'Абсолютно безопасный обмен ключами с помощью квантовой физики.',
    status: 'Внедрение',
    color: 'ios-green',
  },
];

export default function Problems() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

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

  return (
    <section
      id="problems"
      ref={sectionRef}
      className="section-padding bg-black relative overflow-hidden"
    >
      <div className="absolute inset-0">
        <div className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-ios-red/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/3 right-0 w-[500px] h-[500px] bg-ios-purple/5 rounded-full blur-[150px]" />
      </div>

      <div className="container-max relative z-10">
        <div className={`text-center mb-12 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-title font-bold mb-4">
            <span className="gradient-text">Проблемы</span>
            <br />
            <span className="text-white">и вызовы</span>
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            Современная криптография сталкивается с серьёзными угрозами
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-20">
          {problems.map((problem, index) => {
            const Icon = problem.icon;
            return (
              <div
                key={index}
                className={`glass-card p-6 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: `${200 + index * 100}ms` }}
              >
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${problem.color} flex items-center justify-center mb-4`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{problem.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed mb-4">{problem.description}</p>
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-ios-red" />
                  <span className="text-xs text-ios-red font-medium">Угроза: {problem.threat}</span>
                </div>
              </div>
            );
          })}
        </div>

        <div className={`text-center mb-12 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '500ms' }}>
          <h2 className="text-title font-bold mb-4">
            <span className="gradient-text">Будущее</span>
            <br />
            <span className="text-white">криптографии</span>
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            Новые технологии, которые изменят мир шифрования
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {futureTech.map((tech, index) => {
            const Icon = tech.icon;
            return (
              <div
                key={index}
                className={`glass-card p-6 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: `${600 + index * 100}ms` }}
              >
                <div className={`w-12 h-12 rounded-2xl bg-${tech.color}/20 flex items-center justify-center mb-4`}>
                  <Icon className={`w-6 h-6 text-${tech.color}`} />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{tech.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed mb-4">{tech.description}</p>
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-${tech.color}/20 text-${tech.color}`}>
                  {tech.status}
                </span>
              </div>
            );
          })}
        </div>

        <div 
          className={`max-w-3xl mx-auto mt-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          style={{ transitionDelay: '900ms' }}
        >
          <div className="glass rounded-2xl p-6 border border-ios-red/30">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-ios-red/20 flex items-center justify-center flex-shrink-0">
                <Atom className="w-6 h-6 text-ios-red" />
              </div>
              <div>
                <h4 className="font-semibold text-white mb-2">Квантовая угроза</h4>
                <p className="text-white/60 text-sm leading-relaxed mb-4">
                  Квантовые компьютеры с миллионами кубитов смогут взломать современные 
                  системы шифрования за считанные часы. Учёные уже работают над 
                  постквантовыми алгоритмами, которые будут устойчивы к таким атакам.
                </p>
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-ios-red" />
                    <span className="text-white/50">Текущий рекорд: 433 кубита (IBM)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full text-ios-yellow">⚠️</span>
                    <span className="text-white/50">Прогноз: 10+ лет до опасности</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
