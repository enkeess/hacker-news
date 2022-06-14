Интерфейс для сайта [Hacker News](https://news.ycombinator.com/news), состоящий из двух страниц.

### Главная страница

- Показывает последние 100 новостей в виде списка, отсортированного по дате, самые свежие сверху.
- Каждая новость содержит:
  - название
  - рейтинг
- ник автора
- дату публикации
- По клику на новость происходит переход на страницу новости
- Список новостей должен автоматически обновляться раз в минуту без участия пользователя
- На странице должна быть кнопка для принудительного обновления списка новостей

### Страница новости

- Содержит:
  - ссылку на новость
  - заголовок новости
  - дату
  - автора
  - счётчик количества комментариев
  - список комментариев в виде дерева
- Корневые комментарии подгружаются сразу же при входе на страницу, вложенные - по клику на корневой.
- Список комментариев должен автоматически обновляться раз в минуту без участия пользователя
- На странице должна быть кнопка для принудительного обновления списка комментариев
- На странице должна быть кнопка для возврата к списку новостей

## Технические требования

- Приложение разработано с использованием React и Redux
- Использован [официальный API Hacker News](https://github.com/HackerNews/API).
- Роутинг выполнен с использованием `React Router v6`
- Пакетный менеджер `npm`. Устанавливаются необходимые пакеты командой `npm install`
- Приложение должно запускаться по адресу `localhost:3000` командой `npm start`
