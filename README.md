# file-upload-demo

Создать CRUD сервер с возможностью загрузки файлов на бек и генерацией ссылки на фронт для скачивания файла (клиент загружает файл, автоматом генерируется ссылка на скачивание этого же файла). 
Сервер должен иметь возможность принимать socket соединение(т.е CRUD http и CRUD socket). 

Применять ООП. Сохранение данных в базе (Postgresql или Mongodb на выбор). 

Фронт на Vue, Vuetify (для стилизации). 

Для демонстрации CRUD можно сделать task list. Создание, обновление, удаление задачи. У каждой задачи, должна быть возможность загрузить файла и в дальнейшем возможность скачивать файл по ссылке для каждой задачи. 


## Запуск

### Preinstall:
* node
* npm - for server
* yarn - for vue-cli-service
* docker-compose

### Build:
``` bash
git clone https://github.com/aavezel/file-upload-demo.git
cd file-upload-demo
cd server && npm install && cd ..
cd client && cp .env.template .env && yarn install && yarn run build && cd ..
cp .env.template .env
docker-compose up
```


## TODO

- убрать зависимости от node/npm/yarn - распихать всё в докеры
- сделать нормальную авторизацию
- разбить чанки в клиенте