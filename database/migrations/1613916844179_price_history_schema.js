"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class PriceHistorySchema extends Schema {
  up() {
    this.create("price_histories", (table) => {
      table.increments();
      table.string("ingredient_name").notNullable();
      table.string("brand").notNullable();
      table.text("seller").notNullable();
      table.text("sold_region").notNullable();
      table.decimal("package_price", 11, 4).notNullable();
      table.string("unit").notNullable();
      table.decimal("package_size", 11, 4).notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop("price_histories");
  }
}

module.exports = PriceHistorySchema;
