/**
 * Database department model.
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
  var Department = sequelize.define('Department', {
    name: DataTypes.STRING,
  });
  
  /**
   * Model Association
   */
  Department.associate = function(models) {
    // assocaiting department with user
    models.Department.hasMany(models.Module);
  };

  return Department;
};
 