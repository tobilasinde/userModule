var Permission = require('../models/permission');
var models = require('../models');

// Display permission create form on GET.
exports.permission_create_get = function(req, res, next) {
        // create permission GET controller logic here 

        // renders a permission form
        res.render('pages/permission/create', { title: 'Create Permission'});
};

// Handle permission create on POST.
exports.permission_create_post = function(req, res, next) {
        // create permission POST controller logic here
        models.Permission.create({
                name: req.body.name
        }).then(() => {
                // If a permission gets created successfully, we just redirect to permissions list
                // no need to render a page
                res.redirect("/users/permissions");
        })

};

// Display permission delete form on GET.
exports.permission_delete_get = function(req, res, next) {
        // GET logic to delete a permission here
        if (!req.params.permission_id.match(/^[0-9]+$/)) {
                res.render('error')
        }
        else {
                models.Permission.destroy({
                        // find the post_id to delete from database
                        where: {
                                id: req.params.permission_id
                        }
                }).then(function() {
                        // If an post gets deleted successfully, we just redirect to posts list
                        // no need to render a page
                        res.redirect('/users/permissions');
                        console.log("permission deleted successfully");
                });
        }


};

// Display permission update form on GET.
exports.permission_update_get = function(req, res, next) {
        // GET logic to update a permission here
        // Find the post you want to update
        console.log("ID is " + req.params.permission_id);
        if (!req.params.permission_id.match(/^[0-9]+$/)) {
                res.render('error/article_error')
        }
        else {
                models.Permission.findByPk(
                        req.params.permission_id
                ).then(function(permission) {
                        // renders a post form
                        res.render('pages/permission/update', { title: 'Update Permission', permission: permission});
                        console.log("Permission update get successful");
                });
        }

        // renders a permission form

};

// Handle permission update on POST.
exports.permission_update_post = function(req, res, next) {
        // POST logic to update a permission here
        console.log("ID is " + req.params.permission_id);
        models.Permission.update(
                // Values to update
                {
                        name: req.body.name

                }, { // Clause
                        where: {
                                id: req.params.permission_id
                        }
                }
                //   returning: true, where: {id: req.params.post_id} 
        ).then(function() {
                // If an comment gets updated successfully, we just redirect to posts list
                // no need to render a page
                res.redirect("/users/permissions");
                console.log("permission updated successfully");
        });

};

// Display list of all permissions.
exports.permission_list = function(req, res, next) {
        // controller logic to display all permissions
        models.Permission.findAll({
        }       
        ).then((permissions) => {
                // renders a permission list page
                res.render('pages/permission/list', { title: 'Permission List', permissions: permissions });
        })
};

// Display detail page for a specific permission.
exports.permission_detail = function(req, res, next) {
        // constroller logic to display a single permission
        if (!req.params.permission_id.match(/^[0-9]+$/)) {
                res.render('error/article_error')
        }
        else {
                models.Permission.findByPk(
                        req.params.permission_id
                ).then((permission) => {
                        // renders an inividual permission details page
                        res.render('pages/permission/detail', { title: 'Permission Details', permission: permission});
                })
        }
};
