const express = require('express');
const app = express();
const produtoController = require('../controller/produto');

app.post("/", produtoController.createProduto);// Create
app.get("/", produtoController.getAllProdutos);// FindAll
app.get("/:id", produtoController.getOneProduto);// FindOne
app.put("/", produtoController.updateProduto);// Update
app.delete("/:id", produtoController.deleteProduto);// Delete

module.exports = app;