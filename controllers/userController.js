var models = require('../models');
// Display user create form on GET.
exports.user_create_get = async function(req, res, next) {

	const profile = await models.Profile.findAll();
	const department = await models.Department.findAll();
	const role = await models.Role.findAll();
    const business = await models.Business.findAll();
    const permission = await models.Permission.findAll();
    res.render('pages/user/create', { title: 'Create User', permissions: permission, profiles: profile, departments: department, roles: role, businesses: business});
    console.log("Users form renders successfully");
};

// Handle post create on POST.
exports.user_create_post = async function(req, res, next) {
 try {
     var email = await models.User.findOne({where: {
         email: req.body.email
     }});
     if (!email) {
        const user = await models.User.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        userName: req.body.userName,
        email: req.body.email,
        currentBusinessId: req.body.CurrentBusinessId
        });
    // creating module
     const module = await models.Module.create({
        UserId: user.id,
        RoleId: req.body.roleId,
        DepartmentId: req.body.departmentId,
        BusinessId: req.body.currentBusinessId,
        ProfileId: req.body.profileId
     });
     console.log("I am here");
     let permissionList = req.body.permissions;
     if (permissionList) {
         if(permissionList.length === 1) {
             const permission = await models.Permission.findByPk(permissionList);
             if (!permission) {
                 await models.Module.destroy({where: {id: module.id}});
                 await models.User.destroy({where: {id: user.id}});
                 return res.status(422).json({status: false, error: 'Cannot find that selected permission'});
             }
             console.log("adding it now");
             await module.addPermission(permission);
         } else {
             if (typeof permissionList === 'object') {
                 await permissionList.forEach(async (id) => {
                     const permission = await models.Permission.findByPk(id);
                     if (!permission) {
                        await models.Module.destroy({where: {id: module.id}});
                        await models.User.destroy({where: {id: user.id}});
                        return res.status(422).json({status: false, error: 'Cannot find that selected permission'});
                    }
                    await module.addPermission(permission);
                 });
             }
         }
     }
     } else {
        var currentBusiness = await models.Module.findOne({where: {
            UserId: email.id,
            BusinessId: req.body.currentBusinessId
        }});
        if (!currentBusiness){
            const user = await models.User.update({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                userName: req.body.userName,
             },{
                 where: {
                     email: req.body.email
                 }
             });
             console.log("the Id for this User: "+email.id);
             const module = await models.Module.create({
                UserId: email.id,
                RoleId: req.body.roleId,
                DepartmentId: req.body.departmentId,
                BusinessId: req.body.currentBusinessId,
                ProfileId: req.body.profileId
            });
            let permissionList = req.body.permissions;
            if (permissionList) {
                if(permissionList.length === 1) {
                    const permission = await models.Permission.findByPk(permissionList);
                    if (!permission) {
                        models.Module.destroy({where: {id: module.id}});
                        return res.status(422).json({status: false, error: 'Cannot find that selected permission'});
                    }
                    await module.addPermission(permission);
                } else {
                    if (typeof permissionList === 'object') {
                        await permissionList.forEach(async (id) => {
                            const permission = await models.Permission.findByPk(id);
                            if (!permission) {
                                const oldPermissions = await module.getPermissions();
                                if (oldPermissions){
                                    await module.removePermissions(oldPermissions);
                                }
                                model.Module.destroy({where: {id: module.id}});
                                model.User.destroy({where: {id: user.id}});
                                return res.status(422).json({status: false, error: 'Cannot find that selected permission'});
                            }
                            await module.addPermission(permission);
                        });
                    }
                }
            }
        } 
        else {
            const user = await models.User.update({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                userName: req.body.userName,
             },{
                 where: {
                     email: req.body.email
                 }
             });
             const module = await models.Module.update({
                 RoleId: req.body.roleId,
                 DepartmentId: req.body.departmentId,
                 ProfileId: req.body.profileId
             },{
                 where: {
                     id: currentBusiness.id
                 }
             });
             let permissionList = req.body.permissions;
             const oldPermissions = await module.getPermissions();
             await module.removePermissions(oldPermissions);
             if (permissionList) {
                 if(permissionList.length === 1) {
                     const permission = await models.Permission.findByPk(permissionList);
                     if (!permission) {
                         return res.status(422).json({status: false, error: 'Cannot find that selected permission'});
                     }
                     await module.addPermission(permission);
                 } else {
                     if (typeof permissionList === 'object') {
                         await permissionList.forEach(async (id) => {
                             const permission = await models.Permission.findByPk(id);
                             if (!permission) {
                                return res.status(422).json({status: false, error: 'Cannot find that selected permission'});
                            }
                            await module.addPermission(permission);
                         });
                     }
                 }
             }
        }
     }
     console.log("finished and rendering");
     res.redirect('/users');
    //  console.log(categoryList.name);
 } catch(e) {
     console.log(e);
     res.send(e);
     
 }
    
};

// Display post delete form on GET.
exports.user_delete_get = async function(req, res, next) {
    
    try {
    const user = await models.Module.destroy({
        where: {
            UserId: req.params.user_id
        }
    });
    
    if (!req.params.user_id.match(/^[0-9]+$/)) {
        res.render('error')
    }
    else {
        models.User.destroy({
            // find the post_id to delete from database
            where: {
                id: req.params.user_id
            }
        }).then(function() {
            // If an post gets deleted successfully, we just redirect to posts list
            // no need to render a page
            
            res.redirect('/users');
            console.log("Post deleted successfully");
        });
    }
    } catch(e) {
        
    }

};

// Display post update form on GET.
exports.user_update_get = function(req, res, next) {
    // Find the post you want to update
    console.log("ID is " + req.params.user_id);
    if (!req.params.user_id.match(/^[0-9]+$/)) {
        res.render('error')
    }
    else {

        models.User.findByPk(
            req.params.user_id
        ).then(function(user) {
            // renders a post form
            res.render('pages/user/update', { title: 'Update User', user: user});
            console.log("User update get successful");
        });
    }


};

// Handle post update on POST.
exports.user_update_post = function(req, res, next) {
    console.log("ID is " + req.params.user_id);


    models.User.update(
        // Values to update
        {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            userName: req.body.userName,
            email: req.body.email
        }, { // Clause
            where: {
                id: req.params.user_id
            }
        }
        //   returning: true, where: {id: req.params.post_id} 
    ).then(function() {
        // If an post gets updated successfully, we just redirect to posts list
        // no need to render a page
        res.redirect("/users");
        console.log("user updated successfully");
    });


};
 
// Display detail page for a specific post.
exports.user_detail = async function(req, res, next) {
    if (!req.params.user_id.match(/^[0-9]+$/)) {
        res.render('error')
    }
    else {
        var user = await models.User.findByPk(req.params.user_id);
        var modules = await models.Module.findAll({
            where: {
                UserId: req.params.user_id,
            },
            include: [{
                model: models.User
            },
            {
                model: models.Role
            },
            {
                model: models.Department
            },
            {
                model: models.Profile
            },
            {
                model: models.Business
            }
        ]
        });
        res.render('pages/user/detail', { title: 'User Details', user: user, modules: modules});
        console.log("User details renders successfully");
    }
};


// Display list of all posts.
exports.user_list = function(req, res, next) {
    models.User.findAll().then(function(users) {
        console.log(users);
        // console.log(users.Author(1).username);
        // renders a post list page
        console.log("rendering post list");
        res.render('pages/user/list', { title: 'Users List', users: users, layout: 'layouts/list' });
        console.log("Users list renders successfully");
    });

};
