import express from 'express';

const app = express();

let cnt = 0;
app.get('/', (req, res) => {
    cnt += 1;
    res.send({hello: 'world', cnt});
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});