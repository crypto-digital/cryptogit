import { useState, useEffect } from 'react';
import { 
  Home, 
  History, 
  Lock, 
  Wrench, 
  Shield, 
  AlertTriangle, 
  BookOpen, 
  Github,
  ChevronRight,
  Hash,
  HelpCircle,
  Target,
  Eye
} from 'lucide-react';

interface NavItem {
  id: string;
  label: string;
  icon: React.ElementType;
  color: string;
}

const navItems: NavItem[] = [
  { id: 'hero', label: 'Главная', icon: Home, color: 'from-ios-blue to-ios-purple' },
  { id: 'comparison', label: 'Сравнение', icon: Eye, color: 'from-ios-pink to-ios-red' },
  { id: 'what-is', label: 'О криптографии', icon: Shield, color: 'from-ios-green to-ios-teal' },
  { id: 'history', label: 'История', icon: History, color: 'from-ios-orange to-ios-yellow' },
  { id: 'ciphers', label: 'Шифры', icon: Lock, color: 'from-ios-purple to-ios-pink' },
  { id: 'tools', label: 'Инструменты', icon: Wrench, color: 'from-ios-blue to-ios-cyan' },
  { id: 'hashing', label: 'Хеширование', icon: Hash, color: 'from-ios-orange to-ios-red' },
  { id: 'quiz', label: 'Тест', icon: HelpCircle, color: 'from-ios-pink to-ios-purple' },
  { id: 'about', label: 'Важность', icon: Target, color: 'from-ios-green to-ios-blue' },
  { id: 'problems', label: 'Проблемы', icon: AlertTriangle, color: 'from-ios-red to-orange' },
  { id: 'sources', label: 'Источники', icon: BookOpen, color: 'from-ios-teal to-ios-green' },
];

export default function Sidebar() {
  const [activeSection, setActiveSection] = useState('hero');
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth < 1024) {
        setIsExpanded(false);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => document.getElementById(item.id));
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      sections.forEach((section, index) => {
        if (section) {
          const top = section.offsetTop;
          const height = section.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(navItems[index].id);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    if (isMobile) {
      setIsExpanded(false);
    }
  };

  return (
    <>
      <aside 
        className={`fixed left-0 top-0 h-full z-50 transition-all duration-500 hidden lg:flex flex-col ${
          isExpanded ? 'w-64' : 'w-20'
        }`}
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
      >
        <div className="absolute inset-0 bg-black/80 backdrop-blur-2xl border-r border-white/10" />
        
        <div className="relative z-10 flex flex-col h-full py-6">
          <div className={`flex items-center gap-3 px-4 mb-8 ${isExpanded ? '' : 'justify-center'}`}>
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-ios-blue to-ios-purple flex items-center justify-center flex-shrink-0 animate-pulse-glow">
              <Lock className="w-6 h-6 text-white" />
            </div>
            {isExpanded && (
              <span className="font-bold text-lg text-white whitespace-nowrap animate-fade-in">
                КриптоГид
              </span>
            )}
          </div>

          <nav className="flex-1 px-3 space-y-1 overflow-y-auto scrollbar-hide">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-3 rounded-2xl transition-all duration-300 group ${
                    isActive 
                      ? 'bg-white/15 shadow-lg' 
                      : 'hover:bg-white/5'
                  }`}
                >
                  <div className={`relative w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                    isActive 
                      ? `bg-gradient-to-br ${item.color}` 
                      : 'bg-white/5 group-hover:bg-white/10'
                  }`}>
                    <Icon className={`w-5 h-5 transition-all duration-300 ${
                      isActive ? 'text-white scale-110' : 'text-white/60 group-hover:text-white'
                    }`} />
                    
                    {isActive && (
                      <div className="absolute -right-1 -top-1 w-3 h-3 bg-white rounded-full animate-scale-in" />
                    )}
                  </div>

                  {isExpanded && (
                    <div className="flex items-center justify-between flex-1 animate-fade-in">
                      <span className={`text-sm font-medium transition-colors ${
                        isActive ? 'text-white' : 'text-white/60 group-hover:text-white'
                      }`}>
                        {item.label}
                      </span>
                      {isActive && (
                        <ChevronRight className="w-4 h-4 text-white/40" />
                      )}
                    </div>
                  )}

                  {!isExpanded && (
                    <div className="absolute left-full ml-3 px-3 py-2 bg-zinc-800 rounded-xl text-sm text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
                      {item.label}
                      <div className="absolute left-0 top-1/2 -translate-x-1 -translate-y-1/2 w-2 h-2 bg-zinc-800 rotate-45" />
                    </div>
                  )}
                </button>
              );
            })}
          </nav>

          <div className={`px-3 mt-auto ${isExpanded ? '' : 'flex justify-center'}`}>
            <a
              href="https://github.com/USERNAME/REPO"
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-3 px-3 py-3 rounded-2xl hover:bg-white/5 transition-all duration-300 group ${
                isExpanded ? '' : 'justify-center w-12'
              }`}
            >
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                <Github className="w-5 h-5 text-white/60 group-hover:text-white" />
              </div>
              {isExpanded && (
                <span className="text-sm text-white/60 group-hover:text-white animate-fade-in">
                  GitHub
                </span>
              )}
            </a>
          </div>
        </div>
      </aside>

      <nav className="fixed bottom-0 left-0 right-0 z-50 lg:hidden">
        <div className="bg-black/90 backdrop-blur-xl border-t border-white/10 px-2 py-2">
          <div className="flex items-center justify-around">
            {navItems.slice(0, 5).map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all duration-300 ${
                    isActive ? 'scale-110' : ''
                  }`}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
                    isActive 
                      ? `bg-gradient-to-br ${item.color}` 
                      : 'bg-white/5'
                  }`}>
                    <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-white/50'}`} />
                  </div>
                  <span className={`text-[10px] transition-colors ${
                    isActive ? 'text-white' : 'text-white/50'
                  }`}>
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      <div className="hidden lg:block w-20" />
    </>
  );
}
