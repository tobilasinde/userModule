var Role = require('../models/role');
var models = require('../models');

// Display role create form on GET.
exports.role_create_get = function(req, res, next) {
        // create role GET controller logic here 

        // renders a role form
        res.render('pages/role/create', { title: 'Create Role'});
};

// Handle role create on POST.
exports.role_create_post = function(req, res, next) {
        // create role POST controller logic here
        models.Role.create({
                name: req.body.name
        }).then(() => {
                // If a role gets created successfully, we just redirect to roles list
                // no need to render a page
                res.redirect("/users/roles");
        })

};

// Display role delete form on GET.
exports.role_delete_get = function(req, res, next) {
        // GET logic to delete a role here
        if (!req.params.role_id.match(/^[0-9]+$/)) {
                res.render('error')
        }
        else {
                models.Role.destroy({
                        // find the post_id to delete from database
                        where: {
                                id: req.params.role_id
                        }
                }).then(function() {
                        // If an post gets deleted successfully, we just redirect to posts list
                        // no need to render a page
                        res.redirect('/users/roles');
                        console.log("role deleted successfully");
                });
        }


};

// Display role update form on GET.
exports.role_update_get = function(req, res, next) {
        // GET logic to update a role here
        // Find the post you want to update
        console.log("ID is " + req.params.role_id);
        if (!req.params.role_id.match(/^[0-9]+$/)) {
                res.render('error/article_error')
        }
        else {
                models.Role.findByPk(
                        req.params.role_id
                ).then(function(role) {
                        // renders a post form
                        res.render('pages/role/update', { title: 'Update Role', role: role});
                        console.log("Role update get successful");
                });
        }

        // renders a role form

};

// Handle role update on POST.
exports.role_update_post = function(req, res, next) {
        // POST logic to update a role here
        console.log("ID is " + req.params.role_id);
        models.Role.update(
                // Values to update
                {
                        name: req.body.name

                }, { // Clause
                        where: {
                                id: req.params.role_id
                        }
                }
                //   returning: true, where: {id: req.params.post_id} 
        ).then(function() {
                // If an comment gets updated successfully, we just redirect to posts list
                // no need to render a page
                res.redirect("/users/roles");
                console.log("role updated successfully");
        });

};

// Display list of all roles.
exports.role_list = function(req, res, next) {
        // controller logic to display all roles
        models.Role.findAll({
        }       
        ).then((roles) => {
                // renders a role list page
                res.render('pages/role/list', { title: 'Role List', roles: roles });
        })
};

// Display detail page for a specific role.
exports.role_detail = function(req, res, next) {
        // constroller logic to display a single role
        if (!req.params.role_id.match(/^[0-9]+$/)) {
                res.render('error/article_error')
        }
        else {
                models.Role.findByPk(
                        req.params.role_id
                ).then((role) => {
                        // renders an inividual role details page
                        res.render('pages/role/detail', { title: 'Role Details', role: role});
                })
        }
};
