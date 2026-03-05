## CryptoGit

**CryptoGit** — интерактивный образовательный сайт по криптографии:  
история, популярные шифры, инструменты шифрования/дешифрования, хеширование, сравнение данных, интерактивный тест и перечень источников.

[![Stars](https://img.shields.io/github/stars/crypto-digital/cryptogit?style=flat&logo=github)](https://github.com/crypto-digital/cryptogit/stargazers)
[![Issues](https://img.shields.io/github/issues/crypto-digital/cryptogit?style=flat&logo=github)](https://github.com/crypto-digital/cryptogit/issues)
[![License](https://img.shields.io/github/license/crypto-digital/cryptogit?style=flat)](https://github.com/crypto-digital/cryptogit/blob/main/LICENSE)

Контент и распределение данных по всей веб‑странице были сформированы и доработаны с помощью ИИ **Qwen Chat** [`https://chat.qwen.ai`](https://chat.qwen.ai).

<a href="https://chat.qwen.ai">
  <img src="https://chat.qwen.ai/favicon.ico" alt="Qwen Chat" width="32" />
</a>

---

### Технологический стек и версии

- **Ядро**
  - **React**: `19.2.0`
  - **React DOM**: `19.2.0`
  - **TypeScript**: `~5.9.3`
  - **Vite**: `^7.2.4`
- **Стили и UI**
  - **Tailwind CSS**: `^3.4.19`
  - **tailwindcss-animate**: `^1.0.7`
  - **tw-animate-css**: `^1.4.0`
  - **lucide-react**: `^0.562.0` (иконки)
- **Формы и валидация**
  - **react-hook-form**: `^7.70.0`
  - **@hookform/resolvers**: `^5.2.2`
  - **zod**: `^4.3.5`
- **UI‑компоненты**
  - **@radix-ui/react-*:** `^1.x`–`^2.x` (accordion, alert-dialog, dialog, tooltip, select, tabs и др.)
  - **vaul**: `^1.1.2`
  - **cmdk**: `^1.1.1`
- **Графики и визуализация**
  - **recharts**: `^2.15.4`
  - **embla-carousel-react**: `^8.6.0`
- **Уведомления и UX**
  - **sonner**: `^2.0.7`
- **Инфраструктура**
  - **ESLint**: `^9.39.1`
  - **typescript-eslint**: `^8.46.4`
  - **postcss**: `^8.5.6`
  - **autoprefixer**: `^10.4.23`
  - **gh-pages**: `^6.3.0`

**Системные требования**

- **Node.js**: ≥ **18.0.0** (рекомендуется **LTS 20.x**)
- **npm**: ≥ **9.x** (рекомендуется **10.x**)
- Современный браузер с поддержкой ES2015+

---

### Возможности

- **Обучающие разделы**
  - Что такое криптография и зачем она нужна
  - История криптографии
  - Популярные шифры и их особенности
  - Проблемы и вызовы современной криптографии
  - Источники и материалы для дальнейшего изучения

- **Интерактивные инструменты**
  - Шифрование и дешифрование текстов
  - Хеширование данных и сравнение хешей
  - Визуальное сравнение исходных и преобразованных данных

- **Интерактивный тест**
  - Вопросы по базовым понятиям криптографии
  - Проверка понимания прямо на сайте

- **UI и UX**
  - Тёмная тема, плавные анимации
  - Боковая панель навигации по всем разделам
  - Адаптивная вёрстка (desktop + mobile)
  - Большой набор переиспользуемых UI‑компонентов

---

### Структура проекта

```text
cryptogit/
├─ package.json           # Зависимости и npm-скрипты
├─ vite.config.ts         # Конфигурация Vite (React, aliases, base, allowedHosts)
├─ tailwind.config.js     # Конфигурация Tailwind CSS
├─ deploy.yml             # Конфигурация деплоя (GitHub Actions / GitHub Pages)
├─ README.md              # Документация проекта
├─ src/
│  ├─ main.tsx            # Входная точка React-приложения
│  ├─ App.tsx             # Корневой компонент, сборка всех секций
│  ├─ index.css           # Глобальные стили и подключение Tailwind
│  ├─ App.css             # Дополнительные стили приложения
│  ├─ components/
│  │  ├─ Sidebar.tsx      # Боковое меню навигации
│  │  ├─ Navigation.tsx   # Дополнительная навигация
│  │  ├─ LoadingScreen.tsx# Экран загрузки при старте
│  │  └─ ui/              # Универсальные UI-компоненты
│  │     ├─ button.tsx
│  │     ├─ input.tsx
│  │     ├─ card.tsx
│  │     ├─ dialog.tsx
│  │     ├─ tooltip.tsx
│  │     ├─ table.tsx
│  │     ├─ carousel.tsx
│  │     ├─ chart.tsx
│  │     ├─ alert.tsx
│  │     ├─ select.tsx
│  │     ├─ tabs.tsx
│  │     ├─ dropdown-menu.tsx
│  │     ├─ accordion.tsx
│  │     └─ ... (прочие атомарные и композитные компоненты)
│  ├─ sections/
│  │  ├─ Hero.tsx             # Вступительный блок
│  │  ├─ DataComparison.tsx   # Сравнение данных и хешей
│  │  ├─ WhatIsCrypto.tsx     # Что такое криптография
│  │  ├─ History.tsx          # История криптографии
│  │  ├─ Ciphers.tsx          # Популярные шифры
│  │  ├─ EncryptionTool.tsx   # Инструмент шифрования/дешифрования
│  │  ├─ Hashing.tsx          # Хеширование
│  │  ├─ Quiz.tsx             # Тест по криптографии
│  │  ├─ WhyImportant.tsx     # Важность криптографии
│  │  ├─ Problems.tsx         # Проблемы и вызовы
│  │  ├─ Sources.tsx          # Источники и ссылки
│  │  └─ Footer.tsx           # Нижний колонтитул
│  ├─ utils/
│  │  ├─ ciphers.ts           # Логика шифров
│  │  └─ hashing.ts           # Логика хеширования
│  ├─ lib/
│  │  └─ utils.ts             # Общие утилиты
│  └─ hooks/
│     └─ use-mobile.ts        # Хук для мобильного поведения
└─ ...
```

---

### Установка и запуск

#### 1. Клонирование репозитория

```bash
git clone https://github.com/crypto-digital/cryptogit.git
cd cryptogit
```

#### 2. Установка зависимостей

```bash
npm install
```

#### 3. Режим разработки (локальный запуск)

```bash
npm run dev
```

В терминале появится адрес, например:

```text
Local:   http://localhost:5173/
```

Откройте этот URL в браузере.

---

### Доступ с других устройств

#### Внутри локальной сети (Wi‑Fi / LAN)

```bash
npm run dev -- --host 0.0.0.0 --port 5173
```

В выводе Vite будет строка вида:

```text
Network: http://192.168.1.85:5173/
```

Этот адрес можно открыть с других устройств в той же сети (Wi‑Fi/кабель).

### ИИ‑поддержка

- Тексты разделов (объяснения, описания, формулировки) и распределение данных по одной длинной веб‑странице были созданы и доработаны с помощью ИИ **Qwen Chat** [`https://chat.qwen.ai`](https://chat.qwen.ai).
- ИИ применялся для структурирования материала, подбора формулировок и улучшения читаемости контента.

