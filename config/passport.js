const localStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs")
const User = require("../models/user_data")

module.exports = function (passport) {

    passport.use(
        new localStrategy({ usernameField: "email" }, (email, password, done) => {
            //// Match user
            User.findOne({ email: email })
                .then(user => {
                    if (!user) {
                        return done(null, false, { message: "That email is not registred" })
                    }
                    // Match password
                    bcrypt.compare(password, user.password, (err, isVerified) => {
                        if (err) throw err;
                        if (isVerified) {
                            return done(null, user)
                        }
                        else {
                            return done(null, false, { message: "User password is incorrect" })
                        }

                    })
                })
                .catch(err => console.log(err))

        })
    )

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });


}
