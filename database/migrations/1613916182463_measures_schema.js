"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

//1 produto tem uma receita
// Varias receita tem varios ingredientes
//1 ingrediente tem varios precos

class MeasuresSchema extends Schema {
  up() {
    this.create("measures", (table) => {
      table.increments();
      table
        .integer("ingredient_id")
        .unsigned()
        .references("id")
        .inTable("ingredients")
        .onDelete("SET NULL");
      table
        .integer("user_id")
        .unsigned()
        .references("id")
        .inTable("users")
        .onUpdate("CASCADE")
        .onDelete("SET NULL");
      table
        .integer("product_id")
        .unsigned()
        .references("id")
        .inTable("products")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table.integer("quantity").notNullable();
      table.string("unit").notNullable();
      table.decimal("cost", 8, 4).notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop("measures");
  }
}

module.exports = MeasuresSchema;
