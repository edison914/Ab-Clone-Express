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
          spotId: 1,
          userId: 3,
          review: `This place is exact like the picture. Awesome.`,
          stars: 5,
        },
        {
          spotId: 2,
          userId: 3,
          review: `This place is terrible.`,
          stars: 1,
        },
        {
          spotId: 2,
          userId: 4,
          review: `This place is ugly.`,
          stars: 2,
        },
        {
          spotId: 3,
          userId: 3,
          review: `This place is so so.`,
          stars: 3,
        },
        {
          spotId: 3,
          userId: 2,
          review: `This place is alright.`,
          stars: 3,
        },
        {
          spotId: 4,
          userId: 2,
          review: `This place is fine.`,
          stars: 5,
        },
        {
          spotId: 4,
          userId: 3,
          review: `This place is great.`,
          stars: 5,
        },
        {
          spotId: 5,
          userId: 4,
          review: `This place is not bad for a place by the lake`,
          stars: 5,
        },
        {
          spotId: 5,
          userId: 3,
          review: `This place is great and I caught a lot of fish`,
          stars: 4,
        },
        {
          spotId: 6,
          userId: 4,
          review: `This place is comfortable and clean`,
          stars: 2,
        },
        {
          spotId: 6,
          userId: 3,
          review: `Nice kitchen, good wifi and great sunset.`,
          stars: 4,
        },
        {
          spotId: 7,
          userId: 4,
          review: `This place is close to the beach and we love it.`,
          stars: 5,
        },
        {
          spotId: 8,
          userId: 1,
          review: `This place is ok. Need a bit improvement in cleanning service.`,
          stars: 3,
        },
        {
          spotId: 10,
          userId: 2,
          review: `I will never go back to this place. The place is outdated and not clean`,
          stars: 2,
        },
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
        spotId: { [Op.in]: [1, 2, 3, 4, 5, 6, 7, 8, 10] },
      },
      {}
    );
  },
};
