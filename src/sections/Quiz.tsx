import { useEffect, useRef, useState } from 'react';
import { 
  HelpCircle, 
  CheckCircle2, 
  XCircle, 
  Trophy, 
  RotateCcw,
  ArrowRight,
  Target,
  Brain,
  Lightbulb
} from 'lucide-react';

interface Question {
  id: number;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

const questions: Question[] = [
  {
    id: 1,
    question: 'Какой шифр использовал Юлий Цезарь?',
    options: [
      'Шифр Виженера',
      'Шифр сдвига на 3 позиции',
      'Шифр Атбаш',
      'Шифр Энигма'
    ],
    correct: 1,
    explanation: 'Цезарь использовал простой шифр сдвига, смещая каждую букву на 3 позиции в алфавите.',
    difficulty: 'easy'
  },
  {
    id: 2,
    question: 'Чем отличается шифрование от хеширования?',
    options: [
      'Ничем, это одно и то же',
      'Хеширование необратимо, шифрование — нет',
      'Шифрование быстрее',
      'Хеширование использует ключи'
    ],
    correct: 1,
    explanation: 'Хеширование — необратимый процесс, результат нельзя преобразовать обратно. Шифрование обратимо с помощью ключа.',
    difficulty: 'easy'
  },
  {
    id: 3,
    question: 'Какой алгоритм является современным стандартом симметричного шифрования?',
    options: [
      'DES',
      'RSA',
      'AES',
      'MD5'
    ],
    correct: 2,
    explanation: 'AES (Advanced Encryption Standard) — современный стандарт, заменивший устаревший DES в 2001 году.',
    difficulty: 'easy'
  },
  {
    id: 4,
    question: 'Что такое «Энигма»?',
    options: [
      'Современный алгоритм шифрования',
      'Электромеханическая шифровальная машина',
      'Тип компьютерного вируса',
      'Язык программирования'
    ],
    correct: 1,
    explanation: '«Энигма» — электромеханическая шифровальная машина, использовавшаяся нацистской Германией во Второй мировой войне.',
    difficulty: 'medium'
  },
  {
    id: 5,
    question: 'Кто взломал шифр «Энигмы»?',
    options: [
      'Алан Тьюринг',
      'Клод Шеннон',
      'Рональд Ривест',
      'Блез Виженер'
    ],
    correct: 0,
    explanation: 'Алан Тьюринг и его команда в Блетчли-парке разработали машину «Bombe» для взлома «Энигмы».',
    difficulty: 'medium'
  },
  {
    id: 6,
    question: 'Что такое открытый ключ в криптографии?',
    options: [
      'Ключ, известный всем',
      'Ключ для шифрования данных',
      'Ключ для дешифрования',
      'Пароль от компьютера'
    ],
    correct: 1,
    explanation: 'В асимметричной криптографии открытый ключ используется для шифрования, а закрытый — для дешифрования.',
    difficulty: 'medium'
  },
  {
    id: 7,
    question: 'Какой алгоритм НЕ рекомендуется для использования?',
    options: [
      'SHA-256',
      'AES-256',
      'MD5',
      'RSA-2048'
    ],
    correct: 2,
    explanation: 'MD5 считается устаревшим и небезопасным, так как для него существуют методы создания коллизий.',
    difficulty: 'medium'
  },
  {
    id: 8,
    question: 'Что угрожает современной криптографии?',
    options: [
      'Квантовые компьютеры',
      'Умные часы',
      'Wi-Fi роутеры',
      'Смартфоны'
    ],
    correct: 0,
    explanation: 'Квантовые компьютеры теоретически могут взломать RSA и ECC с помощью алгоритма Шора.',
    difficulty: 'hard'
  },
  {
    id: 9,
    question: 'Как называется эффект, при котором малейшее изменение входных данных полностью меняет хеш?',
    options: [
      'Эффект бабочки',
      'Лавинный эффект',
      'Эффект домино',
      'Эффект снежного кома'
    ],
    correct: 1,
    explanation: 'Лавинный эффект — свойство хеш-функций, при котором изменение одного бита входа радикально меняет выход.',
    difficulty: 'hard'
  },
  {
    id: 10,
    question: 'Какой длины хеш выдает алгоритм SHA-256?',
    options: [
      '128 бит',
      '256 бит',
      '512 бит',
      '1024 бита'
    ],
    correct: 1,
    explanation: 'SHA-256 (Secure Hash Algorithm 256-bit) всегда выдает хеш длиной ровно 256 бит (64 шестнадцатеричных символа).',
    difficulty: 'easy'
  }
];

const difficultyColors = {
  easy: 'bg-ios-green/20 text-ios-green',
  medium: 'bg-ios-yellow/20 text-ios-yellow',
  hard: 'bg-ios-red/20 text-ios-red'
};

const difficultyLabels = {
  easy: 'Легко',
  medium: 'Средне',
  hard: 'Сложно'
};

export default function Quiz() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

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

  const handleAnswer = (index: number) => {
    if (answered) return;
    
    setSelectedAnswer(index);
    setAnswered(true);
    
    if (index === questions[currentQuestion].correct) {
      setScore(score + 1);
    }
    
    setTimeout(() => setShowExplanation(true), 500);
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setAnswered(false);
      setShowExplanation(false);
    } else {
      setShowResult(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setAnswered(false);
    setShowExplanation(false);
  };

  const getResultMessage = () => {
    const percentage = (score / questions.length) * 100;
    if (percentage >= 90) return { text: 'Отлично! Вы эксперт!', icon: Trophy, color: 'text-ios-yellow' };
    if (percentage >= 70) return { text: 'Хорошо! Вы знаете много!', icon: CheckCircle2, color: 'text-ios-green' };
    if (percentage >= 50) return { text: 'Неплохо! Есть куда расти!', icon: Lightbulb, color: 'text-ios-blue' };
    return { text: 'Попробуйте еще раз!', icon: Brain, color: 'text-ios-orange' };
  };

  if (showResult) {
    const result = getResultMessage();
    const ResultIcon = result.icon;
    
    return (
      <section id="quiz" className="section-padding bg-black relative overflow-hidden">
        <div className="container-max relative z-10">
          <div className="max-w-xl mx-auto">
            <div className="glass-strong rounded-3xl p-8 text-center">
              <div className={`w-20 h-20 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-6 ${result.color}`}>
                <ResultIcon className="w-10 h-10" />
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-2">{result.text}</h3>
              <p className="text-white/60 mb-6">
                Вы ответили правильно на {score} из {questions.length} вопросов
              </p>
              
              <div className="w-full h-4 bg-white/10 rounded-full overflow-hidden mb-8">
                <div 
                  className="h-full bg-gradient-to-r from-ios-blue to-ios-purple transition-all duration-1000"
                  style={{ width: `${(score / questions.length) * 100}%` }}
                />
              </div>
              
              <button
                onClick={resetQuiz}
                className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 rounded-xl text-white hover:bg-white/20 transition-colors"
              >
                <RotateCcw className="w-5 h-5" />
                Пройти еще раз
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const question = questions[currentQuestion];

  return (
    <section
      id="quiz"
      ref={sectionRef}
      className="section-padding bg-black relative overflow-hidden"
    >
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-ios-purple/5 rounded-full blur-[150px]" />
      </div>

      <div className="container-max relative z-10">
        <div className={`text-center mb-12 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full mb-6">
            <Target className="w-4 h-4 text-ios-purple" />
            <span className="text-sm text-white/70">Проверьте свои знания</span>
          </div>
          
          <h2 className="text-title font-bold mb-4">
            <span className="gradient-text">Тест</span>
            <span className="text-white"> по криптографии</span>
          </h2>
          <p className="text-white/60 max-w-xl mx-auto">
            Пройдите тест из {questions.length} вопросов и узнайте, насколько хорошо вы разбираетесь в шифровании
          </p>
        </div>

        <div 
          className={`max-w-2xl mx-auto transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          style={{ transitionDelay: '200ms' }}
        >
          <div className="glass-strong rounded-3xl p-6 md:p-8">
            <div className="flex items-center justify-between mb-6">
              <span className="text-sm text-white/50">
                Вопрос {currentQuestion + 1} из {questions.length}
              </span>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${difficultyColors[question.difficulty]}`}>
                {difficultyLabels[question.difficulty]}
              </span>
            </div>
            
            <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden mb-8">
              <div 
                className="h-full bg-gradient-to-r from-ios-blue to-ios-purple transition-all duration-300"
                style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
              />
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-semibold text-white flex items-start gap-3">
                <HelpCircle className="w-6 h-6 text-ios-blue flex-shrink-0 mt-0.5" />
                {question.question}
              </h3>
            </div>

            <div className="space-y-3 mb-6">
              {question.options.map((option, index) => {
                const isSelected = selectedAnswer === index;
                const isCorrect = index === question.correct;
                const showCorrectness = answered;
                
                let buttonClass = 'glass hover:bg-white/10';
                if (showCorrectness) {
                  if (isCorrect) {
                    buttonClass = 'bg-ios-green/20 border-ios-green/50';
                  } else if (isSelected && !isCorrect) {
                    buttonClass = 'bg-ios-red/20 border-ios-red/50';
                  } else {
                    buttonClass = 'opacity-50';
                  }
                } else if (isSelected) {
                  buttonClass = 'bg-ios-blue/20 border-ios-blue/50';
                }
                
                return (
                  <button
                    key={index}
                    onClick={() => handleAnswer(index)}
                    disabled={answered}
                    className={`w-full p-4 rounded-xl text-left transition-all duration-200 border ${buttonClass}`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                        showCorrectness 
                          ? isCorrect 
                            ? 'border-ios-green bg-ios-green' 
                            : isSelected 
                              ? 'border-ios-red bg-ios-red' 
                              : 'border-white/30'
                          : isSelected 
                            ? 'border-ios-blue bg-ios-blue' 
                            : 'border-white/30'
                      }`}>
                        {showCorrectness && isCorrect && <CheckCircle2 className="w-4 h-4 text-white" />}
                        {showCorrectness && isSelected && !isCorrect && <XCircle className="w-4 h-4 text-white" />}
                        {!showCorrectness && isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                      </div>
                      <span className="text-white/80">{option}</span>
                    </div>
                  </button>
                );
              })}
            </div>

            {showExplanation && (
              <div className="p-4 bg-ios-blue/10 rounded-xl border border-ios-blue/20 mb-6 animate-fade-in">
                <p className="text-sm text-white/70">
                  <span className="text-ios-blue font-medium">Пояснение: </span>
                  {question.explanation}
                </p>
              </div>
            )}

            {answered && (
              <button
                onClick={nextQuestion}
                className="w-full py-4 bg-gradient-to-r from-ios-blue to-ios-purple rounded-xl text-white font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity animate-fade-in"
              >
                {currentQuestion < questions.length - 1 ? 'Следующий вопрос' : 'Узнать результат'}
                <ArrowRight className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
