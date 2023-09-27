//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _= require("lodash");

const homeStartingContent = "Each new day brings with it a sense of possibility and opportunity.Every day offers a chance to learn something new. Whether it's a new skill, a new piece of knowledge, or a new perspective, continuous learning keeps our minds engaged and growing.The people we connect with on our journey—family, friends, mentors, and even strangers—enrich our lives and provide us with love, support, and companionship.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

var posts=[];

app.get("/posts/:topic",function(req,res){
  // console.log(req.params.topic);
  var k= _.lowerCase(req.params.topic);

  posts.forEach(function(post){
    var stored=_.lowerCase(post.title);
    if(stored === k){
      res.render("post",{pos:post});
    }
  })

  // console.log("not found");
});

app.get("/",function(req,res){
  res.render("home",{
    startingContent:homeStartingContent,
  
    posts:posts
  });

  // console.log(posts);
});

app.get("/about",function(req,res){
  res.render("about",{start:aboutContent});
});

app.get("/contact",function(req,res){
  res.render("contact",{initial:contactContent});
});

app.get("/compose",function(req,res){
  res.render("compose");
});

app.post("/compose",function(req,res){
  
  const post ={
    title: req.body.postTitle,
    content: req.body.postBody
  };

  posts.push(post);
  res.redirect("/");
})














app.listen(3000, function() {
  console.log("Server started on port 3000");
});
