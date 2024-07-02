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
      fs.writeFile(filePath, JSON.stringify(data, null, 2), (err) => {
        if (err) {
          reject(`Erro ao escrever no arquivo: ${err}`);
        } else {
          resolve();
        }
      });
    });
};

const getProdutos = async () => {
    const data = await readData();
    return data.produtos;
};
  
const addProduto = async (produto) => {
    const data = await readData();
    data.produtos.push(produto);
    await writeData(data);
};

const deleteProduto = async (id) => {
    let data = await readData();
    data = data.produtos.filter(el => el.id != id);
    await writeData(data);
}

module.exports = {
    getProdutos,
    addProduto,
    deleteProduto,
};