# Join in Typeorm
inner join [example](https://stackoverflow.com/questions/65525851/how-to-make-inner-join-to-work-on-typeorm#:~:text=TypeORM%20has%20a%20method%20called,table%20will%20be%20selected%20from.)

## Every user has one account(One To One)

**user entity**
```js
@OneToOne(type => AccountEntity, account => account.user) //user => many links
account: AccountEntity;
```

**account entity**
```js
//relation with user
@OneToOne(type => UserEntity, user => user.account)// one account => one user
@JoinColumn({ referencedColumnName: "id", name: 'user_id' })
user: UserEntity
```

```js
let result = await this.accountRepository
    .createQueryBuilder("accounts")
    .innerJoinAndSelect("accounts.user", "user")
    .getOne()
```

```sql
SELECT * from accounts
    inner join users 
    on accounts.user_id = users.id
```

### Select with paginition
```js
await this.userRepository.findAndCount({
    select:['id', 'mobile_number', 'email', 'invite_code', 'kyc_info', 'settings'],
    where: {}, order: { created_at: "DESC" },
    take: limit,
    skip: offset
})
```

<hr>

## Three ways for select data
**First Way**
```js
import { InjectConnection } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
// In constructor
@InjectConnection() private readonly connection: Connection

let foundedUsers = await this.connection.query('SELECT * FROM USERS;');
```

**Second Way**
```js
 let foundedUsers = await this.userRepository.createQueryBuilder("users").getMany();
```

**Third Way**
```js
foundedUsers = await this.userRepository.find({})
```
<hr>

## Inner join 

```js
let result = await this.accountRepository
    .createQueryBuilder("accounts")
    .innerJoinAndSelect("accounts.user", "user")
    .leftJoinAndSelect("accounts.carts", "cart")
    .where("user.id = :userId", { userId: userId })
    .getOne()
// SELECT * from accounts
// inner join users on users.id = accounts.user_id
// left join cart on users.id = accounts.user_id
// https://stackoverflow.com/questions/65525851/how-to-make-inner-join-to-work-on-typeorm#:~:text=TypeORM%20has%20a%20method%20called,table%20will%20be%20selected%20from.
```

<hr>

## Find And Count

**First Way**
```js
 const foundedUsers = await this.userRepository.findAndCount(
{
    select: ['id', 'mobile_number', 'email', 'invite_code', 'kyc_info', 'settings'],
    where: {}, order: { created_at: "DESC" },
    take: limit,
    skip: offset
})
```

**Second Way**
```js
// src/domains/user/cqrs/queries/get-users/get-users.query-handler.ts
let [foundedProfiles, count] = await Promise.all([
    this.accountService.findAll(limit, offset, queryStr, queryValues),
    this.accountService.getTotalCount()

```


## Add Pro QeuryBuilder
```js
// https://www.tabnine.com/code/javascript/functions/typeorm/Repository/count

