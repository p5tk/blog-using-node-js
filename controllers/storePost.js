const BlogPost = require("../models/BlogPost");
const path = require("path");

module.exports = (req, res) => {
    let image = req.files.image;
    let uploadPath = __dirname + '/../public/img/' + image.name;
    image.mv(uploadPath, async(err) => {
        if(err){
            console.log(err);
        }

        await BlogPost.create({
            ...req.body,
            image : "/img/" + image.name
        });
        res.redirect("/");
    });
};