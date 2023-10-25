"use strict";

const { User } = require("../models");
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await User.bulkCreate(
      [
        {
          email: "ed@gmail.com",
          username: "Ed111",
          firstName: `Eddie`,
          lastName: `Ding`,
          hashedPassword: bcrypt.hashSync("password"),
        },
        {
          email: "jc@gmail.com",
          username: "Jason222",
          firstName: `Jason`,
          lastName: `Cha`,
          hashedPassword: bcrypt.hashSync("password2"),
        },
        {
          email: "al@gmail.com",
          username: "Alu333",
          firstName: `Ashley`,
          lastName: `Lu`,
          hashedPassword: bcrypt.hashSync("password3"),
        },
      ],
      { validate: true }
    );
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "Users";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,
      {
        username: { [Op.in]: ["Ed111", "Jason222", "Alu333"] },
      },
      {}
    );
  },
};
