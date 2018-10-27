const express = require('express');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const router = express.Router();

const User = require("../models/user");

// login user
// :/api/user/login
router.post("/login", (req, res, next) => {
    console.log('/api/user/login');
    console.log(req.body.email);
    // validate credentials
    // if email exists
    let fetchedUser;
    User.findOne({
        email: req.body.email
    })
        .then(user => {
            // user exists, email exists
            if(!user){
                // user does not exist
                // console.log('User email does not exist');
                return res.status(401).json({
                    message: "Auth Failed! No Email exists!"
                })
            }
            // user was found
            // compare the passwords
            fetchedUser = user;
            return bcrypt.compare(req.body.password, user.password);
            
            
        })
        .then(result => {
            // console.log(result);
            // console.log(user);
            // true if they are the same passws
            if(!result) {
                // passwords dont match
                console.log('Password mismatch');
                return res.status(401).json({
                    message: "Auth Failed! Password Mismatch"
                });
            }
            // we have valid password
            // give them a valid json token
            const token = jwt.sign({
                email: fetchedUser.email,
                userId: fetchedUser._id,
            }, "kitt kats make me walk like im listening to bass music bro", {
                expiresIn: "1h"
            });

            console.log("Result from attempt at login:");
            console.log(fetchedUser);

            res.status(200).json({
                token: token,
                expiresIn: 3600,
                userId: fetchedUser._id,
                firstName: fetchedUser.firstname,
                lastName: fetchedUser.lastname,
                email: fetchedUser.email,
                studentID: fetchedUser.studentID,
                phone: fetchedUser.phone,
                userLevel: fetchedUser.userLevel,
                message: "User Auth Successful!"
            })
        })
        .catch(err => {
            // catch any errors
            console.log(err);
            console.log('final catch');
            return res.status(401).json({
                message: "Auth Failed! No User Email Found"
            });
        });
});

// create new user
router.post("/signup", (req, res, next) => {
    // create new user and store to database

    console.log("create user data");
    console.log(req.body);

    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
                firstname: req.body.firstName,
                lastname: req.body.lastName,
                email: req.body.email,
                password: hash,
                studentID: req.body.studentID,
                phone: req.body.phone,
                userLevel: req.body.userLevel
            });
            user.save()
                .then(result => {
                    console.log("created new user successfully");
                    res.status(201).json({
                        message: "User Created Successfull!",
                        result: result
                    });
                })
                .catch(err => {
                    console.log("new user create failed");
                    res.status(500).json({message: "User Email Alread Exists"})
                });
        })
    
    


}) 





module.exports = router;