
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



### Modules:

Swagger
```
npm install --save @nestjs/swagger swagger-ui-express
```

use ENV
```
npm install --save @nestjs/config
```

CQRS
```
npm install --save @nestjs/cqrs
```

Validation 

based on tutorial link : https://docs.nestjs.com/techniques/validation
```
npm i --save class-validator class-transformer
```


Hashing password
```
npm install bcrypt
```

JWT Auth

tutorial Link : https://docs.nestjs.com/security/authentication
```
npm install --save @nestjs/jwt passport-jwt
npm install --save-dev @types/passport-jwt

npm install --save @nestjs/passport passport passport-local
```


Sending Email

tutorial link: https://www.npmjs.com/package/@nestjs-modules/mailer
```
npm install --save @nestjs-modules/mailer nodemailer
npm install --save-dev @types/nodemailer
```

Hint: handlebars and pug is an optional dependency, if you want to use the template, you must install it.
```
npm install --save handlebars
```


Multer (upload photo)
```
npm i -D @types/multer
```