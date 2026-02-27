import { useEffect, useRef, useState } from 'react';
import { BookOpen, ExternalLink, FileText, Globe } from 'lucide-react';

const sources = [
  {
    category: 'Статьи и образовательные ресурсы',
    items: [
      { title: 'История криптографии — Курс UGRA CTF', url: 'https://course.ugractf.ru/crypto/history.html', icon: FileText },
      { title: 'Криптография: история шифровального дела — Ростех', url: 'https://rostec.ru/media/news/kriptografiya-istoriya-shifrovalnogo-dela/', icon: Globe },
      { title: 'История криптографии — Medium', url: 'https://medium.com/@chernovgosha/краткая-история-криптографии-123b89d90169', icon: FileText },
      { title: 'Криптография: История науки — Cwarelabs', url: 'https://cwarelabs.com/ru/blog/kriptografiya-istoriya-nauki-podarivshej-nam-blokchejn/', icon: Globe },
    ],
  },
  {
    category: 'Техническая документация',
    items: [
      { title: 'Криптография для чайников — Habr', url: 'https://habr.com/ru/companies/ppr/articles/958376/', icon: FileText },
      { title: 'Алгоритмы шифрования — TechInsider', url: 'https://www.techinsider.ru/popmem/1679305-shifr-cezarya-i-aes-5-legendarnyh-sposobov-shifrovaniya/', icon: Globe },
      { title: 'Криптоанализ шифра Виженера — Habr', url: 'https://habr.com/ru/articles/876764/', icon: FileText },
      { title: 'AES и RSA — Hexlet Q&A', url: 'https://ru.hexlet.io/qna/help/questions/chto-takoe-shifrovanie-dannyh-kakie-vidy-suschestvuyut-simmetrichnoe-asimmetrichnoe-i-kak-rabotayut-algoritmy-rsa-i-aes', icon: Globe },
    ],
  },
  {
    category: 'Квантовая криптография',
    items: [
      { title: 'Угроза квантовых компьютеров — Habr', url: 'https://habr.com/ru/articles/788590/', icon: FileText },
      { title: 'Постквантовая криптография — CyberLeninka', url: 'https://cyberleninka.ru/article/n/problema-ustoychivosti-sovremennyh-kriptosistem-na-fone-poyavleniya-kvantovyh-kompyuterov', icon: Globe },
      { title: 'Кибербезопасность в эпоху квантовых компьютеров — Habr', url: 'https://habr.com/ru/articles/948046/', icon: FileText },
    ],
  },
];

export default function Sources() {
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
      ref={sectionRef}
      id="sources"
      className="section-padding bg-black relative overflow-hidden"
    >
      <div className="absolute inset-0">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-ios-blue/5 rounded-full blur-[150px]" />
      </div>

      <div className="container-max relative z-10">
        <div className={`text-center mb-12 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-title font-bold mb-4">
            <span className="gradient-text">📚 Источники</span>
            <br />
            <span className="text-white">информации</span>
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            Материалы, использованные при подготовке проекта
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {sources.map((category, catIndex) => (
            <div
              key={catIndex}
              className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: `${200 + catIndex * 100}ms` }}
            >
              <div className="glass-strong rounded-2xl p-6 h-full">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-ios-blue/20 flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-ios-blue" />
                  </div>
                  <h3 className="font-semibold text-white">{category.category}</h3>
                </div>

                <ul className="space-y-3">
                  {category.items.map((item, itemIndex) => {
                    const Icon = item.icon;
                    return (
                      <li key={itemIndex}>
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors group"
                        >
                          <Icon className="w-4 h-4 text-white/40 mt-0.5 flex-shrink-0 group-hover:text-ios-blue transition-colors" />
                          <span className="text-sm text-white/70 group-hover:text-white transition-colors flex-1">
                            {item.title}
                          </span>
                          <ExternalLink className="w-3 h-3 text-white/20 group-hover:text-white/50 transition-colors flex-shrink-0" />
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div 
          className={`max-w-2xl mx-auto mt-12 text-center transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          style={{ transitionDelay: '600ms' }}
        >
          <p className="text-white/40 text-sm">
            Все материалы использованы в образовательных целях.
            <br />
            Проект создан на основе открытых источников и научных публикаций.
          </p>
        </div>
      </div>
    </section>
  );
}
