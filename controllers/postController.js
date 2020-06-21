var models = require('../models');

// Display post create form on GET.
exports.post_create_get = async function(req, res, next) {
    var users = await models.User.findAll();
    var businesses = await models.Business.findAll();
    res.render('pages/post/create', { title: 'Create Post', users: users, businesses: businesses });
    console.log("Post form renders successfully");
};

// Handle post create on POST.
exports.post_create_post = async function(req, res, next) {
 try {
     var modules = await models.Module.findOne({where: {
         UserId: req.body.UserId,
         BusinessId: req.body.BusinessId
     }});
    models.Post.create({
        postTitle: req.body.postTitle,
        postBody: req.body.postBody,
        ModuleId: modules.id
    }).then(function(){
        res.redirect('/posts');
    });
 } catch(e) {
     res.send(e)
 }
};

// Display post delete form on GET.
exports.post_delete_get = async function(req, res, next) {
    
    try {
    if (!req.params.post_id.match(/^[0-9]+$/)) {
        res.render('error')
    }
    else {
        models.Post.destroy({
            // find the post_id to delete from database
            where: {
                id: req.params.post_id
            }
        }).then(function() {
            // If an post gets deleted successfully, we just redirect to posts list
            // no need to render a page
            
            res.redirect('/posts');
            console.log("Post deleted successfully");
        });
    }
    } catch(e) {
        res.send(e);
    }

};

// Display post update form on GET.
exports.post_update_get = function(req, res, next) {
    // Find the post you want to update
    console.log("ID is " + req.params.post_id);
    if (!req.params.post_id.match(/^[0-9]+$/)) {
        res.render('error')
    }
    else {

        models.Post.findByPk(
            req.params.post_id
        ).then(function(post) {
            // renders a post form
            res.render('pages/post/update', { title: 'Update Post', post: post, layout: 'layouts/detail' });
            console.log("Post update get successful");
        });
    }


};

// Handle post update on POST.
exports.post_update_post = function(req, res, next) {
    console.log("ID is " + req.params.post_id);


    models.Post.update(
        // Values to update
        {
            post_title: req.body.postTitle,
            post_body: req.body.postBody
        }, { // Clause
            where: {
                id: req.params.post_id
            }
        }
        //   returning: true, where: {id: req.params.post_id} 
    ).then(function() {
        // If an post gets updated successfully, we just redirect to posts list
        // no need to render a page
        res.redirect("/blog/posts");
        console.log("post updated successfully");
    });


};

// Display detail page for a specific post.
exports.post_detail = function(req, res, next) {
    if (!req.params.post_id.match(/^[0-9]+$/)) {
        res.render('error/post_error')
    }
    else {
        models.Post.findByPk(
            req.params.post_id,
            
        ).then(function(post) {
            // console.log(post);
            // console.log("This is the post user's firstname " + post.User.first_name);
            // console.log("This is the post comments" + post.Comments[0].title);
            // renders an inividual post details page
            res.render('pages/post/detail', { title: 'Post Details', post: post });
            console.log("Post deteials renders successfully");
        });
    }

};


// Display list of all posts.
exports.post_list = function(req, res, next) {

    models.Post.findAll().then(function(posts) {
            console.log(posts);
            // console.log(posts.User(1).username);
        // renders a post list page
        console.log("rendering post list");
        res.render('pages/post/list', { title: 'Post List', posts: posts });
        console.log("Posts list renders successfully");
    });

};

exports.post_by_user = async function(req, res, next) {
        models.Post.findAll({
            include: [{
                model: models.Module,
                where: {
                    UserId: req.params.user_id
                }
            }]
        }).then(function(posts) {
                console.log(posts);
                // console.log(posts.User(1).username);
            // renders a post list page
            console.log("rendering post list");
            res.render('pages/post/list', { title: 'Post List By User', posts: posts });
            console.log("Posts list renders successfully");
        });
    
    };
exports.post_by_user_department = async function(req, res, next) {
        models.Post.findAll({
            include: [{
                model: models.Module,
                where: {
                    UserId: req.params.user_id,
                    DepartmentId: req.params.department_id
                }
            }]
        }).then(function(posts) {
                console.log(posts);
                // console.log(posts.User(1).username);
            // renders a post list page
            console.log("rendering post list");
            res.render('pages/post/list', { title: 'Post List By User and Department', posts: posts });
            console.log("Posts list renders successfully");
        });
    
    };
exports.post_by_user_department_profile = async function(req, res, next) {
    models.Post.findAll({
        include: [{
            model: models.Module,
            where: {
                UserId: req.params.user_id,
                DepartmentId: req.params.department_id,
                ProfileId: req.params.profile_id
            }
        }]
    }).then(function(posts) {
            console.log(posts);
            // console.log(posts.User(1).username);
        // renders a post list page
        console.log("rendering post list");
        res.render('pages/post/list', { title: 'Post List By User, Department and Profile', posts: posts });
        console.log("Posts list renders successfully");
    });

};    
exports.post_by_user_business = async function(req, res, next) {
    console.log(req.params.user_id);
    models.Post.findAll({
        include: [{
            model: models.Module,
            where: {
                UserId: req.params.user_id,
                BusinessId: req.params.business_id
            }
        }]
    }).then(function(posts) {
            console.log(posts);
            // console.log(posts.User(1).username);
        // renders a post list page
        console.log("rendering post list");
        res.render('pages/post/list', { title: 'Post List By User and Business', posts: posts });
        console.log("Posts list renders successfully");
    });

};    