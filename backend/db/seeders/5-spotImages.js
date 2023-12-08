"use strict";

const { SpotImage } = require("../models");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await SpotImage.bulkCreate(
      [
        {
          spotId: 1,
          url: `https://cdn.houseplansservices.com/content/hjuf6pe2lut8d35lthgk9maotb/w575.jpg?v=10`,
          preview: true,
        },

        {
          spotId: 2,
          url: `https://media-cldnry.s-nbcnews.com/image/upload/t_fit-760w,f_auto,q_auto:best/newscms/2019_24/1448814/how-size-doesnt-make-you-happier-today-main-190614.jpg`,
          preview: true,
        },

        {
          spotId: 3,
          url: `https://mygate.com/wp-content/uploads/2023/07/110.jpg`,
          preview: true,
        },
        {
          spotId: 4,
          url: `https://res.akamaized.net/domain/image/upload/t_web/v1538713881/bigsmall_Mirvac_house2_twgogv.jpg`,
          preview: true,
        },
      ],
      { validate: true }
    );
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "SpotImages";
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
