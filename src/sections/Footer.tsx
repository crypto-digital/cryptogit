import { Github, Heart, Lock, ExternalLink, Sparkles, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative bg-black border-t border-white/10 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-ios-blue/5 rounded-full blur-[200px]" />
        <div className="absolute top-0 left-1/4 w-[300px] h-[300px] bg-ios-purple/5 rounded-full blur-[150px]" />
      </div>

      <div className="container-max relative z-10 py-16 px-6">
        <div className="grid lg:grid-cols-3 gap-12 mb-16">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-ios-blue to-ios-purple flex items-center justify-center animate-pulse-glow">
                <Lock className="w-7 h-7 text-white" />
              </div>
              <div>
                <span className="text-2xl font-bold text-white">КриптоГид</span>
                <p className="text-xs text-white/50">Образовательный проект</p>
              </div>
            </div>
            
            <p className="text-white/60 text-sm leading-relaxed mb-6">
              Интерактивный проект по криптографии для изучения шифрования, 
              истории тайнописи и современных методов защиты данных.
            </p>

            <a
              href="https://github.com/USERNAME/REPO"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-6 py-3 glass rounded-xl text-white hover:bg-white/15 transition-all duration-300 group"
            >
              <Github className="w-5 h-5" />
              <span className="font-medium">Исходный код</span>
              <ExternalLink className="w-4 h-4 text-white/50 group-hover:text-white transition-colors" />
            </a>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-6 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-ios-yellow" />
              Разделы
            </h4>
            <nav className="space-y-3">
              {[
                { label: 'Главная', href: '#hero' },
                { label: 'История криптографии', href: '#history' },
                { label: 'Популярные шифры', href: '#ciphers' },
                { label: 'Интерактивный инструмент', href: '#tools' },
                { label: 'Источники', href: '#sources' },
              ].map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="block text-white/50 hover:text-white transition-colors text-sm"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-6 flex items-center gap-2">
              <Heart className="w-4 h-4 text-ios-red" />
              Об авторе
            </h4>
            
            <div className="glass-strong rounded-2xl p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-ios-blue to-ios-purple flex items-center justify-center overflow-hidden">
                  <img
                    src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2F736x%2F81%2F54%2F56%2F8154569feeb906ad8a72449f1b097a3b.jpg&f=1&nofb=1&ipt=1d77d2a402722af5fef02d441fa18bb9857273de4644c17435c1a368dc101389"
                    alt="dejavu"
                    className="w-full h-full object-cover"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                  <div className="font-semibold text-white">dejavu</div>
                </div>
              </div>
              
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-white/50">
                  <MapPin className="w-4 h-4" />
                  <span>МБОУ Многопрофильный лицей "Здоровое поколение"</span>
                </div>
                <div className="flex items-center gap-2 text-white/50">
                  <Mail className="w-4 h-4" />
                  <span>Образовательный проект 2026</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-sm text-white/40">
              <span>© 2026 КриптоГид</span>
              <span className="w-1 h-1 rounded-full bg-white/20" />
              <span>Образовательный проект</span>
            </div>
            
            <div className="flex items-center gap-2 text-sm text-white/40">
              <span>Сделано с</span>
              <Heart className="w-4 h-4 text-ios-red fill-ios-red animate-pulse" />
              <span>для изучения криптографии</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
