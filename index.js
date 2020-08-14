const Sequelize = require("sequelize");
require("dotenv").config();

// db cnx details
const connection = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER_NAME,
  process.env.DB_PASSWORD,
  {
    //   to connect to postgres
    dialect: "postgres",
    // // to connect to remote db
    // protocol: "postgres",
    // dialectOptions: {
    //   ssl: {
    //     require: true,
    //     rejectUnauthorized: false,
    //   },
    // },
  }
);

const student = connection.define("student", {
  name: Sequelize.STRING,
  first_name: Sequelize.STRING,
  last_name: Sequelize.STRING,
  age: Sequelize.INTEGER,
});

connection.sync();
