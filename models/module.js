/**
 * Database user model.
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
 
module.exports = function(sequelize, Sequelize) {

    var Module = sequelize.define('Module', {});
    
    /**
     * Model Association
     */
    Module.associate = function(models) {
        // // assocaiting user with business
        // models.Module.belongsToMany(models.Business,{ 
        //   as: 'businesses', 
        //   through: 'ModuleBusinesses',
        //   foreignKey: 'user_id'
        // });
        // assocaiting user with department
        models.Module.belongsTo(models.Department, {
            onDelete: "CASCADE",
            foreignKey: {
              allowNull: false
            }
        });
        // assocaiting user with profile
        models.Module.belongsTo(models.Profile, {
            onDelete: "CASCADE",
            foreignKey: {
              allowNull: false
            }
        });
        // assocaiting user with role
        models.Module.belongsTo(models.Role, {
            onDelete: "CASCADE",
            foreignKey: {
              allowNull: false
            }
        });
        models.Module.belongsToMany(models.Permission,{ 
          as: 'permissions', 
          through: 'ModulePermissions',
          foreignKey: 'module_id'
        });
        models.Module.belongsTo(models.User, {
          onDelete: "CASCADE",
          foreignKey: {
            allowNull: false
          }
      });
      models.Module.belongsTo(models.Business, {
        onDelete: "CASCADE",
        foreignKey: {
          allowNull: false
        }
    });
        models.Module.hasMany(models.Post);
      };
    return Module;
  
  }
  
  
    