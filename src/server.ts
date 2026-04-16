import express from 'express';

const app = express();

// '/?firstName=stefania&lastName=formato'
app.get('/', (req, res)  => {
    console.log(req.query);
    return res.send("<h1>Ciao Lacerba</h1> <p> Questo è il nostro primo server in NodeJS! </p>");
});

app.get('/greeting/:name', (req, res) => {
    console.log(req.params);
    const name = req.params.name;
    return res.send(`<h1>Ciao ${name}</h1> <p> Questo è la pagina greeting! </p>`);
});

app.get('/ciao', (req, res) => {
    return res.send("<h1>Ciao Lacerba</h1> <p> Questo è la pagina ciao! </p>");
});

app.get('*splat', (req, res) => {
    return res.status(404).send("<h1>404 Not Found</h1> <p> La pagina richiesta non esiste! </p>");
}) 

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});