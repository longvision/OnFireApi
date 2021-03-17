"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class SalesReportSchema extends Schema {
  up() {
    this.create("sales_reports", (table) => {
      table.increments();
      table
        .integer("product_id")
        .unsigned()
        .references("id")
        .inTable("products")
        .onUpdate("CASCADE")
        .onDelete("SET NULL");
      table.integer("sold_quantity").notNullable();
      table.decimal("price_sold", 15, 4).notNullable();
      table.decimal("total_cost", 15, 4).notNullable();
      table.decimal("profit", 15, 4).notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop("sales_reports");
  }
}

module.exports = SalesReportSchema;
