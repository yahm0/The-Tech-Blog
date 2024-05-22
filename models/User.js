const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

class User extends Model {
  // Method to check password validity
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

// Define the User model
User.init(
    {
      // Define the ID column
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      // Define the username column
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      // Define the password column
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      // Hooks to hash the password before saving or updating
      hooks: {
        beforeCreate: async (newUserData) => {
          newUserData.password = await bcrypt.hash(newUserData.password, 10);
          return newUserData;
        },
        beforeUpdate: async (updatedUserData) => {
          updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
          return updatedUserData;
        },
      },

      // Model configuration
    sequelize,
    timestamps: false, // Disable automatic addition of createdAt and updatedAt fields
    freezeTableName: true, // Prevent Sequelize from renaming the table
    underscored: true, // Use snake_case for automatically added fields
    modelName: 'user', // Name of the model
  }
);

module.exports = User;