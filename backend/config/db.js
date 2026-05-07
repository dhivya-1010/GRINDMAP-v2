const {
  Sequelize,
} = require(
  "sequelize"
);

const sequelize =
  new Sequelize(

    "grindmap",

    "postgres",

    "Dhivya123",

    {
      host: "localhost",

      dialect:
        "postgres",
    }
  );

module.exports =
  sequelize;