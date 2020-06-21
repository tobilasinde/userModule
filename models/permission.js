/**
 * Database permission model.
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
  var Permission = sequelize.define('Permission', {
    name: DataTypes.STRING,
  });
  
  /**
   * Model Association
   */
  Permission.associate = function(models) {
    // assocaiting permission with user
    models.Permission.belongsToMany(models.Module,{ 
      as: 'modules', 
      through: 'ModulePermissions',
      foreignKey: 'permission_id'
    });
    // models.Permission.hasMany(models.Module);
  };

  return Permission;
};
 