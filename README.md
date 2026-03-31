# game-api-interface

Веб-интерфейс (SPA) для работы с **Game Server API**: просмотр/управление сущностями игры (поля добычи, ресурсы, склад, земли, баланс, здания, пользователь) через HTTP-запросы к серверу.

## Технологии

- **React 17** + **Create React App** (`react-scripts`)
- **React Router DOM v5**
- **MUI (v5)** / **Material-UI (v4)**, **styled-components**
- **axios**
- **bootstrap / react-bootstrap**

## Требования

- **Node.js** (рекомендуется LTS)
- **npm** (идёт вместе с Node.js)

## Установка

```bash
npm install
```

## Запуск в режиме разработки

```bash
npm start
```

После запуска приложение будет доступно по адресу, который выведет `react-scripts` (обычно `http://localhost:3000`).

## Сборка

```bash
npm run build
```

Собранные файлы появятся в папке `build/`.

## Тесты

```bash
npm test
```

## Конфигурация API

Клиент обращается к game-server через модуль `src/api/api.js`.

Сейчас базовый URL API **захардкожен**:

- `src/api/api.js` → `const gameServerApi = "http://dev.fanil.ru:45678"`

Также в файле есть заготовка под переменную окружения:

- `// const gameServerApi = process.env.GAME_SERVER_API`

### Рекомендуемый способ (через `.env`)

1. Создайте файл `.env` в корне проекта.
2. Добавьте переменную:

```bash
REACT_APP_GAME_SERVER_API=http://localhost:45678
```

3. Обновите `src/api/api.js`, чтобы он читал `process.env.REACT_APP_GAME_SERVER_API` (в CRA все пользовательские переменные должны начинаться с `REACT_APP_`).

## Маршруты приложения

Основные страницы (см. `src/App.js`):

- `/mining_field` — основная страница по умолчанию
- `/main`
- `/resource`
- `/warehouse`
- `/land`
- `/balance`
- `/building`
- `/user`

## Структура проекта

- `public/` — статические файлы и HTML-шаблон
- `src/` — исходники приложения
  - `src/api/` — HTTP-клиент для Game Server API (axios)
  - `src/views/` — страницы (экраны) приложения
  - `src/components/` — UI-компоненты
  - `src/route/` — layout/обвязка роутинга
  - `src/theme/` — тема MUI

