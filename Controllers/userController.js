const express = require("express");
// const mongoose = require("mongoose");
const User = require("../models/user_data");
const passport = require("passport");
const bcrypt = require("bcryptjs")



const userController = {
    createUser: async (req, res) => {

        const email = req.body.email
        const fullName = req.body.fullName
        const password = req.body.password
        const confirmPassword = req.body.confirmPassword

        let errors = []

        if (!email || !fullName || !password || !confirmPassword) {
            console.log("Please fill all the input fields")
            errors.push({ msg: "Please enter all the fields" })
        }
        if (password != confirmPassword) {
            console.log("Passwords don't match")
            errors.push({ msg: "Password and confirmPassword didn't match" })
        }
        if (errors.length > 0) {
            res.render('register', {
                errors,
                email,
                fullName,
                password,
                confirmPassword
            });
            console.log(errors);
        }
        else {
            try {
                const foundUser = await User.findOne({ email: email })
                if (foundUser) {
                    console.log("User with same email already exists");
                    errors.push({ msg: "User with same email id already registered" })
                    // res.redirect("/register");
                    res.render('register', {
                        errors,
                        email,
                        fullName,
                        password,
                        confirmPassword
                    });
                } else {
                    let newUser = new User({
                        name: fullName,
                        email: email,
                        password: password
                    })


                    bcrypt.genSalt(10, (err, salt) => {
                        if (err) console.log(err)
                        bcrypt.hash(newUser.password, salt, function (err, hash) {
                            // Store hash in your password DB.
                            if (err) console.log(err)
                            newUser.password = hash;
                            newUser.save(function (err, user) {
                                if (err) console.log(err)
                                else {
                                    /// if user found
                                    req.flash("success_message", "You are now registred, login to continue")
                                    res.redirect("/login");
                                }
                            })

                        });
                    });

                }
            } catch (err) {
                console.log("Error: ", err.message)
            }
        }

    },

    loginUser: (req, res, next) => {
        passport.authenticate('local', {
            successRedirect: '/home',
            failureRedirect: '/login',
            failureFlash: true
        })(req, res, next);

    },
    logout: (req, res) => {
        req.logout();
        req.flash("success_message", "You have successfully logged out");
        res.redirect('/login');
    }
}


module.exports = userController;