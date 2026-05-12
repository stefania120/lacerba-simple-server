import express from 'express';

const app = express();

app.use(express.json());

let cnt = 0;
app.get('/', (req, res) => {
    cnt += 1;
    res.send({hello: 'world', cnt});
});

app.post('/', (req, res) => {
    cnt += -1;
    res.send({hello: 'world', cnt});
});

app.post('/reply', (req, res) => {
    const body = req.body;
    console.log(body);
    res.send({body:body});
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});