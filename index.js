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

const Student = connection.define(
  "student",
  {
    first_name: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        startsWithUpperCase: function (firstNameContent) {
          const firstCharater = firstNameContent.charAt(0);
          const isInUpperCase = firstCharater === firstCharater.toUpperCase();
          if (!isInUpperCase) {
            throw new Error("First character must be in Upper Case only");
          }
        },
      },
    },
    last_name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    age: {
      type: Sequelize.INTEGER,
      validate: {
        len: {
          args: [1, 100],
          msg: "Age must be between 1 to 100",
        },
      },
    },
    domestic_student: {
      type: Sequelize.BOOLEAN,
      defaultValue: true,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: "Email address already in use!",
      },
      validate: {
        isEmail: true,
      },
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
    // print the life cycle
    hooks: {
      beforeValidate: function () {
        console.log("beforeValidate");
      },
      afterValidate: function () {
        console.log("afterValidate");
      },
      beforeCreate: function () {
        console.log("beforeCreate");
      },
      afterCreate: function () {
        console.log("afterCreate");
      },
    },
  }
);

connection
  .sync({ logging: console.log, force: true })
  .then(function () {
    Student.create({
      first_name: "Jon",
      last_name: "Doe",
      email: "jon@doe.com",
      age: 25,
    });
  })
  .catch(function (error) {
    console.log(error);
  });
