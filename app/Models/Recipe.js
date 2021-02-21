"use strict";
//1 produto tem uma receita
// Varias receita tem varios ingredientes
//1 ingrediente tem varios precos

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Recipe extends Model {
  users() {
    return this.belongsTo("App/Models/User");
  }
  ingredients() {
    return this.hasMany("App/Models/Ingredient");
  }
}

module.exports = Recipe;
