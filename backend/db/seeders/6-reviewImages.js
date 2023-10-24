"use strict";

const { ReviewImage } = require("../backend/db/models");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await ReviewImage.bulkCreate(
      [
        {
          reviewId: 1,
          url: `https://www.ab.com/reviews/review1/Eddie-Home1`,
        },
        {
          reviewId: 2,
          url: `https://www.ab.com/reviews/review2/Eddie-Home2`,
        },
        {
          reviewId: 3,
          url: `https://www.ab.com/reviews/review3/Jason-Home`,
        },
        {
          reviewId: 4,
          url: `https://www.ab.com/reviews/review4/Jason-Home2`,
        },
        {
          reviewId: 5,
          url: `https://www.ab.com/reviews/review5/Ashley-Home1`,
        },
        {
          reviewId: 6,
          url: `https://www.ab.com/reviews/review6/Ashley-Home2`,
        },
        {
          reviewId: 7,
          url: `https://www.ab.com/reviews/review7/Eddie-Second-Home1`,
        },
        {
          reviewId: 8,
          url: `https://www.ab.com/reviews/review8/Eddie-Second-Home1`,
        },
      ],
      { validate: true }
    );
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "ReviewImages";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,
      {
        reviewId: { [Op.in]: [1, 2, 3, 4, 5, 6, 7, 8] },
      },
      {}
    );
  },
};
