var Business = require('../models/business');
var models = require('../models');

// Display business create form on GET.
exports.business_create_get = function(req, res, next) {
        // create business GET controller logic here 

        // renders a business form
        res.render('pages/business/create', { title: 'Create Business'});
};

// Handle business create on POST.
exports.business_create_post = function(req, res, next) {
        // create business POST controller logic here
        models.Business.create({
                name: req.body.name
        }).then(() => {
                // If a business gets created successfully, we just redirect to businesses list
                // no need to render a page
                res.redirect("/users/businesses");
        })

};

// Display business delete form on GET.
exports.business_delete_get = function(req, res, next) {
        // GET logic to delete a business here
        if (!req.params.business_id.match(/^[0-9]+$/)) {
                res.render('error')
        }
        else {
                models.Business.destroy({
                        // find the post_id to delete from database
                        where: {
                                id: req.params.business_id
                        }
                }).then(function() {
                        // If an post gets deleted successfully, we just redirect to posts list
                        // no need to render a page
                        res.redirect('/users/businesses');
                        console.log("business deleted successfully");
                });
        }


};

// Display business update form on GET.
exports.business_update_get = function(req, res, next) {
        // GET logic to update a business here
        // Find the post you want to update
        console.log("ID is " + req.params.business_id);
        if (!req.params.business_id.match(/^[0-9]+$/)) {
                res.render('error/article_error')
        }
        else {
                models.Business.findByPk(
                        req.params.business_id
                ).then(function(business) {
                        // renders a post form
                        res.render('pages/business/update', { title: 'Update Business', business: business});
                        console.log("Business update get successful");
                });
        }

        // renders a business form

};

// Handle business update on POST.
exports.business_update_post = function(req, res, next) {
        // POST logic to update a business here
        console.log("ID is " + req.params.business_id);
        models.Business.update(
                // Values to update
                {
                        name: req.body.name

                }, { // Clause
                        where: {
                                id: req.params.business_id
                        }
                }
                //   returning: true, where: {id: req.params.post_id} 
        ).then(function() {
                // If an comment gets updated successfully, we just redirect to posts list
                // no need to render a page
                res.redirect("/users/businesses");
                console.log("business updated successfully");
        });

};

// Display list of all businesses.
exports.business_list = function(req, res, next) {
        // controller logic to display all businesses
        models.Business.findAll({
                // include: {
                //         model: models.Article,
                //         as: 'articles',
                //         attributes: ['id', 'article_title']
                // }
        }
                
        ).then((businesses) => {
                // renders a business list page
                res.render('pages/business/list', { title: 'Business List', businesses: businesses });
        })

};

// Display detail page for a specific business.
exports.business_detail = function(req, res, next) {
        // constroller logic to display a single business
        if (!req.params.business_id.match(/^[0-9]+$/)) {
                res.render('error/article_error')
        }
        else {
                models.Business.findByPk(
                        req.params.business_id
                ).then((business) => {
                        // renders an inividual business details page
                        res.render('pages/business/detail', { title: 'Business Details', business: business});
                })
        }


};
