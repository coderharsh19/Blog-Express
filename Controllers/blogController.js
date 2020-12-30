const express = require("express");
const { create } = require("lodash");
const Blog = require("../models/Blog");


const blogController = {
    homeRoute: (req, res) => {
        if (req.isAuthenticated()) {

            Blog.find({}).populate("user").exec((err, blogs) => {
                if (err) console.log(err)
                // res.json(blogsfound)
                res.render("home", { blogs, user: req.user });
            })
        }
        else {
            req.flash("failure_message", "You need to login to access this page")
            res.redirect("/login")
        }
    },
    myBlogsRoute: (req, res) => {
        if (req.isAuthenticated()) {

            Blog.find({ user: req.user }, (err, blog) => {
                if (err) {
                    console.log(err)
                }
                else {
                    res.render("myBlogs", { blog });
                }
                // res.render("myBlogs", { blog });
            })


            // res.render("myBlogs", { blog });
        }
        else {
            req.flash("failure_message", "You need to login to access this page")
            res.redirect("/login")
        }
    },
    getPostRoute: (req, res) => {
        if (req.isAuthenticated()) {
            res.render("createPost");
        }
        else {
            req.flash("failure_message", "You need to login to access this page")
            res.redirect("/login")
        }
    },
    createPostRoute: (req, res) => {
        if (req.isAuthenticated()) {
            const blog = new Blog({
                blogTitle: req.body.blogTitle,
                blogContent: req.body.blogContent,
                user: req.user.id
            })

            // req.user.blogs.push(blog);
            blog.save(function (err, blog) {
                if (err) console.log(err)
                else {

                    /// if blog found
                    // req.flash("success_message", "You are now registred, login to continue")
                    res.redirect("/home");
                }
            })

        }
        else {
            req.flash("failure_message", "You need to login to access this page")
            res.redirect("/login")
        }
    },
    blogPageRoute: (req, res) => {
        if (req.isAuthenticated()) {
            const requestedBlog = req.params.slug;

            Blog.findOne({ slug: requestedBlog }, (err, blog) => {
                if (err) {
                    console.log(err)
                    res.render("404")
                }
                else {
                    res.render("singleBlog", { blog })
                }
            })
        }
        else {
            req.flash("failure_message", "You need to login to access this page")
            res.redirect("/login")
        }


    },
    deleteBlog: (req, res) => {
        if (req.isAuthenticated()) {
            Blog.findByIdAndDelete(req.params.id, (err, deleted) => {
                if (err) {
                    console.log(err)
                }
                else {
                    console.log("Blog deleted")
                    res.redirect("/myBlogs");
                }
            });
        }
        else {
            req.flash("failure_message", "You need to login to access this page")
            res.redirect("/login")
        }



    },
    getEditBlogRoute: (req, res) => {
        if (req.isAuthenticated()) {
            Blog.findById(req.params.id, (err, blog) => {
                if (err) {
                    console.log(err)
                }
                else {
                    res.render('editBlog', { blog })
                }
            })

        }
        else {
            req.flash("failure_message", "You need to login to access this page")
            res.redirect("/login")
        }


    },
    postEditBlogRoute: (req, res) => {
        if (req.isAuthenticated()) {
            Blog.findByIdAndUpdate(req.params.id, { blogTitle: req.body.blogTitle, blogContent: req.body.blogContent }, (err, updatedDocs) => {
                if (err) console.log(err)
                else {
                    res.redirect("/myBlogs")
                }
            })
        }
        else {
            req.flash("failure_message", "You need to login to access this page")
            res.redirect("/login")
        }

    }
}

module.exports = blogController;