const {
  DataTypes,
} = require(
  "sequelize"
);

const sequelize =
  require("../config/db");

const User =
  sequelize.define(

    "User",

    {

      github: {

        type:
          DataTypes.STRING,

        allowNull:
          true,
      },

      leetcode: {

        type:
          DataTypes.STRING,

        allowNull:
          true,
      },

      codeforces: {

        type:
          DataTypes.STRING,

        allowNull:
          true,
      },

      streak: {

        type:
          DataTypes.INTEGER,

        defaultValue:
          0,
      },
    }
  );

module.exports =
  User;