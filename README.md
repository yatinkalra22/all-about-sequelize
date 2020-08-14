# All About Sequelize ORM

# To Run the project

#### Development -

\$npm run dev

#### Production -

\$npm start

## It covers the below topics

1. Installation
2. Models
3. Migration
4. Hooks

### 1. Installation -

[Sequelize Document reference](https://www.google.comhttps://sequelize.org/master/manual/getting-started.html)

### DB Connection (postgres) -

- `It accepts 3 parameter` -
  new Sequelize(db_details, additional_options, )

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

#### Converting object to db format -

##### connection.sync();

- `It accepts the following parameter` -
  > 1.  sync({force: true}) - drop existing db and create a new one
       **note :** not recommended to use in production
  > 2.  sync({logging: console.log}) - printing logs in terminal

### Database Schema:

##### Student

| Property | Name       | Type   |
| -------- | ---------- | ------ |
| pk       | id         | int    |
|          | first_name | String |
|          | last_name  | String |
|          | age        | int    |

### 2. Models

#### connection.define() -

- define() is used to create the structure of table.
- DDL commands.
- It accepts 3 parameter -

1. table_name
2. column_name -
   > type - define data type `eg: type: Sequelize.STRING`
   > allowNull - should column data be null `eg: allowNull: false,`
3. additional_parameter

#### Model_Name.create() -

- create() is used to insert data to the table.
- DML commands.
- It accepts column name with values
