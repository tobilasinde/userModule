var express = require('express');
var router = express.Router();


// Require our controllers.
var profile_controller = require('../controllers/profileController');
var user_controller = require('../controllers/userController');
var department_controller = require('../controllers/departmentController');
var role_controller = require('../controllers/roleController');
var business_controller = require('../controllers/businessController');
var permission_controller = require('../controllers/permissionController');


/// POST ROUTES ///

// GET request for creating a Post. NOTE This must come before routes that display Post (uses id).
router.get('/create', user_controller.user_create_get);

// POST request for creating Post.
router.post('/create', user_controller.user_create_post);

// GET request to delete Post.
router.get('/:user_id/delete', user_controller.user_delete_get);

// GET request to update Post.
router.get('/:user_id/update', user_controller.user_update_get);

// POST request to update Post.
router.post('/:user_id/update', user_controller.user_update_post);

// GET request for one Post.
router.get('/:user_id/details', user_controller.user_detail);

// GET request for list of all Post.
router.get('/', user_controller.user_list);

/// AUTHOR ROUTES ///

// GET request for creating Author. NOTE This must come before route for id (i.e. display profile).
router.get('/profile/create', profile_controller.profile_create_get);

// POST request for creating Author.
router.post('/profile/create', profile_controller.profile_create_post);

// GET request to delete Author.
router.get('/profile/:profile_id/delete', profile_controller.profile_delete_get);

// GET request to update Author.
router.get('/profile/:profile_id/update', profile_controller.profile_update_get);

// POST request to update Author.
router.post('/profile/:profile_id/update', profile_controller.profile_update_post);

// GET request for one Author.
router.get('/profile/:profile_id', profile_controller.profile_detail);

// GET request for list of all Authors.
router.get('/profiles', profile_controller.profile_list);


/// DEPARTMENT ROUTES ///

// GET request for creating a Category. NOTE This must come before route that displays Category (uses id).
router.get('/department/create', department_controller.department_create_get);

// POST request for creating Category.
router.post('/department/create', department_controller.department_create_post);

// GET request to delete Category.
router.get('/department/:department_id/delete', department_controller.department_delete_get);

// GET request to update Category.
router.get('/department/:department_id/update', department_controller.department_update_get);

// POST request to update Category.
router.post('/department/:department_id/update', department_controller.department_update_post);

// GET request for one Category.
router.get('/department/:department_id', department_controller.department_detail);

// GET request for list of all Categories.
router.get('/departments', department_controller.department_list);


/// ROLE ROUTES ///

// GET request for creating Comment. NOTE This must come before route for id (i.e. display role).
router.get('/role/create', role_controller.role_create_get);

// POST request for creating Comment.
router.post('/role/create', role_controller.role_create_post);

// GET request to delete Comment.
router.get('/role/:role_id/delete', role_controller.role_delete_get);

// GET request to update Comment.
router.get('/role/:role_id/update', role_controller.role_update_get);

// POST request to update Comment.
router.post('/role/:role_id/update', role_controller.role_update_post);

// GET request for one Comment.
router.get('/role/:role_id', role_controller.role_detail);

// GET request for list of all Comments.
router.get('/roles', role_controller.role_list);

/// PERMISSION ROUTES ///

// GET request for creating Comment. NOTE This must come before route for id (i.e. display permission).
router.get('/permission/create', permission_controller.permission_create_get);

// POST request for creating Comment.
router.post('/permission/create', permission_controller.permission_create_post);

// GET request to delete Comment.
router.get('/permission/:permission_id/delete', permission_controller.permission_delete_get);

// GET request to update Comment.
router.get('/permission/:permission_id/update', permission_controller.permission_update_get);

// POST request to update Comment.
router.post('/permission/:permission_id/update', permission_controller.permission_update_post);

// GET request for one Comment.
router.get('/permission/:permission_id', permission_controller.permission_detail);

// GET request for list of all Comments.
router.get('/permissions', permission_controller.permission_list);

// GET request for creating Comment. NOTE This must come before route for id (i.e. display business).
router.get('/business/create', business_controller.business_create_get);

// POST request for creating Comment.
router.post('/business/create', business_controller.business_create_post);

// GET request to delete Comment.
router.get('/business/:business_id/delete', business_controller.business_delete_get);

// // POST request to delete Comment
// router.post('/business/:business_id/delete', business_controller.business_delete_post);

// GET request to update Comment.
router.get('/business/:business_id/update', business_controller.business_update_get);

// POST request to update Comment.
router.post('/business/:business_id/update', business_controller.business_update_post);

// GET request for one Comment.
router.get('/business/:business_id', business_controller.business_detail);

// GET request for list of all Comments.
router.get('/businesses', business_controller.business_list);

// export all the router created
module.exports = router;
