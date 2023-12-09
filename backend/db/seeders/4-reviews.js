"use strict";

const { Review } = require("../models");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await Review.bulkCreate(
      [
        {
          spotId: 1,
          userId: 2,
          review: `This place is beautiful.`,
          stars: 4,
        },
        {
          spotId: 1,
          userId: 3,
          review: `This place is awesome.`,
          stars: 5,
        },
        {
          spotId: 2,
          userId: 1,
          review: `This place is terrible.`,
          stars: 1,
        },
        {
          spotId: 2,
          userId: 3,
          review: `This place is ugly.`,
          stars: 2,
        },
        {
          spotId: 3,
          userId: 1,
          review: `This place is so so.`,
          stars: 3,
        },
        // {
        //   spotId: 3,
        //   userId: 2,
        //   review: `This place is alright.`,
        //   stars: 3,
        // },
        // {
        //   spotId: 4,
        //   userId: 2,
        //   review: `This place is fine.`,
        //   stars: 5,
        // },
        // {
        //   spotId: 4,
        //   userId: 3,
        //   review: `This place is great.`,
        //   stars: 5,
        // },
      ],
      { validate: true }
    );
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "Reviews";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,
      {
        spotId: { [Op.in]: [1, 2, 3] },
      },
      {}
    );
  },
};
