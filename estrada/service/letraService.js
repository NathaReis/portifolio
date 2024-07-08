const fs = require('fs');
const path = require('path');
const filePath = path.join('../estrada/db/letra.json');// Para salvar registros no json
const idService = require('./id');

const readData = () => {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf8', (err, data) => {
            if(err) reject(`ERRO: ${err}`);
            try {
                const jsonData = JSON.parse(data);
                resolve(jsonData);
            }
            catch (parseErr) {
                reject(`ERRO: ${parseErr}`);
            }
        })
    })
};// Leitura

const writeData = (data) => {
    return new Promise((resolve, reject) => {
        data = {letras: data};
        fs.writeFile(filePath, JSON.stringify(data, null, 2), (err) => {
            if (err) {
            reject(`Erro ao escrever no arquivo: ${err}`);
            } else {
            resolve();
            }
        });
    });
};// Escrita

const addLetra = async (letra) => {
    const data = await readData();
    const ids = data.letras.map(el => el.id);
    letra.id = idService.randomId(ids);
    
    data.letras.push(letra);
    await writeData(data.letras);
};// Create

const getLetras = async () => {
    const data = await readData();
    return data.letras;
};// FindAll

const getLetra = async (id) => {
    let data = await readData();
    data = data.letras.filter(el => el.id == id);
    return data;
};// FindOne

const updateLetra = async (produto) => {
    let data = await readData();
    console.log(data)
    data = data.letras.filter(el => el.id != produto.id);
    data.push(produto);
    await writeData(data);
};// Update

const deleteLetra = async (id) => {
    let data = await readData();
    data = data.letras.filter(el => el.id != id);
    await writeData(data);
}// Delete

module.exports = {
    addLetra,
    getLetras,
    getLetra,
    updateLetra,
    deleteLetra,
};