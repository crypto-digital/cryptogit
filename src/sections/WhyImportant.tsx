import { useEffect, useRef, useState } from 'react';
import { Shield, Globe, Bitcoin, Building2, Lock, CreditCard, MessageSquare, User } from 'lucide-react';

const importanceAreas = [
  {
    icon: Lock,
    title: 'Защита личных данных',
    description: 'Ваши пароли, банковские данные, личная переписка и фотографии надежно защищены благодаря шифрованию.',
    examples: ['Пароли', 'Банковские карты', 'Сообщения', 'Фото'],
    color: 'from-ios-blue to-ios-purple',
  },
  {
    icon: Globe,
    title: 'Безопасный интернет',
    description: 'HTTPS, VPN и другие протоколы обеспечивают безопасность вашего соединения в сети.',
    examples: ['HTTPS', 'VPN', 'SSL/TLS', 'Wi-Fi WPA3'],
    color: 'from-ios-green to-ios-teal',
  },
  {
    icon: Bitcoin,
    title: 'Криптовалюты',
    description: 'Блокчейн и криптовалюты невозможны без криптографии. Это основа цифровых денег.',
    examples: ['Биткоин', 'Эфириум', 'Блокчейн', 'NFT'],
    color: 'from-ios-orange to-ios-yellow',
  },
  {
    icon: Building2,
    title: 'Государственная тайна',
    description: 'Дипломатическая переписка, военные секреты и государственные данные защищены шифрованием.',
    examples: ['Дипломатия', 'Военные', 'Разведка', 'Документы'],
    color: 'from-ios-pink to-ios-red',
  },
];

const dailyUsage = [
  { icon: CreditCard, text: 'Оплата картой', desc: 'PIN-код и чип шифруют транзакции' },
  { icon: MessageSquare, text: 'Мессенджеры', desc: 'End-to-end шифрование сообщений' },
  { icon: User, text: 'Социальные сети', desc: 'Защита личной информации' },
  { icon: Lock, text: 'Электронная почта', desc: 'Шифрование писем и вложений' },
];

export default function WhyImportant() {
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
      id="about"
      ref={sectionRef}
      className="section-padding bg-gradient-to-b from-black via-zinc-950 to-black relative overflow-hidden"
    >
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-ios-green/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-ios-blue/5 rounded-full blur-[150px]" />
      </div>

      <div className="container-max relative z-10">
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-title font-bold mb-4">
            <span className="gradient-text">Почему криптография</span>
            <br />
            <span className="text-white">так важна?</span>
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            Криптография окружает нас повсюду и защищает в каждой сфере жизни
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto mb-16">
          {importanceAreas.map((area, index) => {
            const Icon = area.icon;
            return (
              <div
                key={index}
                className={`glass-card p-6 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: `${200 + index * 100}ms` }}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${area.color} flex items-center justify-center flex-shrink-0`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-white mb-2">{area.title}</h3>
                    <p className="text-white/60 text-sm leading-relaxed mb-4">{area.description}</p>
                    
                    <div className="flex flex-wrap gap-2">
                      {area.examples.map((example, i) => (
                        <span 
                          key={i}
                          className="px-3 py-1 glass rounded-full text-xs text-white/70"
                        >
                          {example}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div 
          className={`max-w-4xl mx-auto transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          style={{ transitionDelay: '600ms' }}
        >
          <div className="glass-strong rounded-3xl p-8">
            <h3 className="text-center text-xl font-semibold mb-8">
              <span className="gradient-text">Где вы встречаете</span>{' '}
              <span className="text-white">криптографию каждый день?</span>
            </h3>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {dailyUsage.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div 
                    key={index}
                    className="glass rounded-2xl p-4 text-center hover:bg-white/10 transition-colors"
                  >
                    <div className="w-12 h-12 rounded-xl bg-ios-blue/20 flex items-center justify-center mx-auto mb-3">
                      <Icon className="w-6 h-6 text-ios-blue" />
                    </div>
                    <h4 className="font-medium text-white mb-1">{item.text}</h4>
                    <p className="text-xs text-white/50">{item.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div 
          className={`max-w-3xl mx-auto mt-16 text-center transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          style={{ transitionDelay: '800ms' }}
        >
          <div className="glass rounded-2xl p-8">
            <Shield className="w-12 h-12 text-ios-blue mx-auto mb-4" />
            <blockquote className="text-xl text-white/80 italic leading-relaxed mb-4">
              "Без криптографии интернет, каким мы его знаем, просто не существовал бы. 
              Каждый раз, когда вы вводите пароль или совершаете покупку онлайн, 
              криптография защищает вас."
            </blockquote>
            <cite className="text-white/50 text-sm">— Современная кибербезопасность</cite>
          </div>
        </div>
      </div>
    </section>
  );
}
