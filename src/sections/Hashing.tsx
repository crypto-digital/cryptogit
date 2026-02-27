import { useEffect, useRef, useState } from 'react';
import { 
  Hash, 
  Lock, 
  Unlock, 
  ArrowRightLeft, 
  FileCheck, 
  Shield,
  Fingerprint,
  AlertCircle,
  CheckCircle2,
  Copy,
  Check,
  Key
} from 'lucide-react';
import { sha256, md5 } from '../utils/hashing';

const differences = [
  {
    aspect: 'Обратимость',
    encryption: { text: 'Обратимый процесс', icon: Unlock, color: 'text-ios-green' },
    hashing: { text: 'Необратимый процесс', icon: Lock, color: 'text-ios-red' },
    description: 'Шифрование можно отменить с ключом, хеш — нет',
  },
  {
    aspect: 'Ключ',
    encryption: { text: 'Требуется ключ', icon: Key, color: 'text-ios-blue' },
    hashing: { text: 'Ключ не нужен', icon: Shield, color: 'text-ios-purple' },
    description: 'Для шифрования нужен секретный ключ, для хеширования — нет',
  },
  {
    aspect: 'Результат',
    encryption: { text: 'Переменной длины', icon: ArrowRightLeft, color: 'text-ios-yellow' },
    hashing: { text: 'Фиксированная длина', icon: Fingerprint, color: 'text-ios-pink' },
    description: 'Шифрованный текст зависит от входных данных, хеш — всегда одной длины',
  },
  {
    aspect: 'Назначение',
    encryption: { text: 'Конфиденциальность', icon: Shield, color: 'text-ios-teal' },
    hashing: { text: 'Целостность данных', icon: FileCheck, color: 'text-ios-orange' },
    description: 'Шифрование скрывает данные, хеш проверяет их неизменность',
  },
];

const hashAlgorithms = [
  { name: 'MD5', description: '128-битный хеш, устаревший', secure: false },
  { name: 'SHA-1', description: '160-битный хеш, не рекомендуется', secure: false },
  { name: 'SHA-256', description: '256-битный хеш, стандарт безопасности', secure: true },
  { name: 'SHA-3', description: 'Новейший стандарт хеширования', secure: true },
  { name: 'bcrypt', description: 'Для хеширования паролей', secure: true },
  { name: 'Argon2', description: 'Победитель конкурса хеширования паролей', secure: true },
];

const useCases = [
  { icon: Lock, title: 'Хранение паролей', description: 'Пароли никогда не хранятся в открытом виде' },
  { icon: FileCheck, title: 'Проверка целостности', description: 'Проверка, что файл не был изменён' },
  { icon: Fingerprint, title: 'Цифровые подписи', description: 'Подтверждение авторства документа' },
  { icon: Shield, title: 'Блокчейн', description: 'Связь блоков в цепочке' },
];

export default function Hashing() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [input, setInput] = useState('');
  const [sha256Result, setSha256Result] = useState('');
  const [md5Result, setMd5Result] = useState('');
  const [copied, setCopied] = useState<string | null>(null);

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
    if (input) {
      setSha256Result(sha256(input));
      setMd5Result(md5(input));
    } else {
      setSha256Result('');
      setMd5Result('');
    }
  }, [input]);

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <section
      id="hashing"
      ref={sectionRef}
      className="section-padding bg-gradient-to-b from-black via-zinc-950 to-black relative overflow-hidden"
    >
      <div className="absolute inset-0">
        <div className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-ios-orange/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/3 right-0 w-[500px] h-[500px] bg-ios-pink/5 rounded-full blur-[150px]" />
      </div>

      <div className="container-max relative z-10">
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full mb-6">
            <Hash className="w-4 h-4 text-ios-orange" />
            <span className="text-sm text-white/70">Важное отличие</span>
          </div>
          
          <h2 className="text-title font-bold mb-4">
            <span className="gradient-text">Хеширование</span>
            <br />
            <span className="text-white">vs Шифрование</span>
          </h2>
          <p className="text-white/60 max-w-xl mx-auto">
            Хотя оба метода преобразуют данные, они имеют принципиальные отличия
          </p>
        </div>

        <div 
          className={`max-w-4xl mx-auto mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          style={{ transitionDelay: '200ms' }}
        >
          <div className="glass-strong rounded-3xl p-6 md:p-8">
            <h3 className="text-lg font-semibold text-white mb-6 text-center flex items-center justify-center gap-2">
              <ArrowRightLeft className="w-5 h-5 text-ios-blue" />
              Ключевые отличия
            </h3>
            
            <div className="space-y-4">
              {differences.map((diff, index) => (
                <div 
                  key={index}
                  className="grid md:grid-cols-3 gap-4 p-4 bg-white/5 rounded-2xl hover:bg-white/10 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium text-white/70">{diff.aspect}</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <diff.encryption.icon className={`w-4 h-4 ${diff.encryption.color}`} />
                    <span className="text-sm text-white/80">{diff.encryption.text}</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <diff.hashing.icon className={`w-4 h-4 ${diff.hashing.color}`} />
                    <span className="text-sm text-white/80">{diff.hashing.text}</span>
                  </div>
                  
                  <div className="md:col-span-3 text-xs text-white/40 mt-1">
                    {diff.description}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div 
          className={`max-w-3xl mx-auto mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          style={{ transitionDelay: '400ms' }}
        >
          <div className="glass-strong rounded-3xl p-6 md:p-8">
            <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
              <Fingerprint className="w-5 h-5 text-ios-pink" />
              Попробуйте хеширование
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-white/50 mb-2">Введите текст</label>
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Например: password123"
                  className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-ios-orange/50 transition-colors"
                />
              </div>

              {input && (
                <div className="space-y-3 animate-fade-in">
                  <div className="p-4 bg-black/40 rounded-xl">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-white/50">SHA-256</span>
                      <button
                        onClick={() => copyToClipboard(sha256Result, 'sha256')}
                        className="text-white/40 hover:text-white transition-colors"
                      >
                        {copied === 'sha256' ? <Check className="w-4 h-4 text-ios-green" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>
                    <code className="text-xs font-mono text-ios-orange break-all">{sha256Result}</code>
                  </div>

                  <div className="p-4 bg-black/40 rounded-xl">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-white/50">MD5 (устаревший)</span>
                      <button
                        onClick={() => copyToClipboard(md5Result, 'md5')}
                        className="text-white/40 hover:text-white transition-colors"
                      >
                        {copied === 'md5' ? <Check className="w-4 h-4 text-ios-green" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>
                    <code className="text-xs font-mono text-white/60 break-all">{md5Result}</code>
                  </div>
                </div>
              )}

              <div className="flex items-start gap-2 p-3 bg-ios-yellow/10 rounded-xl">
                <AlertCircle className="w-4 h-4 text-ios-yellow flex-shrink-0 mt-0.5" />
                <p className="text-xs text-white/60">
                  Даже малейшее изменение входных данных полностью изменяет хеш — это называется 
                  <span className="text-ios-yellow"> «лавинный эффект»</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div 
          className={`max-w-4xl mx-auto mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          style={{ transitionDelay: '600ms' }}
        >
          <h3 className="text-lg font-semibold text-white mb-6 text-center">Популярные алгоритмы хеширования</h3>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {hashAlgorithms.map((algo, index) => (
              <div 
                key={index}
                className={`glass-card p-4 ${algo.secure ? 'border-ios-green/20' : 'border-ios-red/20'}`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-white">{algo.name}</span>
                  {algo.secure ? (
                    <CheckCircle2 className="w-4 h-4 text-ios-green" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-ios-red" />
                  )}
                </div>
                <p className="text-xs text-white/50">{algo.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div 
          className={`max-w-4xl mx-auto transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          style={{ transitionDelay: '800ms' }}
        >
          <h3 className="text-lg font-semibold text-white mb-6 text-center">Где используется хеширование</h3>
          
          <div className="grid sm:grid-cols-2 gap-4">
            {useCases.map((useCase, index) => {
              const Icon = useCase.icon;
              return (
                <div key={index} className="glass-card p-5 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-ios-orange/20 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-ios-orange" />
                  </div>
                  <div>
                    <h4 className="font-medium text-white mb-1">{useCase.title}</h4>
                    <p className="text-sm text-white/50">{useCase.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
