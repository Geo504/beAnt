# Project BeAnt

The objective is to create a Finance App for take care of the expenses.

# dev backend
1. Set up your .env file from .env.template
```
PORT=5000

MONGO_URL=mongodb://user:password@host:port
MONGO_DB_NAME=db_name
MONGO_USER=user_name
MONGO_PASSWORD=password

EMAIL_SERVICE=gmail
EMAIL_NAME=mail@mail.com
EMAIL_PASSWORD=password

JWT_SEED=secret_jwt_seed
```

2. Open a terminal in path: ```./Backend ```
4. Execute on terminal for install dependencies: ```npm install```
3. Execute on terminal for database: ```docker-compose up -d```
5. Execute on terminal for run the backend: ```npm run dev```
