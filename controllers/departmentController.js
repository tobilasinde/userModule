var Department = require('../models/department');
var models = require('../models');

// Display department create form on GET.
exports.department_create_get = function(req, res, next) {
        // create department GET controller logic here 

        // renders a department form
        res.render('pages/department/create', { title: 'Create Department'});
};

// Handle department create on POST.
exports.department_create_post = function(req, res, next) {
        // create department POST controller logic here
        models.Department.create({
                name: req.body.name
        }).then(() => {
                // If a department gets created successfully, we just redirect to departments list
                // no need to render a page
                res.redirect("/users/departments");
        })

};

// Display department delete form on GET.
exports.department_delete_get = function(req, res, next) {
        // GET logic to delete a department here
        if (!req.params.department_id.match(/^[0-9]+$/)) {
                res.render('error')
        }
        else {
                models.Department.destroy({
                        // find the post_id to delete from database
                        where: {
                                id: req.params.department_id
                        }
                }).then(function() {
                        // If an post gets deleted successfully, we just redirect to posts list
                        // no need to render a page
                        res.redirect('/users/departments');
                        console.log("department deleted successfully");
                });
        }


};

// Display department update form on GET.
exports.department_update_get = function(req, res, next) {
        // GET logic to update a department here
        // Find the post you want to update
        console.log("ID is " + req.params.department_id);
        if (!req.params.department_id.match(/^[0-9]+$/)) {
                res.render('error/article_error')
        }
        else {
                models.Department.findByPk(
                        req.params.department_id
                ).then(function(department) {
                        // renders a post form
                        res.render('pages/department/update', { title: 'Update Department', department: department});
                        console.log("Department update get successful");
                });
        }

        // renders a department form

};

// Handle department update on POST.
exports.department_update_post = function(req, res, next) {
        // POST logic to update a department here
        console.log("ID is " + req.params.department_id);
        models.Department.update(
                // Values to update
                {
                        name: req.body.name

                }, { // Clause
                        where: {
                                id: req.params.department_id
                        }
                }
                //   returning: true, where: {id: req.params.post_id} 
        ).then(function() {
                // If an comment gets updated successfully, we just redirect to posts list
                // no need to render a page
                res.redirect("/users/departments");
                console.log("department updated successfully");
        });

};

// Display list of all departments.
exports.department_list = function(req, res, next) {
        // controller logic to display all departments
        models.Department.findAll({
                // include: {
                //         model: models.Article,
                //         as: 'articles',
                //         attributes: ['id', 'article_title']
                // }
        }       
        ).then((departments) => {
                // renders a department list page
                res.render('pages/department/list', { title: 'Department List', departments: departments });
        })
};

// Display detail page for a specific department.
exports.department_detail = function(req, res, next) {
        // constroller logic to display a single department
        if (!req.params.department_id.match(/^[0-9]+$/)) {
                res.render('error/article_error')
        }
        else {
                models.Department.findByPk(
                        req.params.department_id
                ).then((department) => {
                        // renders an inividual department details page
                        res.render('pages/department/detail', { title: 'Department Details', department: department});
                })
        }
};
