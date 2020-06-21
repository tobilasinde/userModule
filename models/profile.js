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
  var Profile = sequelize.define('Profile', {
    name: DataTypes.STRING,
  });
  
  /**
   * Model Association
   */
  Profile.associate = function(models) {
    // assocaiting profile with user
    models.Profile.hasMany(models.Module);
  };

  return Profile;
};
 