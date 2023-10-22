'use strict';

const { Model, Validator } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // define association here
      User.hasMany(
        models.Spot,
          {foreignKey: 'ownerId', onDelete: 'CASCADE', hooks: true}
      );
      User.hasMany(
        models.Booking,
          {foreignKey: 'userId', onDelete: 'CASCADE', hooks: true}
      );
      User.hasMany(
        models.Review,
          {foreignKey: 'userId', onDelete: 'CASCADE', hooks: true}
      )

      //asscociation many to many
      // User.belongsToMany (
      //   models.Spot, {
      //     through: 'Booking', //model name referencing join table
      //     foreignKey: 'userId',
      //     otherKey: 'spotId',
      //     onDelete: 'CASCADE',
      //   }
      // ),

      // User.belongsToMany (
      //   models.Spot, {
      //     through: 'Review', //model name referencing join table
      //     foreignKey: 'userId',
      //     otherKey: 'spotId',
      //     onDelete: 'CASCADE',
      //   }
      // )

    }
  };

  User.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          len: [4, 30],
          isNotEmail(value) {
            if (Validator.isEmail(value)) {
              throw new Error("Cannot be an email.");
            }
          }
        }
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isAlpha:true,
          len: [2, 30],
        },
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isAlpha:true,
          len: [2, 30],
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          len: [3, 256],
          isEmail: true
        }
      },
      hashedPassword: {
        type: DataTypes.STRING.BINARY,
        allowNull: false,
        validate: {
          len: [60, 60]
        }
      }
    }, {
      sequelize,
      modelName: 'User',
      defaultScope: {
        attributes: {
          exclude: [`hashedPassword`, `email`,`createdAt`,`updatedAt`]
        }
      },
      scopes: {
        currentUser: {
          attributes: { exclude: [`hashedPassword`]}
        },
        loginUser: {atrributes: {}}
      }
    }
  );
  return User;
};
