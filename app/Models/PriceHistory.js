"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class PriceHistory extends Model {
  ingredient() {
    return this.hasMany("App/Models/Ingredient");
  }
}

module.exports = PriceHistory;
