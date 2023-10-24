'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Spot.hasMany(
        models.Review,
          {foreignKey: 'spotId', onDelete: 'CASCADE', hooks: true}
      );
      Spot.belongsTo(
        models.User,
          {foreignKey: 'ownerId'}
      );
      Spot.hasMany(
        models.SpotImage,
          {foreignKey: 'spotId', onDelete: 'CASCADE', hooks: true}
      );
      Spot.hasMany(
        models.Booking,
          {foreignKey: 'spotId', onDelete: 'CASCADE', hooks: true}
      );

      //asscociation many to many
      // Spot.belongsToMany (
      //   models.User, {
      //     through: 'Booking', //model name referencing join table
      //     foreignKey: 'spotId',
      //     otherKey: 'userId',
      //     onDelete: 'CASCADE',
      //   }
      // ),
      // Spot.belongsToMany (
      //   models.User, {
      //     through: 'Review', //model name referencing join table
      //     foreignKey: 'spotId',
      //     otherKey: 'userId',
      //     onDelete: 'CASCADE',
      //   }
      // )
    }
  }
  Spot.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    ownerId: DataTypes.INTEGER,
    address: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    country: DataTypes.STRING,
    lat: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    lng: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      unique: true,
    },
    description: DataTypes.STRING,
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Spot'
  });
  return Spot;
};
