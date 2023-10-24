// "use strict";

// const { SpotImage } = require("../backend/db/models");

// let options = {};
// if (process.env.NODE_ENV === "production") {
//   options.schema = process.env.SCHEMA; // define your schema in options object
// }

// module.exports = {
//   async up(queryInterface, Sequelize) {
//     await SpotImage.bulkCreate(
//       [
//         {
//           spotId: 1,
//           url: `https://www.ab.com/eddie-home`,
//           preview: true,
//         },

//         {
//           spotId: 2,
//           url: `https://www.ab.com/jason-mansion`,
//           preview: true,
//         },

//         {
//           spotId: 3,
//           url: `https://www.ab.com/ashley-beach-house1`,
//           preview: true,
//         },
//         {
//           spotId: 4,
//           url: `https://www.ab.com/eddie-secondhome`,
//           preview: true,
//         },
//       ],
//       { validate: true }
//     );
//   },

//   async down(queryInterface, Sequelize) {
//     options.tableName = "SpotImages";
//     const Op = Sequelize.Op;
//     return queryInterface.bulkDelete(
//       options,
//       {
//         spotId: { [Op.in]: [1, 2, 3, 4] },
//       },
//       {}
//     );
//   },
// };
