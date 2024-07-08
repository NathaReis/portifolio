const express = require('express');
const app = express();
const letraController = require('../controller/letra');

app.post("/", letraController.createLetra);// Create
app.get("/", letraController.getAllLetras);// FindAll
app.get("/:id", letraController.getOneLetra);// FindOne
app.put("/", letraController.updateLetra);// Update
app.delete("/:id", letraController.deleteLetra);// Delete

module.exports = app;