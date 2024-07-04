const fs = require('fs');
const path = require('path');
const filePath = path.join('../api/db/produto.json');

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
};

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
};

const addProduto = async (produto) => {
    const data = await readData();
    data.produtos.push(produto);
    await writeData(data);
};

const getProdutos = async () => {
    const data = await readData();
    return data.produtos;
};

const getProduto = async (id) => {
    let data = await readData();
    data = data.produtos.filter(el => el.id == id);
    return data;
};

const updateProduto = async (produto) => {
    let data = await readData();
    console.log(data)
    data = data.produtos.filter(el => el.id != produto.id);
    data.push(produto);
    await writeData(data);
};

const deleteProduto = async (id) => {
    let data = await readData();
    data = data.produtos.filter(el => el.id != id);
    await writeData(data);
}

module.exports = {
    addProduto,
    getProdutos,
    getProduto,
    updateProduto,
    deleteProduto,
};