var Profile = require('../models/profile');
var models = require('../models');

// Display profile create form on GET.
exports.profile_create_get = function(req, res, next) {
        // create profile GET controller logic here 

        // renders a profile form
        res.render('pages/profile/create', { title: 'Create Profile'});
};

// Handle profile create on POST.
exports.profile_create_post = function(req, res, next) {
        // create profile POST controller logic here
        models.Profile.create({
                name: req.body.name
        }).then(() => {
                // If a profile gets created successfully, we just redirect to profiles list
                // no need to render a page
                res.redirect("/users/profiles");
        })

};

// Display profile delete form on GET.
exports.profile_delete_get = function(req, res, next) {
        // GET logic to delete a profile here
        if (!req.params.profile_id.match(/^[0-9]+$/)) {
                res.render('error')
        }
        else {
                models.Profile.destroy({
                        // find the post_id to delete from database
                        where: {
                                id: req.params.profile_id
                        }
                }).then(function() {
                        // If an post gets deleted successfully, we just redirect to posts list
                        // no need to render a page
                        res.redirect('/users/profiles');
                        console.log("profile deleted successfully");
                });
        }


};

// Display profile update form on GET.
exports.profile_update_get = function(req, res, next) {
        // GET logic to update a profile here
        // Find the post you want to update
        console.log("ID is " + req.params.profile_id);
        if (!req.params.profile_id.match(/^[0-9]+$/)) {
                res.render('error/article_error')
        }
        else {
                models.Profile.findByPk(
                        req.params.profile_id
                ).then(function(profile) {
                        // renders a post form
                        res.render('pages/profile/update', { title: 'Update Profile', profile: profile});
                        console.log("Profile update get successful");
                });
        }

        // renders a profile form

};

// Handle profile update on POST.
exports.profile_update_post = function(req, res, next) {
        // POST logic to update a profile here
        console.log("ID is " + req.params.profile_id);
        models.Profile.update(
                // Values to update
                {
                        name: req.body.name

                }, { // Clause
                        where: {
                                id: req.params.profile_id
                        }
                }
                //   returning: true, where: {id: req.params.post_id} 
        ).then(function() {
                // If an comment gets updated successfully, we just redirect to posts list
                // no need to render a page
                res.redirect("/users/profiles");
                console.log("profile updated successfully");
        });

};

// Display list of all profiles.
exports.profile_list = function(req, res, next) {
        // controller logic to display all profiles
        models.Profile.findAll({
                // include: {
                //         model: models.Article,
                //         as: 'articles',
                //         attributes: ['id', 'article_title']
                // }
        }       
        ).then((profiles) => {
                // renders a profile list page
                res.render('pages/profile/list', { title: 'Profile List', profiles: profiles });
        })
};

// Display detail page for a specific profile.
exports.profile_detail = function(req, res, next) {
        // constroller logic to display a single profile
        if (!req.params.profile_id.match(/^[0-9]+$/)) {
                res.render('error/article_error')
        }
        else {
                models.Profile.findByPk(
                        req.params.profile_id
                ).then((profile) => {
                        // renders an inividual profile details page
                        res.render('pages/profile/detail', { title: 'Profile Details', profile: profile});
                })
        }
};
