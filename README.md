# CRM Lead Module

Модуль создания и валидации сделок для CRM-системы, реализованный на современном стеке React + TypeScript.

## Стек технологий

- **Фреймворк:** React 18 + TypeScript
- **State Management & Data Fetching:** Redux Toolkit, RTK Query (с теговой инвалидацией кэша)
- **Формы и валидация:** React Hook Form
- **UI Примитивы:** Radix UI Dialog (доступность WAI-ARIA)
- **Стилизация и анимации:** SCSS Modules + Keyframes animations
- **Тестирование:** Jest, React Testing Library
- **UI-документация:** Storybook
- **Контейнеризация:** Docker (Multi-stage build на базе Nginx Alpine)

## Архитектура проекта

```text
src/
├── api/          # RTK Query API slices, эндпоинты, тэги кэширования
├── components/   # Модульные UI компоненты, тесты (.test.tsx), истории (.stories.tsx), стили (.module.scss)
├── store/        # Конфигурация Redux Store и middleware
└── types/        # TypeScript интерфейсы и DTO
```

## Установка и запуск

### 1. Установка зависимостей
```bash
npm install
```

### 2. Запуск в режиме разработки
```bash
npm run dev
```

### 3. Запуск тестов
```bash
npm run test
```

### 4. Запуск Storybook
```bash
npm run storybook
```

### 5. Сборка проекта
```bash
npm run build
```

## Запуск в Docker

Сборка образа:
```bash
docker build -t crm-lead-module .
```

Запуск контейнера:
```bash
docker run -d -p 8080:80 crm-lead-module
```
Приложение будет доступно по адресу `http://localhost:8080`.
