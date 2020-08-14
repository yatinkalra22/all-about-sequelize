# All About Sequelize ORM

---

# To Run the project

| Environment |    Command    |
| ----------- | :-----------: |
| Development | \$npm run dev |
| Production  |  \$npm start  |

---

## It covers the below topics

1. Installation
2. Models
3. Hooks
4. Migration

---

### 1. Installation -

[Sequelize Document reference](https://sequelize.org/master/manual/getting-started.html)

##### Local DB connection -

```
const connection = new Sequelize(
process.env.DB_NAME,
process.env.DB_USER_NAME,
process.env.DB_PASSWORD,
{
dialect: "postgres",
}
);
```

#### Remote DB connection -

```
const connection = new Sequelize(
process.env.DB_NAME,
process.env.DB_USER_NAME,
process.env.DB_PASSWORD,
{

    dialect: "postgres",
    protocol: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },

}
);
```

### Database Schema:

#### Student

| Property | Name             | Type    |
| -------- | ---------------- | ------- |
| pk       | id               | int     |
|          | first_name       | String  |
|          | last_name        | String  |
|          | age              | int     |
|          | domestic_student | Boolean |
|          | email            | String  |

---

### 2. Models

#### connection.define() -

- define() is used to create the structure of table.
- DDL command.
- It accepts 3 parameter -

1. table_name
2. column_name -
   - type -> define data type `eg: type: Sequelize.STRING`
   - allowNull -> should column data be null or not `eg: allowNull: false,`
   - defaultValue -> sets default value of your choice and datatype `eg: defaultValue: true,`
   - unique -> not allow duplicate value `eg: unique: true`
   - primaryKey -> You can set your own primary key of table `eg: primaryKey: true`
   - [validate](https://sequelize.org/master/manual/validations-and-constraints.html) -> checks for set condition `eg: validate: { isEmail: true}`
3. additional_parameter -
   - timestamps -> if you don't want created_at and updated_at in a table `eg: timestamps: false`
   - freezeTableName -> to pluralize the table name `eg: freezeTableName: true`

#### connection.sync();

- sync() converts javascript objects to db like data.
- It accepts the following parameter -
  - 1.  sync({force: true}) - drop existing db and create a new one
        **note :** not recommended to use in production
  - 2.  sync({logging: console.log}) - printing logs in terminal

#### Model_Name.create() -

- create() is used to insert data to the table.
- DML command.
- It accepts column name with values.
- You can allows only the selected parameter to be stored in the database.
  -Example:

```
  Student.create(
    Student.create(
      {
        first_name: "Jon",
        last_name: "Doe",
        email: "jon@doe.com",
        school: "abc",
        age: 25,
        class_no: "1-A",
        address: "Xyz"
      },
      { fields: ["first_name", "last_name", "email", "age"] }
    );
```

#### Model_Name.bulkCreate() -

- bulkCreate() is similar to create(), it just insert multiple data to the table.
- you can also use the field function in the second argument.
- It's fast but it skip validation. but you can enable it in the second parameter.
- Additionally, you can ignore duplicate values `eg: ignoreDuplicates: true,`

#### Model_Name.build() -

- build() is similar to create(), but needs to save(), before making entry to db table.
- It gives immediate reference of the model instance.

### 3. Hooks -

- [Hooks](https://sequelize.org/master/manual/hooks.html) are the life cycle events similar to the one in React.JS
- There are different ways to implement hooks. One common way is to use build in methods as:

```
  beforeValidate:
  afterValidate:
  beforeCreate:
  afterCreate:
```

- Hooks can be used before and after db connections too:

```
  sequelize.beforeConnect(callback)
  sequelize.afterConnect(callback)
  sequelize.beforeDisconnect(callback)
  sequelize.afterDisconnect(callback)
```
