# Backend NodeJs com SQL

## Passo a passo

### Instalar dependencias
```node
npm i
```

### Configurar a conexao /database/conn.js
```javascript
    const sequelize = new Sequelize('nome_banco', 'user', 'password', {
    host: 'localhost',
    port: 3306,
    dialect: 'mariadb',
    define: {        
        freezeTableName: true
    }   
  })
```


## Configurar postman

### Get Courses
```http
  GET http://localhost:3333/courses
```
Na aba headers incluir:
| Key   | Value       | Description                           |
| :---------- | :--------- | :---------------------------------- |
| `Authorization` | `Bearer <token>` | Substituir <token> pelo token do login |


### Create Courses
```http
  POST http://localhost:3333/courses
```

Na aba headers incluir:
| Key   | Value       | Description                           |
| :---------- | :--------- | :---------------------------------- |
| `Authorization` | `Bearer <token>` | Substituir <token> pelo token do login |

Na aba body:
```json
{
    "description": "NodeJs", //nome do curso
    "date": "2023-12-23", //data do inicio do curso
    "studentsAmount": 0 //quantidade de alunos é incrementado ao se inscrever no curso
}
```

### Get Enroll
```http
  GET http://localhost:3333/enrollments
```

Na aba headers incluir:
| Key   | Value       | Description                           |
| :---------- | :--------- | :---------------------------------- |
| `Authorization` | `Bearer <token>` | Substituir <token> pelo token do login |

### Post Enroll
```http
  POST http://localhost:3333/enrollments
```

Na aba headers incluir:
| Key   | Value       | Description                           |
| :---------- | :--------- | :---------------------------------- |
| `Authorization` | `Bearer <token>` | Substituir <token> pelo token do login |

```json
{
    "userId": 1,
    "courseId": 2
}
```

### Cancel Enroll
```http
  DELETE http://localhost:3333/enrollments/enrollment_id
```

Na aba headers incluir:
| Key   | Value       | Description                           |
| :---------- | :--------- | :---------------------------------- |
| `Authorization` | `Bearer <token>` | Substituir <token> pelo token do login |


### Login
```http
  POST http://localhost:3333/login
```

```json
{
    "username": "leokatsuki",
    "password": "leo123"
}
```

### Logout
```http
  GET http://localhost:3333/logout
```

```json
{
    "token": "seu_token"
}
```

### Get Users
```http
  GET http://localhost:3333/users
```

### Create Users
```http
  POST http://localhost:3333/users
```

```json
{
    "username": "beatriz",
    "password": "beatriz123",
    "name": "Beatriz Akemi",
    "email": "bia@gmail.com",
    "age": 21,
    "phoneNumber": "61999999999",
    "country": "Brasil"
}
```

## Rodar a aplicação

```node
  npm run start
```