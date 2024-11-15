## Description

Сервис для загрузки видео.

## Installation

Перед установкой зависимостей создайте в корневой директории папку public. В ней еще две папки videos и previews.

```bash
$ npm install
```
В связи с конфликтами модулей @nestjs/serve-static и fluent-ffmpeg (_временно, в скором времени будет исправлено_) для установки использовать команду с устаревшими модулями

```bash
$ npm install --legacy-peer-deps
```

В проекте используется модуль fluent-ffmpeg. 
Подробнее о создании превью к видео [Статья](https://blog.logrocket.com/generating-video-previews-with-node-js-and-ffmpeg/)
Предварительно требуется установить в систему [ffmpeg](https://losst.pro/ustanovka-ffmpeg-v-ubuntu-20-04)


## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Проект написан используя framework [Nest](https://github.com/nestjs/nest)

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
