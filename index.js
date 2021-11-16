const express = require("express");
const ejs = require("ejs");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const BlogPost = require("./models/BlogPost");

const app = express();
app.use(express.static("public"));

app.set("view engine", "ejs");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

mongoose.connect("mongodb://localhost/my_database", {useNewUrlParser: true});

app.get("/", async(req, res) => {
    const blogposts = await BlogPost.find({});
    console.log(blogposts);
    res.render("index", {blogposts: blogposts} );
});

app.get("/about", (req, res) => {
    res.render("about");
});

app.get("/contact", (req, res) => {
    res.render("contact");
});

app.get("/post", (req, res) => {
    res.render("post");
});

app.get("/posts/new", (req, res) => {
    res.render("create");
});

app.post("/posts/store", async(req, res) => {
    await BlogPost.create(req.body)
    res.redirect("/");
});


app.listen(3000, () => {
    console.log("App is running on port 3000");
})