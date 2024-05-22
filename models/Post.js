const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Post extends Model {}

// Define the Post model
Post.init(
  {
    // Define the ID column
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    // Define the title column
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
   

     // Define the content column
     content: {
        type: DataTypes.TEXT,
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
    },
    {
      // Model configuration
      sequelize,
      timestamps: true, // Automatically add createdAt and updatedAt fields
      freezeTableName: true, // Prevent Sequelize from renaming the table
      underscored: true, // Use snake_case for automatically added fields
      modelName: 'post', // Name of the model
    }
  );
  
  module.exports = Post;