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

const posts: BlogPost[] = [{
    id:0,
    title: 'My first blog post',
    date: new Date(),
    body: 'This is the content of my first blog post.',
    draft: false
},
{
    id:1,
    title: 'My second blog post',
    date: new Date(),
    body: 'This is the content of my second blog post.',
    draft: false
}
];

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