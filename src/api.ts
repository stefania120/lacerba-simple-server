import express from "express";

const app = express();

app.use(express.json());

let cnt = 0;

// CRUD - Create, Read, Update, Delete

interface BlogPost {
  title: string;
  date: Date;
  body: string;
  id: number;
  draft: boolean;
}

type PostInputData = Pick<BlogPost, "title" | "body">;

const validateInputMiddleware: express.RequestHandler = (req, res, next) => {
  const postData: PostInputData = req.body;

  if (!postData.title) {
    return res.status(400).send({ error: "Title is required" });
  } else if (!postData.body) {
    return res.status(400).send({ error: "Body is required" });
  }
    next();
};

let posts: BlogPost[] = [];
// Read all posts
app.get("/posts/", (req, res) => {
  res.send(posts);
});
// Read a single post by id
app.get("/posts/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const post = posts.find((post) => post.id === id);
  if (!post) {
    return res.status(404).send({ error: "Post not found" });
  }
  return res.send({ post });
});

// Update a post
app.put("/posts/:id", validateInputMiddleware, (req, res) => {
  const id = Number(req.params.id);
  const postData: PostInputData = req.body;

  const postToUpdateIndex = posts.findIndex((post) => post.id === id);
  if (!posts[postToUpdateIndex]) {
    return res.status(404).send({ error: "Post not found" });
  }
  posts[postToUpdateIndex] = {
    ...posts[postToUpdateIndex],
    title: postData.title,
    body: postData.body,
  };
  return res.send(posts[postToUpdateIndex]);
});

// Delete a post
app.delete("/posts/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const postToDelete = posts.find((post) => post.id === id);
  if (!postToDelete) {
    return res.status(404).send({ error: "Post not found" });
  }
  posts = posts.filter((post) => post.id !== id);
  return res.status(200).json(postToDelete);
});
// Create a new post
let nextId = 0;
app.post("/posts/", validateInputMiddleware, (req, res) => {
  const postData: PostInputData = req.body;

  const newPost: BlogPost = {
    id: nextId++,
    date: new Date(),
    draft: false,
    title: postData.title,
    body: postData.body,
  };
  posts.push(newPost);
  return res.status(201).send(newPost);
});

// Make public a single post by id
app.post("/posts/:id/public", (req, res) => {
  const id = parseInt(req.params.id);
  const postToPublicIndex = posts.findIndex((post) => post.id === id);
  if (!posts[postToPublicIndex]) {
    return res.status(404).send({ error: "Post not found" });
  }
  posts[postToPublicIndex].draft = true;
  return res.send(posts[postToPublicIndex]);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
