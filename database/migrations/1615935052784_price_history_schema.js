"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class PriceHistorySchema extends Schema {
  up() {
    this.table("price_histories", (table) => {
      // alter table
      table.integer("ingredient_id");
    });
  }

  down() {
    this.table("price_histories", (table) => {
      // reverse alternations
      table.dropColumn("ingredient_id");
    });
  }
}

module.exports = PriceHistorySchema;
