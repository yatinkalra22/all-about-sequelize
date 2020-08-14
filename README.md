# All About Sequelize

## It covers the below topics

1. Installation
2. Models
3. Migration
4. Hooks

### 1. Installation -

Document - https://sequelize.org/master/manual/getting-started.html

#### DB Connection (postgres) -

new Sequlize(db_details, )

##### Local DB connection -

const connection = new Sequelize(
process.env.DB_NAME,
process.env.DB_USER_NAME,
process.env.DB_PASSWORD,
{
dialect: "postgres",
}
);

##### Remote DB connection -

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

##### converting object to db format -

connection.sync();

- it accepts the following parameter -
  1. sync({force: true}) - drop existing db and create a new one
     **note :** not recommended to use in production

### Database Schema:

##### Student

| Property | Name       | Type   |
| -------- | ---------- | ------ |
| pk       | id         | int    |
|          | first_name | String |
|          | last_name  | String |
|          | age        | int    |

### 1. Models
