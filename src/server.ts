import express from 'express';;

const app = express();

app.get('/', (req, res)  => {
    console.log(req.url);
    console.log(req.headers);
    return res.send("<h1>Ciao Lacerba</h1> <p> Questo è il nostro primo server in NodeJS! </p>");
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});