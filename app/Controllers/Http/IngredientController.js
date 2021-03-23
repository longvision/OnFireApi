"use strict";

const Ingredient = use("App/Models/Ingredient");
const PriceHistory = use("App/Models/PriceHistory");

class IngredientController {
  /**
   * Show a list of all ingredients.
   * GET ingredients
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, auth }) {
    const { page } = request.get();

    const user = await auth.getUser();

    const ingredients = await Ingredient.query()
      .where("user_id", user.id)
      .paginate(page);

    return ingredients;
  }

  /**
   * Create/save a new ingredient.
   * POST ingredients
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */

  async store({ request, auth }) {
    const data = request.only([
      "name",
      "brand",
      "seller",
      "sold_region",
      "package_price",
      "unit",
      "package_size",
    ]);

    const ingredient = await Ingredient.create({
      ...data,
      user_id: auth.user.id,
    });

    await PriceHistory.create({
      brand: data.brand,
      seller: data.seller,
      sold_region: data.sold_region,
      unit: data.unit,
      package_size: data.package_size,
      package_price: data.package_price,
      ingredient_name: data.name,
    });

    return ingredient;
  }

  /**
   * Display a single ingredient.
   * GET ingredients/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params }) {
    const ingredient = await Ingredient.findOrFail(params.id);

    return ingredient;
  }

  /**
   * Update ingredient details.
   * PUT or PATCH ingredients/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request }) {
    const ingredient = await Ingredient.findOrFail(params.id);

    const data = request.only([
      "id",
      "name",
      "package_price",
      "package_size",
      "unit",
      "seller",
      "sold_region",
      "brand",
    ]);

    ingredient.merge(data);
    await ingredient.save();

    // const record = await PriceHistory.findBy("ingredient_id", data.id);

    // if (record && record.ingredient_name === data.name) {
    //   record.brand = data.brand;
    //   record.seller = data.seller;
    //   record.sold_region = data.sold_region;
    //   record.unit = data.unit;
    //   record.package_size = data.package_size;
    //   record.package_price = data.package_price;
    //   await record.save();
    // } else {
    //   await PriceHistory.create({
    //     ingredient_id: data.id,
    //     brand: data.brand,
    //     seller: data.seller,
    //     sold_region: data.sold_region,
    //     unit: data.unit,
    //     package_size: data.package_size,
    //     package_price: data.package_price,
    //     ingredient_name: data.name,
    //   });
    // }
    return ingredient;
  }

  /**
   * Delete a ingredient with id.
   * DELETE ingredients/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params }) {
    const ingredient = await Ingredient.findOrFail(params.id);

    await ingredient.delete();
  }
}

module.exports = IngredientController;
