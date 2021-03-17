"use strict";

const Measure = use("App/Models/Measure");
const Ingredient = use("App/Models/Ingredient");
const Product = use("App/Models/Product");

const {
  convertToSmallUnits,
  packagePriceImGramOrML,
  checkUnitCombination,
} = require("../../../start/calculator");
class MeasureController {
  /**
   * Show a list of all measures.
   * GET measures
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request }) {
    const { page } = request.get();

    const measures = await Measure.query().with("ingredients").paginate(page);

    return measures;
  }

  /**
   * Create/save a new measures.
   * POST measures
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response, auth }) {
    const data = request.only([
      "quantity",
      "unit",
      "ingredient_id",
      "product_id",
    ]);

    await Product.findOrFail(data.product_id);

    //Busca os dados do ingrediente na tabela de ingredientes cadastrados
    const ingredient = await Ingredient.findOrFail(data.ingredient_id);
    const size = ingredient.package_size;
    const price = ingredient.package_price;
    const unit = ingredient.unit;

    //checa coerencia entre escolha de unidades.
    if (!checkUnitCombination(data.unit, unit)) {
      return response.status(400).send({
        error: {
          message: "Este ingrediente não pode usar esse tipo de medida!",
        },
      });
    }

    // calcular o preco da medida usando o price, o unit e convertendo para a data.quantity fornecida pelo usuario.

    //calcula o custo por grama do ingrediente cadastrado

    const costPerGram = packagePriceImGramOrML(unit, size, price).toFixed(4);

    //calcula o custo total desse ingrediente na receita

    const recipeItemCost =
      costPerGram * convertToSmallUnits(data.unit, data.quantity);

    // console.log("costPerGram",costPerGram);
    // console.log("recipeItemCost", recipeItemCost);
    const measures = await Measure.create({
      ingredient_id: data.ingredient_id,
      product_id: data.product_id,
      user_id: auth.user.id,
      quantity: data.quantity,
      unit: data.unit,
      cost: recipeItemCost,
    });

    return measures;
  }

  /**
   * Display a single measures.
   * GET measures/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params }) {
    const measures = await Measure.findBy("product_id", params.id);

    await measures.load("ingredients");
    await measures.load("products");

    return measures;
  }

  /**
   * Update measures details.
   * PUT or PATCH measures/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request }) {
    const measures = await Measure.findOrFail(params.id);
    const data = request.only(["package_price", "package_size"]);

    measures.merge(data);

    await measures.save();

    return measures;
  }

  /**
   * Delete a measures with id.
   * DELETE measures/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params }) {
    const measures = await Measure.findOrFail(params.id);

    await measures.delete();
  }
}

module.exports = MeasureController;
