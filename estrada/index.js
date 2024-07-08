const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser'); 
const port = 3001;
const prodtutoRouter = require('./router/produto'); 
const letraRouter = require('./router/letra'); 

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/produto', prodtutoRouter); // Para utilizar o roteamento que manipula os produtos
app.use('/letra', letraRouter); // Para utilizar o roteamento que manipula os produtos

app.get("/", (req, res) => {
    res.send({ Message: "Olá, Seja bem vindo!" });
});

app.listen(port, () => console.log(`http://localhost:${port}`));
