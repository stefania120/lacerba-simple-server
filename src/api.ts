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

app.get ('/posts/', (req, res) => {
    res.send(posts);
});

app.get ('/posts/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const post = posts.find((post) => post.id === id);
    if (!post) {
       return res.status(404).send({error: 'Post not found'});
    }
    return res.send({post});
});

app.delete('/posts/:id', (req, res) => {
 const id = parseInt(req.params.id);
    const postToDelete = posts.find((post) => post.id === id);
    if (!postToDelete) {
       return res.status(404).send({error: 'Post not found'});  
    }
    posts = posts.filter((post) => post.id !== id);
    return res.status(200).json(postToDelete);
});

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