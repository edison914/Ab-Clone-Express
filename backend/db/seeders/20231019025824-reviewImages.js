'use strict';

const { ReviewImage } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    await ReviewImage.bulkCreate([
      {
        reviewId: 1,
        url: `https://www.ab.com/reviews/review1/picture`,
      },
      {
        reviewId: 2,
        url: `https://www.ab.com/reviews/review2/picture`,
      },
      {
        reviewId: 3,
        url: `https://www.ab.com/reviews/review3/picture`,
      },
      {
        reviewId: 4,
        url: `https://www.ab.com/reviews/review4/picture`,
      },
      {
        reviewId: 5,
        url: `https://www.ab.com/reviews/review5/picture`,
      },
      {
        reviewId: 6,
        url: `https://www.ab.com/reviews/review6/picture`,
      },
      {
        reviewId: 7,
        url: `https://www.ab.com/reviews/review7/picture`,
      },
      {
        reviewId: 8,
        url: `https://www.ab.com/reviews/review8/picture`,
      },
    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'ReviewImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: [1, 2, 3] }
    }, {});
  }
};
