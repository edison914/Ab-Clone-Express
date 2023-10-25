"use strict";

const { Booking } = require("../models");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await Booking.bulkCreate(
      [
        {
          spotId: 1,
          userId: 2,
          startDate: "2021-01-01",
          endDate: "2021-01-02",
        },
        {
          spotId: 2,
          userId: 1,
          startDate: "2023-10-20",
          endDate: "2023-11-10",
        },
        {
          spotId: 3,
          userId: 1,
          startDate: "2023-03-03",
          endDate: "2023-03-04",
        },
        {
          spotId: 4,
          userId: 3,
          startDate: "2023-04-04",
          endDate: "2023-04-05",
        },
        {
          spotId: 2,
          userId: 3,
          startDate: "2023-12-04",
          endDate: "2023-12-05",
        },
      ],
      { validate: true }
    );
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "Bookings";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,
      {
        spotId: { [Op.in]: [1, 2, 3, 4] },
      },
      {}
    );
  },
};
