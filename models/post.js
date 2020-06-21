/**
 * Database profile model.
 * Author: Anthony Olasinde.
 * Version: 1.0.0
 * Release Date: 10-June-2020
 * Last Updated: 11-June-2020
 */

/**
 * Module dependencies.
 */
 
// put your model dependencies here...
// i.e. var moment = require('moment'); // For date handling e.t.c

/**
 * Model Development
 */
'use strict';
module.exports = (sequelize, DataTypes) => {
  var Post = sequelize.define('Post', {
    postTitle: DataTypes.STRING,
    postBody: DataTypes.TEXT,
  });
  
  /**
   * Model Association
   */
  Post.associate = function(models) {
    // assocaiting post with user
    models.Post.belongsTo(models.Module, {
        onDelete: "CASCADE",
        foreignKey: {
          allowNull: false
        }
    });
  };

  return Post;
};
 