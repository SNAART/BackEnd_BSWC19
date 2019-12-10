'use strict';
// loginRoute
const express = require('express');
const router= express.Router();
const passport= require('../utils/pass');
const userModel = require('../models/userModel');
const session = require('express-session');

passport.serializeUser((user, done)=> {
    console.log(user);
	done(null, user.email);
});

passport.deserializeUser((username, done)=> {
	// User.findById(id,  (err, user)=> {
		done(null, {username: username});
	// });
});

router.use(session({ 
	secret: 'keyboard cat', 
	resave: true, 
	saveUninitialized: true 
}));

router.use(passport.initialize());
router.use(passport.session());

router.post('/login', 
    passport.authenticate('local', { failureRedirect: '/login' }),
    async (req, res) => {
        const params= [req.body.username];
        const user= await userModel.getUserLogin(params);
        await res.json(user);
});



module.exports= router;


















// router.get('/', userController.user_list_get);

// router.get('', userController.user_get);
// router.get('/user/:id', (req, res) => {
//     res.send(`You request a user with id ${req.params.id}`);
//   });

// router.post('/user', (req, res) => {
//     res.send('With this endpoint you can get users.');
//   });
// router.put('/user', (req, res) => {
//     res.send('With this endpoint you can edit users.');
//   });
// router.delete('/user', (req, res) => {
//     res.send('With this endpoint you can delete users.');
//   }); 