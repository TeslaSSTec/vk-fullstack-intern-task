## Необходимые параметры для .env файла к Docker Compose

| Переменная     | Описание              | Тип     | Обязательна | Ограничения    |
|--------------|--------------------------|----------|----------|------------------|
| `PG_HOST`    | Адрес базы данных         | DOMAIN   | *      | -                |
| `PG_PORT`    | Порт для подключения      | Число  | *      | -|
| `PG_USER`    | Имя пользователя БД       | Строка   | *      | -                |
| `PG_PASS`    | Пароль пользователя БД    | Строка   | *      | -                |
| `PG_NAME`    | Имя базы данных           | Строка   | *      | -                |
| `JWT_SECRET` | Секретный ключ JWT        | Строка   | *      | 60+ символов      |

## Развёртывание 
`docker compose up` при наличии `.env` файла со всеми переменными


# Задание для TS FullStack стажёра

Привет! 

Если ты хочешь стать частью команды Учи.ру в рамках стажёрской программы,
то тебе необходимо выполнить небольшое тестовое задание. Это нужно, что бы твои
потенциальные наставники смогли оценить твои навыки и сравнив их с остальными
кандидатами выбрать лучших из лучших.

Помни, что работающий продукт важнее количества технологий и красивого кода.

Удачи!

## Что нужно сделать ?

- скопировать код из этого репозитария
- реализовать проект по описанию ниже
- прислать нам ссылку на твой репозитарий в github с выполненным заданием
- ждать обратной связи :)

## Проект "Кошачий пинтерест"

Необходимо реализовать сервис для просмотра котиков используя API https://thecatapi.com.

Проект (front-end и API) должен запускаться локально командой `docker compose up`.

### Front-end
Дизайн лежит тут - https://bit.ly/3utxaL2

- необходимо использовать React и TypeScript, остальные технологии опциональны
- по умолчанию должна открываться вкладка "все котики"
- у котика должна быть возможность добавить в "любимые" и убрать из "любимых"
- данные о "любимых" котиках должны хранится на back-end, который описан ниже
- на вкладке "любимые котики" должны отображаться добавленные в "любимые" котики
- реализация адаптивности будет плюсом, но не обязательна
- бесконечная прокрутка будет плюсом, но не обязательна

### Back-end

- необходимо использовать PostgreSQL, TypeORM и TypeScript, остальные технологии опциональны
- API описан в файле openapi.yaml
