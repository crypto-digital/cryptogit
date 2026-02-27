import { useEffect, useRef, useState } from 'react';
import { 
  Shield, 
  CheckCircle, 
  User, 
  FileCheck, 
  Lock, 
  Unlock,
  EyeOff,
  Quote
} from 'lucide-react';

const principles = [
  {
    icon: Shield,
    title: 'Конфиденциальность',
    description: 'Защита информации от несанкционированного доступа. Только авторизованные лица могут прочитать данные.',
    color: 'from-ios-blue to-ios-purple',
  },
  {
    icon: CheckCircle,
    title: 'Целостность',
    description: 'Гарантия того, что данные не были изменены или повреждены в процессе передачи или хранения.',
    color: 'from-ios-green to-ios-teal',
  },
  {
    icon: User,
    title: 'Аутентификация',
    description: 'Подтверждение подлинности отправителя и получателя информации.',
    color: 'from-ios-orange to-ios-yellow',
  },
  {
    icon: FileCheck,
    title: 'Неотказуемость',
    description: 'Отправитель не может отрицать факт отправки сообщения, а получатель — факт получения.',
    color: 'from-ios-pink to-ios-red',
  },
];

const concepts = [
  {
    icon: Lock,
    title: 'Шифрование',
    description: 'Процесс преобразования открытого текста в зашифрованный с помощью ключа',
    color: 'text-ios-blue',
  },
  {
    icon: Unlock,
    title: 'Дешифрование',
    description: 'Обратный процесс — преобразование зашифрованного текста обратно в открытый',
    color: 'text-ios-green',
  },
  {
    icon: EyeOff,
    title: 'Криптоанализ',
    description: 'Наука о взломе шифров без знания ключа',
    color: 'text-ios-purple',
  },
];

export default function WhatIsCrypto() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

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

  return (
    <section
      id="what-is"
      ref={sectionRef}
      className="section-padding bg-gradient-to-b from-black via-zinc-950 to-black relative overflow-hidden"
    >
      <div className="absolute inset-0">
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-ios-purple/5 rounded-full blur-[150px]" />
      </div>

      <div className="container-max relative z-10">
        <div 
          className={`max-w-4xl mx-auto mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <div className="glass-strong rounded-3xl p-8 md:p-12 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full mb-6">
              <Shield className="w-4 h-4 text-ios-blue" />
              <span className="text-sm text-white/70">Определение</span>
            </div>

            <h2 className="text-title font-bold mb-6">
              <span className="gradient-text">Что такое</span>
              <br />
              <span className="text-white">Криптография?</span>
            </h2>
            
            <div className="text-lg md:text-xl text-white/80 leading-relaxed mb-8">
              <span className="text-ios-blue font-semibold">Криптография</span> (от греч.{' '}
              <span className="italic text-white/60">κρυπτός</span> — скрытый и{' '}
              <span className="italic text-white/60">γράφω</span> — пишу) — это{' '}
              <span className="text-white font-medium">наука о методах обеспечения конфиденциальности, 
              целостности данных и аутентификации</span>.
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              {concepts.map((concept, index) => {
                const Icon = concept.icon;
                return (
                  <div key={index} className="flex items-center gap-2 px-4 py-2 glass rounded-full">
                    <Icon className={`w-4 h-4 ${concept.color}`} />
                    <span className="text-sm text-white/70">{concept.title}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="max-w-5xl mx-auto mb-16">
          <h3 
            className={`text-center text-2xl font-semibold mb-10 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            style={{ transitionDelay: '200ms' }}
          >
            Основные <span className="gradient-text">принципы</span> криптографии
          </h3>

          <div className="grid sm:grid-cols-2 gap-6">
            {principles.map((principle, index) => {
              const Icon = principle.icon;
              return (
                <div
                  key={index}
                  className={`glass-card p-6 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                  style={{ transitionDelay: `${300 + index * 100}ms` }}
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${principle.color} flex items-center justify-center flex-shrink-0`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-2">
                        {principle.title}
                      </h4>
                      <p className="text-white/60 text-sm leading-relaxed">
                        {principle.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div 
          className={`max-w-3xl mx-auto text-center transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          style={{ transitionDelay: '700ms' }}
        >
          <div className="glass rounded-2xl p-8">
            <Quote className="w-10 h-10 text-ios-blue/30 mx-auto mb-4" />
            <blockquote className="text-xl md:text-2xl text-white/80 italic leading-relaxed mb-4">
              Криптография — это наука о защите информации. 
              В мире, где данные стали новой нефтью, она играет ключевую роль в обеспечении безопасности.
            </blockquote>
            <cite className="text-white/50 text-sm">— Современная кибербезопасность</cite>
          </div>
        </div>
      </div>
    </section>
  );
}
