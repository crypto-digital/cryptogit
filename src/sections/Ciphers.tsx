import { useEffect, useRef, useState } from 'react';
import { 
  Lock, 
  Key, 
  Cpu, 
  History, 
  ChevronRight, 
  Sparkles,
  Binary,
  Shield,
  Fingerprint,
  RefreshCw,
  Layers,
  FileKey
} from 'lucide-react';

type CipherMethod = 'caesar' | 'vigenere' | 'atbash' | 'aes' | 'rsa' | 'enigma' | 'xor' | 'blowfish' | 'twofish';

interface Cipher {
  id: CipherMethod;
  name: string;
  icon: React.ElementType;
  category: string;
  description: string;
  details: string;
  example: { plain: string; encrypted: string; key: string };
  color: string;
  year: string;
  difficulty: 'Легко' | 'Средне' | 'Сложно' | 'Очень сложно';
  features: string[];
}

const ciphers: Cipher[] = [
  {
    id: 'caesar',
    name: 'Шифр Цезаря',
    icon: History,
    category: 'Классический',
    description: 'Один из самых простых шифров. Каждая буква сдвигается на фиксированное число позиций.',
    details: 'Юлий Цезарь использовал сдвиг на 3 позиции. Этот шифр легко взломать методом перебора всех 25 вариантов.',
    example: { plain: 'HELLO', encrypted: 'KHOOR', key: 'Сдвиг: 3' },
    color: 'from-amber-500 to-orange-600',
    year: 'I в. до н.э.',
    difficulty: 'Легко',
    features: ['Простой', 'Исторический', 'Учебный'],
  },
  {
    id: 'vigenere',
    name: 'Шифр Виженера',
    icon: Layers,
    category: 'Классический',
    description: 'Многоалфавитный шифр с ключевым словом. Каждая буква шифруется по-своему.',
    details: 'Назван в честь Блеза Виженера, хотя изобретён раньше. Долгое время считался «невзламываемым».',
    example: { plain: 'ATTACK', encrypted: 'BFFBLP', key: 'Ключ: LEMON' },
    color: 'from-purple-500 to-violet-600',
    year: 'XVI в.',
    difficulty: 'Средне',
    features: ['Многоалфавитный', 'С ключом', 'Исторический'],
  },
  {
    id: 'atbash',
    name: 'Шифр Атбаш',
    icon: RefreshCw,
    category: 'Классический',
    description: 'Древнееврейский шифр. Первая буква заменяется на последнюю, вторая на предпоследнюю.',
    details: 'Использовался в библейских текстах. A ↔ Z, B ↔ Y, C ↔ X. Простой, но эффективный для своего времени.',
    example: { plain: 'ABC', encrypted: 'ZYX', key: 'Зеркало' },
    color: 'from-emerald-500 to-teal-600',
    year: '600 до н.э.',
    difficulty: 'Легко',
    features: ['Зеркальный', 'Без ключа', 'Древний'],
  },
  {
    id: 'xor',
    name: 'XOR-шифр',
    icon: Binary,
    category: 'Классический',
    description: 'Побитовое исключающее ИЛИ с ключом. Базовая операция многих современных шифров.',
    details: 'XOR — основа многих современных алгоритмов. Если применить XOR дважды с тем же ключом, получим исходный текст.',
    example: { plain: '1010', encrypted: '0101', key: 'Ключ: 1111' },
    color: 'from-cyan-500 to-blue-600',
    year: 'XX в.',
    difficulty: 'Средне',
    features: ['Побитовый', 'Быстрый', 'Базовый'],
  },
  {
    id: 'aes',
    name: 'AES',
    icon: Shield,
    category: 'Современный',
    description: 'Advanced Encryption Standard — мировой стандарт симметричного шифрования.',
    details: 'Заменил устаревший DES в 2001 году. Использует ключи 128/192/256 бит. Применяется в Wi-Fi, банках, госструктурах.',
    example: { plain: 'Секрет', encrypted: '9a3f...b2c1', key: '256 бит' },
    color: 'from-blue-500 to-indigo-600',
    year: '2001',
    difficulty: 'Очень сложно',
    features: ['Стандарт', 'Быстрый', 'Безопасный'],
  },
  {
    id: 'rsa',
    name: 'RSA',
    icon: Key,
    category: 'Современный',
    description: 'Асимметричное шифрование с открытым ключом. Основа интернет-безопасности.',
    details: 'Использует пару ключей: открытый для шифрования, закрытый для дешифрования. Базируется на сложности факторизации больших чисел.',
    example: { plain: 'Сообщение', encrypted: '0x8f...2a4e', key: '2048 бит' },
    color: 'from-indigo-500 to-purple-600',
    year: '1977',
    difficulty: 'Сложно',
    features: ['Асимметричный', 'Открытый ключ', 'SSL/TLS'],
  },
  {
    id: 'blowfish',
    name: 'Blowfish',
    icon: Fingerprint,
    category: 'Современный',
    description: 'Симметричный блочный шифр с переменной длиной ключа.',
    details: 'Разработан Брюсом Шнайером в 1993 году. Быстрый и компактный, но уступает AES в безопасности.',
    example: { plain: 'Данные', encrypted: 'a7b9...c3d1', key: '448 бит' },
    color: 'from-pink-500 to-rose-600',
    year: '1993',
    difficulty: 'Сложно',
    features: ['Блочный', 'Компактный', 'Быстрый'],
  },
  {
    id: 'twofish',
    name: 'Twofish',
    icon: FileKey,
    category: 'Современный',
    description: 'Преемник Blowfish, финалист конкурса AES.',
    details: 'Разработан той же командой. Использует 128-битные блоки и ключи до 256 бит. Быстрее Blowfish.',
    example: { plain: 'Текст', encrypted: 'f2e8...a1b4', key: '256 бит' },
    color: 'from-rose-500 to-red-600',
    year: '1998',
    difficulty: 'Сложно',
    features: ['AES-финалист', 'Быстрый', 'Надёжный'],
  },
  {
    id: 'enigma',
    name: '«Энигма»',
    icon: Cpu,
    category: 'Исторический',
    description: 'Электромеханическая шифровальная машина нацистской Германии.',
    details: 'Использовала вращающиеся роторы для создания сложных шифров. Взломана Аланом Тьюрингом в Блетчли-парке.',
    example: { plain: 'HELLO', encrypted: 'XWYFZ', key: '3 ротора' },
    color: 'from-slate-500 to-zinc-600',
    year: 'XX в.',
    difficulty: 'Сложно',
    features: ['Электромеханическая', 'Историческая', 'Роторная'],
  },
];

const difficultyColors: Record<string, string> = {
  'Легко': 'text-ios-green',
  'Средне': 'text-ios-yellow',
  'Сложно': 'text-ios-orange',
  'Очень сложно': 'text-ios-red',
};

export default function Ciphers() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedCipher, setSelectedCipher] = useState<Cipher | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

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

  const filteredCiphers = selectedCategory === 'all' 
    ? ciphers 
    : ciphers.filter(c => c.category === selectedCategory);

  const categories = ['all', ...Array.from(new Set(ciphers.map(c => c.category)))];

  return (
    <section
      id="ciphers"
      ref={sectionRef}
      className="section-padding bg-gradient-to-b from-black via-zinc-950 to-black relative overflow-hidden"
    >
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-ios-blue/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-ios-purple/5 rounded-full blur-[150px]" />
      </div>

      <div className="container-max relative z-10">
        <div className={`text-center mb-12 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full mb-6">
            <Lock className="w-4 h-4 text-ios-blue" />
            <span className="text-sm text-white/70">Шифры и алгоритмы</span>
          </div>
          
          <h2 className="text-title font-bold mb-4">
            <span className="gradient-text">Популярные</span>
            <br />
            <span className="text-white">Шифры и Методы</span>
          </h2>
          <p className="text-white/60 max-w-xl mx-auto">
            От древних шифров замены до современных криптографических алгоритмов
          </p>
        </div>

        <div className={`flex flex-wrap justify-center gap-2 mb-12 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '200ms' }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                selectedCategory === cat
                  ? 'bg-gradient-to-r from-ios-blue to-ios-purple text-white shadow-glow'
                  : 'glass text-white/70 hover:bg-white/10 hover:text-white'
              }`}
            >
              {cat === 'all' ? 'Все шифры' : cat}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCiphers.map((cipher, index) => {
            const Icon = cipher.icon;

            return (
              <div
                key={cipher.id}
                className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: `${300 + index * 100}ms` }}
              >
                <div 
                  className="glass-card h-full cursor-pointer group"
                  onClick={() => setSelectedCipher(cipher)}
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${cipher.color} flex items-center justify-center transition-transform duration-300 group-hover:scale-110`}>
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-mono text-white/40 block">{cipher.year}</span>
                        <span className={`text-xs ${difficultyColors[cipher.difficulty]}`}>{cipher.difficulty}</span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <span className="text-xs text-ios-blue font-medium uppercase tracking-wider">{cipher.category}</span>
                      <h3 className="text-xl font-semibold text-white mt-1 group-hover:text-ios-blue transition-colors">{cipher.name}</h3>
                    </div>

                    <p className="text-white/60 text-sm leading-relaxed mb-4">{cipher.description}</p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {cipher.features.map((feature, i) => (
                        <span key={i} className="px-2 py-1 bg-white/5 rounded-lg text-[10px] text-white/50">
                          {feature}
                        </span>
                      ))}
                    </div>

                    <div className="bg-black/40 rounded-xl p-3 mb-4">
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span className="text-white/40">{cipher.example.plain}</span>
                        <ChevronRight className="w-3 h-3 text-white/20" />
                        <span className="text-ios-green">{cipher.example.encrypted}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-white/40 group-hover:text-ios-blue transition-colors">
                      <Sparkles className="w-4 h-4" />
                      <span>Нажмите для подробностей</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {selectedCipher && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in"
            onClick={() => setSelectedCipher(null)}
          >
            <div className="absolute inset-0 bg-black/80 backdrop-blur-xl" />
            <div 
              className="relative glass-strong rounded-3xl p-8 max-w-lg w-full max-h-[90vh] overflow-y-auto animate-scale-in"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setSelectedCipher(null)}
                className="absolute top-4 right-4 w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
              >
                <span className="text-white/60">✕</span>
              </button>

              <div className="flex items-center gap-4 mb-6">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${selectedCipher.color} flex items-center justify-center`}>
                  <selectedCipher.icon className="w-8 h-8 text-white" />
                </div>
                <div>
                  <span className="text-xs text-ios-blue font-medium uppercase tracking-wider">{selectedCipher.category}</span>
                  <h3 className="text-2xl font-bold text-white">{selectedCipher.name}</h3>
                  <span className="text-xs text-white/40 font-mono">{selectedCipher.year}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {selectedCipher.features.map((feature, i) => (
                  <span key={i} className="px-3 py-1 bg-white/10 rounded-full text-xs text-white/70">
                    {feature}
                  </span>
                ))}
              </div>

              <div className="mb-6">
                <h4 className="text-sm font-semibold text-white/70 mb-2">Описание</h4>
                <p className="text-white/60 text-sm leading-relaxed">{selectedCipher.details}</p>
              </div>

              <div className="bg-black/50 rounded-2xl p-5 mb-6">
                <h4 className="text-sm font-semibold text-white/70 mb-3">Пример шифрования</h4>
                <div className="space-y-3 font-mono text-sm">
                  <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl">
                    <span className="text-white/40">Исходный:</span>
                    <span className="text-white">{selectedCipher.example.plain}</span>
                  </div>
                  <div className="flex items-center justify-center">
                    <ChevronRight className="w-5 h-5 text-ios-blue rotate-90" />
                  </div>
                  <div className="flex items-center justify-between p-3 bg-ios-green/10 rounded-xl border border-ios-green/20">
                    <span className="text-white/40">Зашифровано:</span>
                    <span className="text-ios-green">{selectedCipher.example.encrypted}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-ios-blue/10 rounded-xl">
                    <span className="text-white/40">Ключ:</span>
                    <span className="text-ios-blue">{selectedCipher.example.key}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-sm text-white/50">Сложность:</span>
                <span className={`px-3 py-1 rounded-full text-xs font-medium bg-white/10 ${difficultyColors[selectedCipher.difficulty]}`}>
                  {selectedCipher.difficulty}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
