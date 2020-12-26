const express = require("express");
let _ = require("lodash");
const blogController = require("../Controllers/blogController");



const router = express.Router();

router.get("/home", blogController.homeRoute);


router.get("/myBlogs", blogController.myBlogsRoute);

router.get("/createPost", blogController.getPostRoute);

router.post("/createPost", blogController.createPostRoute);

router.get("/blogs/:slug", blogController.blogPageRoute);

router.post("/blogs/delete/:id", blogController.deleteBlog);

router.get("/blogs/edit/:id", blogController.getEditBlogRoute);

router.post("/blogs/edit/:id", blogController.postEditBlogRoute);



module.exports = router;





