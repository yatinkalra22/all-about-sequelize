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
          const firstCharacter = firstNameContent.charAt(0);
          const isInUpperCase = firstCharacter === firstCharacter.toUpperCase();
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
        console.log("student model beforeValidate");
      },
      afterValidate: function () {
        console.log("student model afterValidate");
      },
      beforeCreate: function () {
        console.log("student model beforeCreate");
      },
      afterCreate: function () {
        console.log("student model afterCreate");
      },
    },
  }
);

const Feedback = connection.define(
  "feedback",
  {
    feedbackContent: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    feedbackFrom: {
      type: Sequelize.ENUM,
      values: ["teacher", "student", "principal"],
    },
  },
  {
    underscored: true,
    freezeTableName: true,
  }
);

// setting relationship
// student(1): feedback(M)
Student.hasMany(Feedback, { onDelete: "cascade" });
Feedback.belongsTo(Student, {
  foreignKey: "studentId",
});

connection
  .sync({ logging: console.log, force: true })
  .then(async function () {
    const firstStudentCreated = await Student.create(
      {
        first_name: "Jon",
        last_name: "Doe",
        email: "jon@doe.com",
        school: "abc",
        age: 25,
      },
      { fields: ["first_name", "last_name", "email", "age"] }
    );
    // adding feedback
    await Feedback.create({
      feedbackFrom: "teacher",
      feedbackContent: "Bright Student!!",
      studentId: firstStudentCreated.id,
    });
    // deleting the user to delete feedback
    await Student.destroy({ where: { id: firstStudentCreated.id } });

    await Student.bulkCreate(
      [
        {
          first_name: "Ron",
          last_name: "Wisely",
          email: "ron@ron.com",
          age: 26,
        },
        {
          first_name: "Harry",
          last_name: "Potter",
          email: "harry@harry.com",
          age: 24,
        },
      ],
      {
        validate: true,
        ignoreDuplicates: true,
        fields: ["first_name", "last_name", "email", "age"],
      }
    );
  })

  .catch(function (error) {
    console.log(error);
  });
