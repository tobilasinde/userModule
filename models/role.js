/**
 * Database role model.
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
  var Role = sequelize.define('Role', {
    name: DataTypes.STRING,
  });
  
  /**
   * Model Association
   */
  Role.associate = function(models) {
    // assocaiting role with user
    models.Role.hasMany(models.Module);
  };

  return Role;
};
 