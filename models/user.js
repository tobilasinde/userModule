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

  var User = sequelize.define('User', {
      firstName: {
          type: Sequelize.STRING,
          allowNull: true
      },

      lastName: {
          type: Sequelize.STRING,
          allowNull: true
      },

      userName: {
          type: Sequelize.TEXT,
          allowNull: false,
          validate: {
            len: [4, 50] // must be between 8 and 50.
          }
      },
      
      email: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true,
          validate: {
              isEmail: true
          }
      },

      password: {
          type: Sequelize.STRING,
          // allowNull: false
      },

      last_login: {
          type: Sequelize.DATE
      },

      status: {
          type: Sequelize.ENUM('active', 'inactive'),
          defaultValue: 'active'
      },
      
      // you can also write in a single line without issues
      name:{type: Sequelize.STRING, unique: false},
      module_name: {type: Sequelize.STRING},
      module_id : {type: Sequelize.INTEGER},
      account_id : {type: Sequelize.STRING},
      permission : {type: Sequelize.STRING},
      currentBusinessId: {type: Sequelize.INTEGER}

  });
  
  /**
   * Model Association
   */
  User.associate = function(models) {
      models.User.hasMany(models.Module);
    };
  return User;

}


  