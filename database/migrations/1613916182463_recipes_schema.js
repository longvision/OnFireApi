"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

//1 produto tem uma receita
// Varias receita tem varios ingredientes
//1 ingrediente tem varios precos

class RecipesSchema extends Schema {
  up() {
    this.create("recipes", (table) => {
      table.increments();
      table
        .integer("ingredient_id")
        .unsigned()
        .references("id")
        .inTable("ingredients")
        .onUpdate("CASCADE")
        .onDelete("SET NULL");
      table
        .integer("user_id")
        .unsigned()
        .references("id")
        .inTable("users")
        .onUpdate("CASCADE")
        .onDelete("SET NULL");
      table.integer("product_id").notNullable();
      table.integer("quantity").notNullable();
      table.string("unit").notNullable();
      table.decimal("cost", 8, 4).notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop("recipes");
  }
}

module.exports = RecipesSchema;
