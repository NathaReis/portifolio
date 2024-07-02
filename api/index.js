const express = require("express");
const app = express();
const fs = require('fs');
const path = require('path');
const port = 3001;
const filePath = path.join(__dirname, 'db.json');

app.get("/", (req,res) => {
    res.send({Message: "Olá, Seja bem vindo!"});
})

app.get("/produtos", (req,res) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if(err) {
            console.error(`Erro ao buscar arquivos: ${err}`);
            res.status(400).send({message: err});
        }
    
        try {
            const jsonData = JSON.parse(data);
            res.status(200).send(jsonData.produtos);
        }
        catch (parseErr) {
            console.log(`Erro ao analisar JSON: ${parseErr}`);
        }
    })
})

app.get("/pessoas", (req,res) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if(err) {
            console.error(`Erro ao buscar arquivos: ${err}`);
            res.status(400).send({message: err});
        }
    
        try {
            const jsonData = JSON.parse(data);
            res.status(200).send(jsonData.pessoas);
        }
        catch (parseErr) {
            console.log(`Erro ao analisar JSON: ${parseErr}`);
        }
    })
})

app.listen(port, () => console.log(`http://localhost:${port}`));