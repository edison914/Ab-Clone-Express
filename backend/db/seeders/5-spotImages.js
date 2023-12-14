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
        {
          spotId: 5,
          url: `https://images.pexels.com/photos/7031406/pexels-photo-7031406.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1`,
          preview: true,
        },
        {
          spotId: 5,
          url: `https://images.pexels.com/photos/6283961/pexels-photo-6283961.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1`,
          preview: true,
        },
        {
          spotId: 5,
          url: `https://images.pexels.com/photos/6527069/pexels-photo-6527069.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1`,
          preview: true,
        },
        {
          spotId: 5,
          url: `https://images.pexels.com/photos/6492397/pexels-photo-6492397.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1`,
          preview: true,
        },
        {
          spotId: 5,
          url: `https://images.pexels.com/photos/7031406/pexels-photo-7031406.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1`,
          preview: true,
        },
        {
          spotId: 6,
          url: `https://images.pexels.com/photos/7061674/pexels-photo-7061674.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1`,
          preview: true,
        },
        {
          spotId: 6,
          url: `https://images.pexels.com/photos/3816397/pexels-photo-3816397.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1`,
          preview: true,
        },
        {
          spotId: 6,
          url: `https://images.pexels.com/photos/6580224/pexels-photo-6580224.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1`,
          preview: true,
        },
        {
          spotId: 6,
          url: `https://images.pexels.com/photos/5745989/pexels-photo-5745989.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1`,
          preview: true,
        },
        {
          spotId: 6,
          url: `https://images.pexels.com/photos/221506/pexels-photo-221506.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1`,
          preview: true,
        },
        {
          spotId: 7,
          url: `https://images.pexels.com/photos/6129989/pexels-photo-6129989.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1`,
          preview: true,
        },
        {
          spotId: 7,
          url: `https://images.pexels.com/photos/6129994/pexels-photo-6129994.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1`,
          preview: true,
        },
        {
          spotId: 7,
          url: `https://images.pexels.com/photos/6129992/pexels-photo-6129992.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1`,
          preview: true,
        },
        {
          spotId: 7,
          url: `https://images.pexels.com/photos/6129982/pexels-photo-6129982.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1`,
          preview: true,
        },
        {
          spotId: 7,
          url: `https://images.pexels.com/photos/5172301/pexels-photo-5172301.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1`,
          preview: true,
        },
        {
          spotId: 8,
          url: `https://images.pexels.com/photos/12877726/pexels-photo-12877726.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1`,
          preview: true,
        },
        {
          spotId: 8,
          url: `https://images.pexels.com/photos/5117917/pexels-photo-5117917.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1`,
          preview: true,
        },
        {
          spotId: 8,
          url: `https://images.pexels.com/photos/3201920/pexels-photo-3201920.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1`,
          preview: true,
        },
        {
          spotId: 8,
          url: `https://images.pexels.com/photos/764998/pexels-photo-764998.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1`,
          preview: true,
        },
        {
          spotId: 8,
          url: `https://images.pexels.com/photos/14741183/pexels-photo-14741183.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1`,
          preview: true,
        },
        {
          spotId: 9,
          url: `https://images.pexels.com/photos/9400977/pexels-photo-9400977.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1`,
          preview: true,
        },
        {
          spotId: 9,
          url: `https://images.pexels.com/photos/6875493/pexels-photo-6875493.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1`,
          preview: true,
        },
        {
          spotId: 9,
          url: `https://images.pexels.com/photos/6130052/pexels-photo-6130052.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1`,
          preview: true,
        },
        {
          spotId: 9,
          url: `https://images.pexels.com/photos/5740342/pexels-photo-5740342.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1`,
          preview: true,
        },
        {
          spotId: 9,
          url: `https://images.pexels.com/photos/12565208/pexels-photo-12565208.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1`,
          preview: true,
        },
        {
          spotId: 10,
          url: `https://images.pexels.com/photos/4783887/pexels-photo-4783887.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1`,
          preview: true,
        },
        {
          spotId: 10,
          url: `https://images.pexels.com/photos/14025040/pexels-photo-14025040.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1`,
          preview: true,
        },
        {
          spotId: 10,
          url: `https://images.pexels.com/photos/14024794/pexels-photo-14024794.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1`,
          preview: true,
        },
        {
          spotId: 10,
          url: `https://images.pexels.com/photos/14036443/pexels-photo-14036443.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1`,
          preview: true,
        },
        {
          spotId: 10,
          url: `https://images.pexels.com/photos/15176820/pexels-photo-15176820/free-photo-of-hotels-on-seashore.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1`,
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
        spotId: { [Op.in]: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] },
      },
      {}
    );
  },
};
