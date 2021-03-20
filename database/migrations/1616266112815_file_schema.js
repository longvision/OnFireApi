"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class FileSchema extends Schema {
  up() {
    this.table("files", (table) => {
      // alter table
      table
        .integer("product_id")
        .unsigned()
        .references("id")
        .inTable("products")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
    });
  }

  down() {
    this.table("files", (table) => {
      // reverse alternations
    });
  }
}

module.exports = FileSchema;
