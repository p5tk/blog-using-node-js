const express = require("express");
const ejs = require("ejs");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const newPostController = require("./controllers/newPost");
const aboutController = require("./controllers/about");
const contactController = require("./controllers/contact");
const postController = require("./controllers/post");
const homeController = require("./controllers/home");
const getPostController = require("./controllers/getPost");
const storePostController = require("./controllers/storePost");
const validateMiddleWare = require("./middleware/validationMiddleware");

const app = express();
app.use(express.static("public"));

app.set("view engine", "ejs");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));
app.use(fileUpload());



app.use("/posts/store", validateMiddleWare);
app.get("/posts/new", newPostController);
app.get("/about", aboutController);
app.get("/contact", contactController);
app.get("/post", postController);
app.get("/", homeController);
app.get("/post/:id", getPostController);
app.post("/posts/store", storePostController);

mongoose.connect("mongodb://localhost/my_database", {useNewUrlParser: true});


app.listen(3000, () => {
    console.log("App is running on port 3000");
})