
## Description

Booster

## Installation

```bash
$ npm install
```

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
### For migration use this tutorial

useful command
 
```
 npx typeorm migration:create -n ArticleTable -d src/migrations

 ````


 ### CQRS
 
based on this tutorial: https://docs.nestjs.com/recipes/cqrs

commands : POST, UPDATE, DELETE
query : GET


## Modules:

**Config for using ENV**
```
npm install --save @nestjs/config
```

**CQRS**
```
npm install --save @nestjs/cqrs
```

**Validation** 

based on tutorial link : https://docs.nestjs.com/techniques/validation
```
npm i --save class-validator class-transformer
```


**Hashing password**
```
npm install bcrypt
```

**JWT Auth**

tutorial Link : https://docs.nestjs.com/security/authentication
```
npm install --save @nestjs/jwt passport-jwt
npm install --save-dev @types/passport-jwt

npm install --save @nestjs/passport passport passport-local
```


**Sending Email**

tutorial link: https://www.npmjs.com/package/@nestjs-modules/mailer
```
npm install --save @nestjs-modules/mailer nodemailer
npm install --save-dev @types/nodemailer
```

Hint: handlebars and pug is an optional dependency, if you want to use the template, you must install it.
```
npm install --save handlebars
```

**Multer (upload photo)**
```
npm i -D @types/multer
```


**Swagger**
```
npm install --save @nestjs/swagger swagger-ui-express
```

**Swagger authentication**
```
npm i express-basic-auth
```

## Roles

### Naming
based on https://martendb.io/postgres/naming.html we use lowercase with under scores naming
```
mobile_number
is_used
```


# Swagger

To shows the all APIs and documentations uses of `Swagger`

`url: {{domain}}/docs`

`example: http://localhost:5000/docs`

Login based on `SWAGGER_USERNAME` and `SWAGGER_PASSWORD` in `.env` file


# CLI
**Install nestjs cli**
```
npm i -g @nestjs/cli
```

**Add a middleware**
```
nest g mi common/middlewares/logger
```

# Response Format 

It's sensitive to languages(`fa/en`)

**Note**: language in header of request

**Success**
```javascript
{
    "status": "success",
    "data": {
        "message": "something",
        "extraData": "something"
    },
    "error": {}
}
```
**Error**
```javascript
// For language:fa
{
    "status": "error",
    "error": {
        "status_code": 200,
        "error_code": 1001,
        "timestamp": "2022-05-09T11:31:34.858Z",
        "path": "/api/v1/auth/register",
        "message": "شماره همراه تکراری است"
    }
}
```

# Postman

Implemented test for all APIs

Postman link: https://www.getpostman.com/collections/6006ac369048172eb56e


# Useful articles

1: [Difference between Middleware, Interceptor, and Filter in the NestJS ecosystem](https://blog.bitsrc.io/difference-between-middleware-interceptor-and-filter-in-the-nest-js-ecosystem-c71fb3ba32f6)