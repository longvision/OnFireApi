"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Product extends Model {
  user() {
    return this.belongsTo("App/Models/User");
  }

  recipe() {
    return this.hasMany("App/Models/Recipe");
  }
  sales_report() {
    return this.hasOne("App/Models/SalesReport");
  }
}

module.exports = Product;
