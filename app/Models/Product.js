"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Product extends Model {
  user() {
    return this.belongsTo("App/Models/User");
  }

  measures() {
    return this.hasMany("App/Models/Measure");
  }
  files() {
    return this.hasMany("App/Models/File");
  }
  sales_report() {
    return this.hasOne("App/Models/SalesReport");
  }
}

module.exports = Product;
