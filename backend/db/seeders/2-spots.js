"use strict";

const { Spot } = require("../models");

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
          price: 10000,
        },
        {
          ownerId: 1,
          address: "1122 Eddie Drive",
          city: `Springfield`,
          state: `Virginia`,
          country: `United States of America`,
          lat: 18.8462,
          lng: 74.3043,
          name: `Eddie's Crib 2 in Nowhere`,
          description: `Eddie's not so sweet home`,
          price: 788,
        },
        {
          ownerId: 1,
          address: "40 Peachtree Drive",
          city: `Uniontown`,
          state: `Pennsylvania`,
          country: `United States of America`,
          lat: 20.2011,
          lng: -14.2324,
          name: `Eddie's Vaction Home in Forest`,
          description: `Eddie's cabine. Great place to do hunting and fishing`,
          price: 245,
        },
        {
          ownerId: 1,
          address: "9255 Inverness Street",
          city: `Galloway`,
          state: `Ohio`,
          country: `United States of America`,
          lat: 11.2011,
          lng: -134.2324,
          name: `Eddie's Fishing Home`,
          description: `This place is by the Lake. Great spot for fishing`,
          price: 199,
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
          price: 1000,
        },
        {
          ownerId: 2,
          address: "679 Alton Street",
          city: `Newtown`,
          state: `Indiana`,
          country: `United States of America`,
          lat: 49.2351,
          lng: 90.3432,
          name: `Jason's Cabin`,
          description: `A two bedrooms cabin in the middle of nowhere`,
          price: 699,
        },
        {
          ownerId: 3,
          address: "313 Ashley Blvd",
          city: `Los Angeles`,
          state: `California`,
          country: `United States of America`,
          lat: 34.0549,
          lng: 118.2426,
          name: `Ashley's home`,
          description: `A 2B1B condo that is located by the beach`,
          price: 300,
        },
        {
          ownerId: 4,
          address: "5426 Rose Court",
          city: `Victoria`,
          state: `Texas`,
          country: `United States of America`,
          lat: 32.1123,
          lng: 18.2426,
          name: `Demo's home`,
          description: `A really nice place that is located in the beautiful state of Texas`,
          price: 200,
        },
        {
          ownerId: 4,
          address: "9822 Marsh Rd",
          city: `Augusta`,
          state: `Georgia`,
          country: `United States of America`,
          lat: 33.2323,
          lng: 130.1122,
          name: `Demo's vaction home in Georgia`,
          description: `THe place has a very nice golf course. I also love the bar there`,
          price: 249,
        },
        {
          ownerId: 4,
          address: "3216 Loraid Court",
          city: `Camas`,
          state: `Arizona`,
          country: `United States of America`,
          lat: 25.3423,
          lng: -50.6373,
          name: `Demo's Condo in AZ`,
          description: `A single family house with attached pool in the backyard`,
          price: 399,
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
        ownerId: {
          [Op.in]: [
            1, 2, 3, 4
          ],
        },
      },
      {}
    );
  },
};
