"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Ingredient extends Model {
  measure() {
    return this.belongsToMany("App/Models/Measure");
  }
  user() {
    return this.belongsTo("App/Models/User");
  }
}

module.exports = Ingredient;
