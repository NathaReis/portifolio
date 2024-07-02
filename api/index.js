const express = require('express');
const app = express();
const bodyParser = require('body-parser'); 
const produtosService = require('./service/produtoService');
const port = 3001;

app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.send({ Message: "Olá, Seja bem vindo!" });
});

app.get("/produtos",async (req, res) => {
    try {
        const produtos = await produtosService.getProdutos();
        res.status(200).send(produtos);
    }
    catch (err) {
        console.error(err);
        res.status(400).send({ message: err });
    }
});

app.post("/produtos", async (req, res) => {
    const novoProduto = req.body;

    try {
        await produtosService.addProduto(novoProduto);
        res.status(201).send(novoProduto);
    }
    catch (err) {
        console.error(err);
        res.status(500).send({ message: err });
    }
});

app.get("/produtos/:id", async (req, res) => {
    const id = req.params['id'];

    try {
        await produtosService.deleteProduto(id);
        res.status(200).send(id);
    }
    catch (err) {
        console.error(err);
        res.status(500).send({ message: err });
    }
});

app.listen(port, () => console.log(`http://localhost:${port}`));
