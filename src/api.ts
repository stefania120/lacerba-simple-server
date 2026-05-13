import express from 'express';

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

let posts: BlogPost[] = [];
// Read all posts
app.get ('/posts/', (req, res) => {
    res.send(posts);
});
// Read a single post by id
app.get ('/posts/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const post = posts.find((post) => post.id === id);
    if (!post) {
       return res.status(404).send({error: 'Post not found'});
    }
    return res.send({post});
});

// Update a post
app.put ('/posts/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const postData = req.body;
    const postToUpdateIndex = posts.findIndex((post) => post.id === id);
    if (!posts[postToUpdateIndex]) {
       return res.status(404).send({error: 'Post not found'});
    }
    posts[postToUpdateIndex] = {
        ...posts[postToUpdateIndex],
        title: postData.title,
        body: postData.body
    }
    return res.send( posts[postToUpdateIndex] );
});

// Delete a post
app.delete('/posts/:id', (req, res) => {
 const id = parseInt(req.params.id);
    const postToDelete = posts.find((post) => post.id === id);
    if (!postToDelete) {
       return res.status(404).send({error: 'Post not found'});  
    }
    posts = posts.filter((post) => post.id !== id);
    return res.status(200).json(postToDelete);
});
// Create a new post
let nextId = 0;
app.post('/posts/', (req, res) => {
    const postData = req.body;
    
    const newPost: BlogPost = {
        id: nextId++,
        date: new Date(),
        draft: false,
        title: postData.title,
        body: postData.body
    };
    posts.push(newPost);
    return res.status(201).send(newPost);
});

// Make public a single post by id
app.post ('/posts/:id/public', (req, res) => {
    const id = parseInt(req.params.id);
    const postToPublicIndex = posts.findIndex((post) => post.id === id);
    if (!posts[postToPublicIndex]) {
       return res.status(404).send({error: 'Post not found'});
    }
    posts[postToPublicIndex].draft = true;
    return res.send( posts[postToPublicIndex] );
});

// app.get('/', (req, res) => {
//     cnt += 1;
//     res.send({hello: 'world', cnt});
// });

// app.post('/', (req, res) => {
//     cnt += -1;
//     res.send({hello: 'world', cnt});
// });

// app.post('/reply', (req, res) => {
//     const body = req.body;
//     console.log(body);
//     res.send({body:body});
// });

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});