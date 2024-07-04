const express = require('express');
const app = express();
const port = 3001;
const bodyParser = require('body-parser'); 
const prodtutoRouter = require('./router/produto'); 

app.use(bodyParser.json());
app.use('/produto', prodtutoRouter); // Para utilizar o roteamento que manipula os produtos

app.get("/", (req, res) => {
    res.send({ Message: "Olá, Seja bem vindo!" });
});

app.listen(port, () => console.log(`http://localhost:${port}`));
