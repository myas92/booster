## Join in Typeorm
inner join [example](https://stackoverflow.com/questions/65525851/how-to-make-inner-join-to-work-on-typeorm#:~:text=TypeORM%20has%20a%20method%20called,table%20will%20be%20selected%20from.)


### Every user has one account(One To One)

**user entity**
```
@OneToOne(type => AccountEntity, account => account.user) //user => many links
account: AccountEntity;
```

**account entity**
```
//relation with user
@OneToOne(type => UserEntity, user => user.account)// one account => one user
@JoinColumn({ referencedColumnName: "id", name: 'user_id' })
user: UserEntity
```

```javascript
let result = await this.accountRepository
    .createQueryBuilder("accounts")
    .innerJoinAndSelect("accounts.user", "user")
    .getOne()
```

```query
SELECT * from accounts
    inner join users 
    on accounts.user_id = users.id
```