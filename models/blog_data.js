const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const slugify = require("slugify");

//////////////  Blog Schema/////////////////////////
const blogSchema = new mongoose.Schema({
  blogTitle: {
    type: String,
    required: true,
  },
  blogContent: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  user: {
    type: ObjectId,
    ref: "UserData"
  }
});

////  Slugify title
blogSchema.pre("validate", function (next) {
  if (this.blogTitle) {
    this.slug = slugify(this.blogTitle, { lower: true, strict: true });
  }
  next();
});

const Blog = mongoose.model("BlogData", blogSchema);

module.exports = Blog;
