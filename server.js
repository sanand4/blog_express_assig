const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

let blogPosts = [];

//Add blog post (Create):
app.post("/blog", (req, res) => {
  const { title, content } = req.body;
  const newPost = { id: Date.now(), title, content };
  blogPosts.push(newPost);
  res.status(201).json(newPost);
});

//Get all blog posts (Read):

app.get("/blog", (req, res) => {
  res.json(blogPosts);
});

//Get a specific blog post by ID (Read):
app.get("/blog/:id", (req, res) => {
  const postId = Number(req.params.id);
  const post = blogPosts.find((p) => p.id === postId);
  if (post) {
    res.json(post);
  } else {
    res.status(404).json({ error: "Post not found" });
  }
});

//Update a blog post by ID (Update):

app.put("/blog/:id", (req, res) => {
  const postId = Number(req.params.id);
  const { title, content } = req.body;
  const postIndex = blogPosts.findIndex((p) => p.id === postId);
  if (postIndex !== -1) {
    blogPosts[postIndex] = { id: postId, title, content };
    res.json(blogPosts[postIndex]);
  } else {
    res.status(404).json({ error: "Post not found" });
  }
});

//Delete a blog post by ID (Delete):
app.delete("/blog/:id", (req, res) => {
  const postId = Number(req.params.id);
  const postIndex = blogPosts.findIndex((p) => p.id === postId);
  if (postIndex !== -1) {
    const deletedPost = blogPosts.splice(postIndex, 1)[0];
    res.json(deletedPost);
  } else {
    res.status(404).json({ error: "Post not found" });
  }
});

//server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
