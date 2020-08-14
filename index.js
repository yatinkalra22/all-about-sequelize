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

const Student = connection.define("student", {
  first_name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  last_name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  age: {
    type: Sequelize.INTEGER,
  },
});

connection.sync({ force: true }).then(function () {
  Student.create({
    first_name: "Jon",
    last_name: "Dove",
    age: 25,
  });
});
