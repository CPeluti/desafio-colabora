/* eslint-disable no-unused-vars */
var countId = 0;
var produtos = {};
exports.Products = class Products {
  constructor (options) {
    this.options = options || {};
    
  }
  
  async find (params) {
    return produtos;
  }

  async get (id, params) {
    return produtos[id];
  }

  async create (data, params) {
    produtos[countId] = data;
    let produto = {id:countId,...data};
    countId++;
    return produto;
  }

  async update (id, data, params) {
    produtos[id] = data;
    return 'atualizado com sucesso';
  }

  async remove (id, params) {
    delete produtos[id];
    return 'deletado com sucesso!';
  }
};
