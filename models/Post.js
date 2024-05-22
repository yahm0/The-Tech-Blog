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
   