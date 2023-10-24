"use strict";

const { Spot } = require("../backend/db/models");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await Spot.bulkCreate(
      [
        {
          ownerId: 1,
          address: "111 Eddie Drive",
          city: `Fairfax`,
          state: `Virginia`,
          country: `United States of America`,
          lat: 38.8462,
          lng: 77.3064,
          name: `Eddie's Crib`,
          description: `Eddie's sweet sweet home`,
          price: 500.99,
        },
        {
          ownerId: 2,
          address: "222 Jason Ave",
          city: `Louisville`,
          state: `Kentucky`,
          country: `United States of America`,
          lat: 38.2527,
          lng: 85.7585,
          name: `Jason's Mansion`,
          description: `A 10 bedroom house owned by Jason`,
          price: 1000.01,
        },
        {
          ownerId: 3,
          address: "333 Ashley Blvd",
          city: `Los Angeles`,
          state: `California`,
          country: `United States of America`,
          lat: 34.0549,
          lng: 118.2426,
          name: `Ashley's home`,
          description: `A 2B1B condo that is located by the beach`,
          price: 300.25,
        },
        {
          ownerId: 1,
          address: "1122 Eddie Drive",
          city: `Springfield`,
          state: `Virginia`,
          country: `United States of America`,
          lat: 18.8462,
          lng: 74.3043,
          name: `Eddie's Crib 2`,
          description: `Eddie's not so sweet home`,
          price: 200.02,
        },
      ],
      { validate: true }
    );
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "Spots";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,
      {
        name: {
          [Op.in]: [
            `Eddie's Crib`,
            `Jason's Mansion`,
            `Ashley's home`,
            `Eddie's Crib 2`,
          ],
        },
      },
      {}
    );
  },
};
