const express = require('express');
const router = express.Router();
const produtoService = require('../service/produtoService');// Para utilizar o service de produto

router.use((req, res, next) => {
    console.log('Horário: ', Date.now())
    next()
})

router.post("/", async (req, res) => {
    const newProduct = req.body;

    try {
        await produtoService.addProduto(newProduct);
        res.status(201).send(newProduct);
    }
    catch (err) {
        console.error(err);
        res.status(500).send({ message: err });
    }
});// Create

router.get("/",async (req, res) => {
    try {
        const produtos = await produtoService.getProdutos();
        res.status(200).send(produtos);
    }
    catch (err) {
        console.error(err);
        res.status(400).send({ message: err });
    }
});// FindAll

router.get("/:id", async (req, res) => {
    const id = req.params['id'];

    try {
        const produto = await produtoService.getProduto(id);
        res.status(200).send(produto);
    }
    catch (err) {
        console.error(err);
        res.status(500).send({ message: err });
    }
});// FindOne

router.put("/", async (req, res) => {
    const updateProduto = req.body;

    try {
        await produtoService.updateProduto(updateProduto);
        res.status(200).send(updateProduto);
    }
    catch (err) {
        console.error(err);
        res.status(500).send({ message: err });
    }
});// Update

router.delete("/:id", async (req, res) => {
    const id = req.params['id'];

    try {
        await produtoService.deleteProduto(id);
        res.status(200).send(id);
    }
    catch (err) {
        console.error(err);
        res.status(500).send({ message: err });
    }
});// Delete
module.exports = router