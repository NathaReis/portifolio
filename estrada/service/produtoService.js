const fs = require('fs');
const path = require('path');
const filePath = path.join('../estrada/db/produto.json');// Para salvar registros no json
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
        data = {produtos: data};
        fs.writeFile(filePath, JSON.stringify(data, null, 2), (err) => {
            if (err) {
            reject(`Erro ao escrever no arquivo: ${err}`);
            } else {
            resolve();
            }
        });
    });
};// Escrita

const addProduto = async (produto) => {
    const data = await readData();
    const ids = data.produtos.map(el => el.id);
    produto.id = idService.randomId(ids);
    
    data.produtos.push(produto);
    await writeData(data.produtos);
};// Create

const getProdutos = async () => {
    const data = await readData();
    return data.produtos;
};// FindAll

const getProduto = async (id) => {
    let data = await readData();
    data = data.produtos.filter(el => el.id == id);
    return data;
};// FindOne

const updateProduto = async (produto) => {
    let data = await readData();
    console.log(data)
    data = data.produtos.filter(el => el.id != produto.id);
    data.push(produto);
    await writeData(data);
};// Update

const deleteProduto = async (id) => {
    let data = await readData();
    data = data.produtos.filter(el => el.id != id);
    await writeData(data);
}// Delete

module.exports = {
    addProduto,
    getProdutos,
    getProduto,
    updateProduto,
    deleteProduto,
};