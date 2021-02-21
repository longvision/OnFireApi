"use strict";

const Recipe = use("App/Models/Recipe");
const Ingredient = use("App/Models/Ingredient");
const {
  packageGramPrice,
  convertToGram,
} = require("../../../start/calculator");
class RecipeController {
  /**
   * Show a list of all recipes.
   * GET recipes
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {
    const { page } = request.get();

    const recipes = await Recipe.query().with("user").paginate(page);

    return recipes;
  }

  /**
   * Create/save a new recipe.
   * POST recipes
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ params, request, response, auth }) {
    const data = request.only([
      "quantity",
      "unit",
      "ingredient_id",
      "product_id",
    ]);

    //Busca os dados do ingrediente na tabela de ingredientes cadastrados
    const ingredient = await Ingredient.find(data.ingredient_id);
    const size = ingredient.package_size;
    const price = ingredient.package_price;
    const unit = ingredient.unit;

    //calcula o custo por grama do ingrediente cadastrado
    const costPerGram = packageGramPrice(unit, size, price).toFixed(4);

    //calcula o custo total desse ingrediente na receita
    const recipeItemCost =
      costPerGram * convertToGram(data.unit, data.quantity);

    // console.log("costPerGram",costPerGram);
    // console.log("recipeItemCost", recipeItemCost);
    const recipe = await Recipe.create({
      ingredient_id: data.ingredient_id,
      product_id: data.product_id,
      user_id: auth.user.id,
      quantity: data.quantity,
      unit: data.unit,
      cost: recipeItemCost,
    });

    return recipe;
  }

  /**
   * Display a single recipe.
   * GET recipes/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params }) {
    const recipe = await Recipe.findOrFail(params.id);

    await recipe.load("user");
    await recipe.load("tasks");

    return recipe;
  }

  /**
   * Update recipe details.
   * PUT or PATCH recipes/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request }) {
    const recipe = await Recipe.findOrFail(params.id);
    const data = request.only(["title", "description"]);

    recipe.merge(data);

    await recipe.save();

    return recipe;
  }

  /**
   * Delete a recipe with id.
   * DELETE recipes/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params }) {
    const recipe = await Recipe.findOrFail(params.id);

    await recipe.delete();
  }
}

module.exports = RecipeController;
