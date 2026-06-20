# Slycat - Игровая платформа (аналог Steam)

Веб-приложение для магазина игр с корзиной, библиотекой, списком желаемого и личным кабинетом.

## Технологии

Фронтенд: TypeScript + HTML + CSS, собирается через Webpack
Бэкенд: C# (.NET 8.0), ASP.NET Core Web API
База данных: PostgreSQL 15 (в Docker-контейнере)

## Что нужно установить перед запуском

Docker Desktop - контейнер с PostgreSQL
Ссылка: https://www.docker.com/products/docker-desktop/

.NET SDK 8.0 - запуск C# сервера
Ссылка: https://dotnet.microsoft.com/download/dotnet/8.0

Node.js (версия 18+) - сборка фронтенда (Webpack)
Ссылка: https://nodejs.org/

Проверка установки:
docker --version
dotnet --version
node --version

## Запуск проекта

Установите зависимости Node.js:
cd путь\к\папке\Slycat-main
npm install

Запустите базу данных (PostgreSQL):
docker-compose up -d
База данных запустится в контейнере slycat_postgres на порту 5432. Данные хранятся в томе postgres_data и не пропадают при перезапуске.

Соберите фронтенд:
npx webpack
TypeScript скомпилируется в dist/bundle.js. Эту команду нужно выполнять каждый раз после изменения TypeScript-файлов.

Запустите сервер:
dotnet run --project Server
Сервер запустится на http://localhost:5000.

Откройте сайт в браузере:
http://localhost:5000/12.html

## Полезные команды

### База данных (PostgreSQL)

Запустить БД:
docker-compose up -d

Остановить БД:
docker-compose down

Перезапустить БД:
docker-compose restart

Подключиться к БД:
docker exec -it slycat_postgres psql -U postgres -d slycat_db

Посмотреть таблицы (после подключения):
\dt

Выйти из БД:
\q

### Обновление игры через командную строку

Список полей таблицы Igry:
Id, Nazvanie, Opisanie, Tsena, Zhanr, DataVyhoda, Kartinka, Razrabotchik, Izdatel, Trebovaniya, Tegi

Шаблон команды:
docker exec -it slycat_postgres psql -U postgres -d slycat_db -c "UPDATE \"Igry\" SET \"ПОЛЕ\" = 'ЗНАЧЕНИЕ' WHERE \"Id\" = НОМЕР;"

Примеры:

Изменить цену игры с Id = 25 на 999.99:
docker exec -it slycat_postgres psql -U postgres -d slycat_db -c "UPDATE \"Igry\" SET \"Tsena\" = 999.99 WHERE \"Id\" = 25;"

Изменить описание игры с Id = 1:
docker exec -it slycat_postgres psql -U postgres -d slycat_db -c "UPDATE \"Igry\" SET \"Opisanie\" = 'Новое описание' WHERE \"Id\" = 1;"

Посмотреть все игры:
docker exec -it slycat_postgres psql -U postgres -d slycat_db -c "SELECT \"Id\", \"Nazvanie\", \"Tsena\" FROM \"Igry\";"

Посмотреть структуру таблицы Igry:
docker exec -it slycat_postgres psql -U postgres -d slycat_db -c "SELECT column_name FROM information_schema.columns WHERE table_name = 'Igry';"

### Сервер

Запустить сервер:
dotnet run --project Server

Остановить сервер:
Ctrl + C в терминале

### Фронтенд

Собрать фронтенд:
npx webpack

Собрать в режиме разработки:
npx webpack --mode development

### Git

git add .
git commit -m "Описание изменений"
git push

## Структура проекта

Slycat-main/
├── Server/                        (C# бэкенд)
│   ├── Controllers/               (API контроллеры)
│   │   ├── AuthKontroller.cs      (Вход и регистрация)
│   │   ├── IgryKontroller.cs      (Каталог игр)
│   │   ├── KorzinaKontroller.cs   (Корзина)
│   │   ├── BibliotekaKontroller.cs (Библиотека - купленные игры)
│   │   ├── ZhelaemoeKontroller.cs (Желаемое)
│   │   └── PolzovatelKontroller.cs (Профиль пользователя)
│   ├── Models/                    (Модели таблиц БД)
│   │   ├── Igra.cs                (Игра)
│   │   ├── Polzovatel.cs          (Пользователь)
│   │   ├── Korzina.cs             (Корзина)
│   │   ├── Zhelaemoe.cs           (Желаемое)
│   │   └── IgraPolzovatelya.cs    (Купленные игры)
│   ├── Zaprosy/                   (DTO - запросы)
│   ├── Program.cs                 (Точка входа сервера)
│   ├── KontekstBazy.cs            (Контекст БД)
│   ├── HeshirovanieParolya.cs     (Хэширование паролей)
│   ├── NachalnyeDannye.cs         (Начальные данные)
│   └── wwwroot/                   (Статические файлы)
│       ├── 12.html                (Главная страница)
│       └── dist/                  (Собранный фронтенд)
├── src/                           (TypeScript исходники)
│   ├── api/index.ts               (API-запросы к серверу)
│   ├── components/                (Компоненты страниц)
│   │   ├── catalog.ts             (Каталог игр)
│   │   ├── library.ts             (Библиотека)
│   │   ├── cart.ts                (Корзина)
│   │   ├── wishlist.ts            (Желаемое)
│   │   ├── auth.ts                (Вход и регистрация)
│   │   ├── profile.ts             (Профиль)
│   │   ├── payment.ts             (Оплата)
│   │   ├── help.ts                (Помощь)
│   │   ├── navbar.ts              (Навигация)
│   │   └── addGame.ts             (Добавление игры)
│   ├── types/index.ts             (Типы TypeScript)
│   └── utils/                     (Вспомогательные утилиты)
├── dist/                          (Собранный бандл)
│   └── bundle.js
├── docker-compose.yml             (Конфигурация Docker)
├── package.json                   (Зависимости Node.js)
├── tsconfig.json                  (Конфигурация TypeScript)
└── webpack.config.js              (Конфигурация Webpack)

## API эндпоинты

GET /api/igry - список всех игр (можно с параметрами ?poisk= и ?zhanr=)
GET /api/igry/{id} - информация об игре по ID
POST /api/igry - добавить игру (требуется авторизация)
DELETE /api/igry/{id} - удалить игру (требуется авторизация)

POST /api/auth/registraciya - регистрация
POST /api/auth/vhod - вход

GET /api/korzina - содержимое корзины
POST /api/korzina - добавить в корзину
DELETE /api/korzina/{id} - удалить из корзины
DELETE /api/korzina/ochistit - очистить корзину
POST /api/korzina/oplatit - оплатить корзину

GET /api/zhelaemoe - список желаемого
POST /api/zhelaemoe - добавить в желаемое
DELETE /api/zhelaemoe/{id} - удалить из желаемого

GET /api/biblioteka - библиотека купленных игр

GET /api/polzovatel/profil - профиль пользователя
PUT /api/polzovatel/profil - обновить профиль
POST /api/polzovatel/avatar - обновить аватар
POST /api/polzovatel/smenit-parol - сменить пароль


## Примечания

Сервер запускается на порту 5000. Если порт занят, измените его в файле Program.cs.

База данных PostgreSQL запускается в Docker на порту 5432. Пароль: sly0907.

Фронтенд собирается в файл dist/bundle.js. После изменений в TypeScript нужно выполнить npx webpack.

Для работы корзины и библиотеки необходима регистрация и вход в систему.

Все цены указаны в рублях.
