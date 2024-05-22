const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Comment extends Model {}

// Define the Comment model
Comment.init(
  {
    // Define the ID column
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    // Define the comment text column
    comment_text: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // Reference to the User model
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
    },
    // Reference to the Post model
    post_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'post',
        key: 'id',
      },
    },
  },
  {
    // Model configuration
    sequelize,
    timestamps: true, // Automatically add createdAt and updatedAt fields
    freezeTableName: true, // Prevent Sequelize from renaming the table
    underscored: true, // Use snake_case for automatically added fields
    modelName: 'comment', // Name of the model
  }
);

module.exports = Comment;
