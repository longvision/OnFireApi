"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

//1 produto tem uma receita
// Varias receita tem varios ingredientes
//1 ingrediente tem 1 precos
//1 historico tem varios precos

class IngredientSchema extends Schema {
  up() {
    this.create("ingredients", (table) => {
      table.increments();
      table
        .integer("user_id")
        .unsigned()
        .references("id")
        .inTable("users")
        .onUpdate("CASCADE")
        .onDelete("SET NULL");
      table.string("name").notNullable();
      table.string("brand").notNullable();
      table.text("seller").notNullable();
      table.text("sold_region").notNullable();
      table.decimal("package_price", 15, 4).notNullable();
      table.string("unit").notNullable();
      table.decimal("package_size", 15, 4).notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop("ingredients");
  }
}

module.exports = IngredientSchema;
