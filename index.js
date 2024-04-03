import express from "express";
import bodyParser from "body-parser";
import { v4 as uuidv4 } from 'uuid'; //for giving unique id for each post


const app = express();
const port = 3000;

// An array to store blog posts
let posts = [];

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs", {posts: posts});
});

app.get("/compose", (req, res) => {
  res.render("compose.ejs");
});

app.post("/compose", (req, res) => {
  const post = {
    id: uuidv4(),
    title: req.body.postTitle,
    content: req.body.postBody
  };
  posts.push(post);
  res.redirect("/");
});

app.get('/posts/:id', (req, res) => {
  const post = posts.find(post => post.id === req.params.id);
  res.render('post.ejs', {post: post});
});

app.get('/edit/:id', (req, res) => {
  const post = posts.find(post => post.id === req.params.id);
  res.render('edit.ejs', {post: post});
});

app.post('/edit/:id', (req, res) => {
  const post = posts.find(post => post.id === req.params.id);
  post.title = req.body.postTitle;
  post.content = req.body.postBody;
  res.redirect('/');
});

app.post('/delete/:id', (req, res) => {
  const postIndex = posts.findIndex(post => post.id === req.params.id);
  posts.splice(postIndex, 1);
  res.redirect('/');
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

   