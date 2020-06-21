var express = require('express');
var router = express.Router();


// Require our controllers.
var post_controller = require('../controllers/postController');


/// POST ROUTES ///

// GET request for creating a Post. NOTE This must come before routes that display Post (uses id).
router.get('/create', post_controller.post_create_get);

// POST request for creating Post.
router.post('/create', post_controller.post_create_post);

// GET request to delete Post.
router.get('/:post_id/delete', post_controller.post_delete_get);

// GET request to update Post.
router.get('/:post_id/update', post_controller.post_update_get);

// POST request to update Post.
router.post('/:post_id/update', post_controller.post_update_post);

// GET request for one Post.
router.get('/:post_id/details', post_controller.post_detail);

// GET request for one Post.
router.get('/:user_id', post_controller.post_by_user);

// GET request for one Post.
router.get('/:user_id/:department_id', post_controller.post_by_user_department);

// GET request for one Post.
router.get('/:user_id/:department_id/:profile_id', post_controller.post_by_user_department_profile);

// GET request for one Post.
// router.get('/:user_id/:business_id/', post_controller.post_by_user_business);
//still can't get this to work because it's conflicting with post_by_user_department

// GET request for list of all Post.
router.get('/', post_controller.post_list);

// export all the router created
module.exports = router;
