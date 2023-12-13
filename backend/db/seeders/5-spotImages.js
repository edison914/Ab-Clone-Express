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
          url: `https://images.pexels.com/photos/2598683/pexels-photo-2598683.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2`,
          preview: true,
        },
        {
          spotId: 1,
          url: `https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1`,
          preview: true,
        },
        {
          spotId: 1,
          url: `https://images.pexels.com/photos/3155666/pexels-photo-3155666.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1`,
          preview: true,
        },
        {
          spotId: 1,
          url: `https://images.pexels.com/photos/3155696/pexels-photo-3155696.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1`,
          preview: true,
        },
        {
          spotId: 1,
          url: `https://images.pexels.com/photos/53610/large-home-residential-house-architecture-53610.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1`,
          preview: true,
        },
        {
          spotId: 2,
          url: `https://images.pexels.com/photos/1302242/pexels-photo-1302242.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1`,
          preview: true,
        },
        {
          spotId: 2,
          url: `https://images.pexels.com/photos/12610188/pexels-photo-12610188.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1`,
          preview: true,
        },
        {
          spotId: 2,
          url: `https://images.pexels.com/photos/2765436/pexels-photo-2765436.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1`,
          preview: true,
        },
        {
          spotId: 2,
          url: `https://images.pexels.com/photos/428427/pexels-photo-428427.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1`,
          preview: true,
        },
        {
          spotId: 2,
          url: `https://images.pexels.com/photos/5875837/pexels-photo-5875837.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1`,
          preview: true,
        },
        {
          spotId: 3,
          url: `https://images.pexels.com/photos/9491014/pexels-photo-9491014.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1`,
          preview: true,
        },
        {
          spotId: 3,
          url: `https://images.pexels.com/photos/12610188/pexels-photo-12610188.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1`,
          preview: true,
        },
        {
          spotId: 3,
          url: `https://images.pexels.com/photos/1314456/pexels-photo-1314456.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1`,
          preview: true,
        },
        {
          spotId: 3,
          url: `https://images.pexels.com/photos/19371568/pexels-photo-19371568/free-photo-of-rock-on-a-desert.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1`,
          preview: true,
        },
        {
          spotId: 3,
          url: `https://images.pexels.com/photos/6342356/pexels-photo-6342356.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1`,
          preview: true,
        },
        {
          spotId: 4,
          url: `https://images.pexels.com/photos/2468773/pexels-photo-2468773.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1`,
          preview: true,
        },
        {
          spotId: 4,
          url: `https://images.pexels.com/photos/1268871/pexels-photo-1268871.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1`,
          preview: true,
        },
        {
          spotId: 4,
          url: `https://images.pexels.com/photos/1314456/pexels-photo-1314456.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1`,
          preview: true,
        },
        {
          spotId: 4,
          url: `https://images.pexels.com/photos/412681/pexels-photo-412681.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1`,
          preview: true,
        },
        {
          spotId: 4,
          url: `https://images.pexels.com/photos/5007356/pexels-photo-5007356.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1`,
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
