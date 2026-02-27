import { useState, useEffect, useRef } from 'react';
import { Copy, RefreshCw, Lock, Unlock, Check, Sparkles, Wrench, Shield, Key } from 'lucide-react';
import { caesarEncrypt, caesarDecrypt, vigenereEncrypt, vigenereDecrypt, atbashEncrypt, base64Encode, base64Decode } from '../utils/ciphers';

type CipherMethod = 'caesar' | 'vigenere' | 'atbash' | 'base64';
type Mode = 'encrypt' | 'decrypt';

interface Method {
  id: CipherMethod;
  name: string;
  description: string;
  needsKey: boolean;
  icon: React.ElementType;
  color: string;
}

const methods: Method[] = [
  { 
    id: 'caesar', 
    name: 'Цезарь', 
    description: 'Сдвиг букв на фиксированное число',
    needsKey: true,
    icon: Key,
    color: 'from-amber-500 to-orange-600',
  },
  { 
    id: 'vigenere', 
    name: 'Виженер', 
    description: 'Многоалфавитный шифр с ключом',
    needsKey: true,
    icon: Shield,
    color: 'from-purple-500 to-violet-600',
  },
  { 
    id: 'atbash', 
    name: 'Атбаш', 
    description: 'Зеркальная замена букв',
    needsKey: false,
    icon: Lock,
    color: 'from-emerald-500 to-teal-600',
  },
  { 
    id: 'base64', 
    name: 'Base64', 
    description: 'Кодирование в текстовый формат',
    needsKey: false,
    icon: Sparkles,
    color: 'from-blue-500 to-cyan-600',
  },
];

export default function EncryptionTool() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [method, setMethod] = useState<CipherMethod>('caesar');
  const [key, setKey] = useState('3');
  const [mode, setMode] = useState<Mode>('encrypt');
  const [copied, setCopied] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

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
    setIsProcessing(true);
    const timeout = setTimeout(() => {
      processText();
      setIsProcessing(false);
    }, 100);
    return () => clearTimeout(timeout);
  }, [input, method, key, mode]);

  const processText = () => {
    if (!input) {
      setOutput('');
      return;
    }

    let result = '';
    try {
      switch (method) {
        case 'caesar':
          const shift = parseInt(key) || 3;
          result = mode === 'encrypt' ? caesarEncrypt(input, shift) : caesarDecrypt(input, shift);
          break;
        case 'vigenere':
          const vigenereKey = key || 'KEY';
          result = mode === 'encrypt' ? vigenereEncrypt(input, vigenereKey) : vigenereDecrypt(input, vigenereKey);
          break;
        case 'atbash':
          result = atbashEncrypt(input);
          break;
        case 'base64':
          result = mode === 'encrypt' ? base64Encode(input) : base64Decode(input);
          break;
      }
    } catch (error) {
      result = 'Ошибка: неверный ввод';
    }
    setOutput(result);
  };

  const copyToClipboard = () => {
    if (output) {
      navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const clearAll = () => {
    setInput('');
    setOutput('');
  };

  const currentMethod = methods.find(m => m.id === method);

  return (
    <section
      id="tools"
      ref={sectionRef}
      className="section-padding bg-black relative overflow-hidden"
    >
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-ios-blue/5 rounded-full blur-[150px]" />
        <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-ios-purple/5 rounded-full blur-[150px]" />
      </div>

      <div className="container-max relative z-10">
        <div className={`text-center mb-12 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full mb-6">
            <Wrench className="w-4 h-4 text-ios-green" />
            <span className="text-sm text-white/70">Интерактивный инструмент</span>
          </div>
          
          <h2 className="text-title font-bold mb-4">
            <span className="gradient-text">Попробуйте</span>
            <br />
            <span className="text-white">Шифрование</span>
          </h2>
          <p className="text-white/60 max-w-xl mx-auto">
            Зашифруйте и расшифруйте сообщения разными методами прямо в браузере
          </p>
        </div>

        <div 
          className={`max-w-3xl mx-auto transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          style={{ transitionDelay: '200ms' }}
        >
          <div className="glass-strong rounded-3xl p-6 md:p-8">
            <div className="flex justify-center mb-8">
              <div className="glass rounded-2xl p-1.5 flex">
                <button
                  onClick={() => setMode('encrypt')}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                    mode === 'encrypt'
                      ? 'bg-gradient-to-r from-ios-blue to-ios-purple text-white shadow-glow'
                      : 'text-white/60 hover:text-white'
                  }`}
                >
                  <Lock className="w-4 h-4" />
                  <span>Шифровать</span>
                </button>
                <button
                  onClick={() => setMode('decrypt')}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                    mode === 'decrypt'
                      ? 'bg-gradient-to-r from-ios-green to-ios-teal text-white shadow-glow'
                      : 'text-white/60 hover:text-white'
                  }`}
                >
                  <Unlock className="w-4 h-4" />
                  <span>Дешифровать</span>
                </button>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm text-white/50 mb-3">Метод шифрования</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {methods.map((m) => {
                  const Icon = m.icon;
                  return (
                    <button
                      key={m.id}
                      onClick={() => setMethod(m.id)}
                      className={`p-4 rounded-2xl text-left transition-all duration-300 ${
                        method === m.id
                          ? 'bg-white/15 border border-white/30 shadow-glow'
                          : 'glass hover:bg-white/10'
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${m.color} flex items-center justify-center mb-2`}>
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <div className="font-medium text-white text-sm">{m.name}</div>
                      <div className="text-xs text-white/40 mt-0.5">{m.description}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {currentMethod?.needsKey && (
              <div className="mb-6 animate-fade-in">
                <label className="block text-sm text-white/50 mb-2">
                  {method === 'caesar' ? 'Сдвиг (число)' : 'Ключевое слово'}
                </label>
                <div className="relative">
                  <input
                    type={method === 'caesar' ? 'number' : 'text'}
                    value={key}
                    onChange={(e) => setKey(e.target.value)}
                    placeholder={method === 'caesar' ? '3' : 'Введите ключ'}
                    className="w-full px-4 py-3 pl-11 bg-black/40 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-ios-blue/50 transition-colors"
                  />
                  <Key className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                </div>
                <p className="text-xs text-white/40 mt-2">
                  {method === 'caesar' 
                    ? 'Рекомендуется: от 1 до 25 для латиницы, от 1 до 32 для кириллицы' 
                    : 'Используйте только буквы, без пробелов и спецсимволов'}
                </p>
              </div>
            )}

            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm text-white/50 mb-2">
                  {mode === 'encrypt' ? 'Исходный текст' : 'Зашифрованный текст'}
                </label>
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={mode === 'encrypt' ? 'Введите текст...' : 'Вставьте шифр...'}
                  className="w-full h-40 px-4 py-3 bg-black/40 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:border-ios-blue/50 transition-colors resize-none font-mono text-sm"
                />
                <div className="flex justify-between mt-2">
                  <span className="text-xs text-white/30">{input.length} символов</span>
                  <button
                    onClick={clearAll}
                    className="text-xs text-white/40 hover:text-white flex items-center gap-1 transition-colors"
                  >
                    <RefreshCw className="w-3 h-3" />
                    Очистить
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm text-white/50 mb-2">
                  {mode === 'encrypt' ? 'Зашифрованный текст' : 'Расшифрованный текст'}
                </label>
                <div className="relative">
                  <div className="w-full h-40 px-4 py-3 bg-black/60 border border-white/10 rounded-xl overflow-auto">
                    {isProcessing ? (
                      <div className="flex items-center justify-center h-full">
                        <div className="w-6 h-6 border-2 border-ios-blue/30 border-t-ios-blue rounded-full animate-spin" />
                      </div>
                    ) : output ? (
                      <p className="font-mono text-sm text-white break-all">{output}</p>
                    ) : (
                      <p className="text-white/30 font-mono text-sm">Результат появится здесь...</p>
                    )}
                  </div>
                  
                  {output && !isProcessing && (
                    <button
                      onClick={copyToClipboard}
                      className="absolute top-2 right-2 w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                    >
                      {copied ? (
                        <Check className="w-4 h-4 text-ios-green" />
                      ) : (
                        <Copy className="w-4 h-4 text-white/60" />
                      )}
                    </button>
                  )}
                </div>
                <div className="flex justify-between mt-2">
                  <span className="text-xs text-white/30">{output.length} символов</span>
                  {copied && (
                    <span className="text-xs text-ios-green flex items-center gap-1">
                      <Check className="w-3 h-3" />
                      Скопировано
                    </span>
                  )}
                </div>
              </div>
            </div>

            {isProcessing && (
              <div className="flex items-center justify-center gap-2 text-sm text-white/50">
                <div className="w-4 h-4 border-2 border-white/20 border-t-ios-blue rounded-full animate-spin" />
                <span>Обработка...</span>
              </div>
            )}
          </div>
        </div>

        <div 
          className={`max-w-2xl mx-auto mt-12 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          style={{ transitionDelay: '400ms' }}
        >
          <div className="glass rounded-2xl p-6">
            <h4 className="font-semibold text-white mb-4 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-ios-yellow" />
              <span>Советы по использованию</span>
            </h4>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="flex items-start gap-3 p-3 bg-white/5 rounded-xl">
                <div className="w-8 h-8 rounded-lg bg-ios-blue/20 flex items-center justify-center flex-shrink-0">
                  <Key className="w-4 h-4 text-ios-blue" />
                </div>
                <div>
                  <div className="text-sm font-medium text-white">Шифр Цезаря</div>
                  <div className="text-xs text-white/50">Используйте сдвиг от 1 до 25</div>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-white/5 rounded-xl">
                <div className="w-8 h-8 rounded-lg bg-ios-purple/20 flex items-center justify-center flex-shrink-0">
                  <Shield className="w-4 h-4 text-ios-purple" />
                </div>
                <div>
                  <div className="text-sm font-medium text-white">Шифр Виженера</div>
                  <div className="text-xs text-white/50">Ключ — только буквы</div>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-white/5 rounded-xl">
                <div className="w-8 h-8 rounded-lg bg-ios-green/20 flex items-center justify-center flex-shrink-0">
                  <Lock className="w-4 h-4 text-ios-green" />
                </div>
                <div>
                  <div className="text-sm font-medium text-white">Шифр Атбаш</div>
                  <div className="text-xs text-white/50">Не требует ключа</div>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-white/5 rounded-xl">
                <div className="w-8 h-8 rounded-lg bg-ios-cyan/20 flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-4 h-4 text-ios-cyan" />
                </div>
                <div>
                  <div className="text-sm font-medium text-white">Base64</div>
                  <div className="text-xs text-white/50">Кодирование данных</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
