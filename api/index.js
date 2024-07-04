const express = require('express');
const app = express();
const port = 3001;
const bodyParser = require('body-parser'); 
const prodtutoRouter = require('./router/produto'); 

app.use(bodyParser.json());
app.use('/produto', prodtutoRouter);

app.get("/", (req, res) => {
    res.send({ Message: "Olá, Seja bem vindo!" });
});

app.listen(port, () => console.log(`http://localhost:${port}`));
