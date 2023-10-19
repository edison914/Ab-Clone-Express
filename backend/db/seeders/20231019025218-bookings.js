'use strict';

const { Booking } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    await Booking.bulkCreate([
      {
        spotId: 1,
        userId: 2,
        startDate: "2021-01-01",
        endDate: "2021-01-02",
      },
      {
        spotId: 2,
        userId: 1,
        startDate: "2022-02-02",
        endDate: "2022-02-03",
      },
      {
        spotId: 3,
        userId: 1,
        startDate: "2023-03-03",
        endDate: "2023-03-04",
      },
    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Bookings';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: [1, 2, 3] }
    }, {});
  }
};
