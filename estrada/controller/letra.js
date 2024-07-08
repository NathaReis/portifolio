const letrasService = require('../service/letraService');// Para utilizar o service de produto
const controller = {};

controller.createLetra = async (req, res) => {
    const novaLetra = req.body;
    console.log(novaLetra);

    try {
        await letrasService.addLetra(novaLetra);
        res.status(201).send(novaLetra);
    }
    catch (err) {
        console.error(err);
        res.status(500).send({ message: err });
    }
}

controller.getAllLetras = async (req,res) => {
    try {
        const letras = await letrasService.getLetras();
        res.status(200).send(letras);
    }
    catch (err) {
        console.error(err);
        res.status(400).send({ message: err });
    }
}

controller.getOneLetra = async (req, res) => {
    const id = req.params['id'];

    try {
        const letra = await letrasService.getLetra(id);
        res.status(200).send(letra);
    }
    catch (err) {
        console.error(err);
        res.status(500).send({ message: err });
    }
}

controller.updateLetra = async (req, res) => {
    const updateLetra = req.body;

    try {
        await letrasService.updateLetra(updateLetra);
        res.status(200).send(updateLetra);
    }
    catch (err) {
        console.error(err);
        res.status(500).send({ message: err });
    }
}

controller.deleteLetra = async (req, res) => {
    const id = req.params['id'];

    try {
        await letrasService.deleteLetra(id);
        res.status(200).send(id);
    }
    catch (err) {
        console.error(err);
        res.status(500).send({ message: err });
    }
}

module.exports = controller;