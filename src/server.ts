import express from 'express';

const app = express();

app.get('/', (req, res)  => {
    console.log(req.url);
    console.log(req.headers);
    return res.send("<h1>Ciao Lacerba</h1> <p> Questo è il nostro primo server in NodeJS! </p>");
});

app.get('/ciao', (req, res)  => {
    return res.send("<h1>Ciao Lacerba</h1> <p> Questa è la pagina ciao! </p>");
});

app.get('*splat', (req, res)  => {
    return res.status(404).send("<h1> 404 </h1> <p> Pagina non trovata! </p>");
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});