# task-manager
Simple demo CRUD app for TO DO tasks with Angular UI, Spring Boot API and MySQL database.

## Requirements
To run all the microservices you will need at least Docker v20.10.21 and Docker Compose v2.13.0.

## Run the app
```
docker compose up -d mysqldb
cd backend
./mnvw install
cd ..
docker compose up -d
```
App will available at: [http:/localhost:4200/](http:/localhost:4200/) (it may take up to 1-2 minutes for it to get started in a container).
