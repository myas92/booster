
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
$ npm run test:e2e
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
    }
}
```
**Error**
```javascript
// For language:fa
{
    "status": "error",
    "data": {
        "status_code": 200,
        "error_code": 1001,
        "timestamp": "2022-05-09T11:31:34.858Z",
        "path": "/api/v1/auth/register",
        "message": "شماره همراه تکراری است"
    }
}
```

# Rollback

Uses [transaction](https://docs.nestjs.com/techniques/database#transactions) of type orm for rollback

There is an example of using rollback in this blow path

`src/domains/example/cqrs/commands/add-example-rollback/add-example-rollback.command-handler.ts`


# Postman

Implemented test for all APIs

Postman link: https://www.getpostman.com/collections/6006ac369048172eb56e


# Docker
It is possible to publish the project as a docker
**Note:** Read notes>docker.txt steps

# Make file
The [Makefile](https://gist.github.com/zoe-1/784100440f0cf2299010#:~:text=The%20Makefile%20is%20useful%20for,%22%20and%20%22npm%20test%22.) is useful for automating tasks in your project. It don't work in `Windows`.
```bash
# sudo apt install make

make start
```


# Useful articles

1: [Difference between Middleware, Interceptor, and Filter in the NestJS ecosystem](https://blog.bitsrc.io/difference-between-middleware-interceptor-and-filter-in-the-nest-js-ecosystem-c71fb3ba32f6)

2: [How To Install and Use Docker on Ubuntu 20.04](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-on-ubuntu-20-04)
