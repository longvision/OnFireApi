"use strict";
//1 produto tem uma receita
// Varias receita tem varios ingredientes
//1 ingrediente tem varios precos

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Measure extends Model {
  users() {
    return this.belongsTo("App/Models/User");
  }
  products() {
    return this.belongsTo("App/Models/Product");
  }
  ingredients() {
    return this.belongsTo("App/Models/Ingredient");
  }
}

module.exports = Measure;
