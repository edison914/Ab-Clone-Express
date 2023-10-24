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
    ownerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    address: DataTypes.STRING,
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lat: {
      type:DECIMAL(20,10),
      allowNull: false,
    },
    lng: {
      type:DECIMAL(20,10),
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type:DECIMAL(20,10),
      allowNull: false,
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.literal('CURRENT_TIMESTAMP')
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.literal('CURRENT_TIMESTAMP')
    }
  }, {
    sequelize,
    modelName: 'Spot'
  });
  return Spot;
};
