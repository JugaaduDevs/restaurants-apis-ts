# Restaurant API

## How to access the DB in docker

In order to start the docker containers for MySQL and Adminer, start the docker compose file present at `infrastructure/mysql-adminer.yml` as below\

```
docker-compose -f mysql-adminer.yml up -d
```

Then access the database with URL http://localhost:8080. Use the adminer import wizard to import the file `infrastructure/db.sql`  to build your DB
