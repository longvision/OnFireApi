"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with products
 */
const Product = use("App/Models/Product");
const Measure = use("App/Models/Measure");

class ProductController {
  /**
   * Show a list of all products.
   * GET products
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view, auth }) {
    const { page } = request.get();

    const user = await auth.getUser();

    const products = await Product.query()
      .where("user_id", user.id)
      .with("files", (builder) => {
        builder.select("product_id", "url", "name"); // product_id is needed
      })
      .paginate(page);

    // await products

    return products;
  }

  /**
   * Render a form to be used for creating a new product.
   * GET products/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create({ request, response, view }) {}

  /**
   * Create/save a new product.
   * POST products
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response, auth }) {
    const data = request.only(["title", "description"]);

    const product = await Product.create({
      title: data.title,
      description: data.description,
      active: false,
      user_id: auth.user.id,
    });

    return product;
  }

  /**
   * Display a single product.
   * GET products/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params }) {
    const product = await Product.findOrFail(params.id);
    await product.load("user");
    await product.load("measures");

    return product;
  }

  /**
   * Render a form to update an existing product.
   * GET products/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit({ params, request, response, view }) {}

  /**
   * Update product details.
   * PUT or PATCH products/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
    const product = await Product.findOrFail(params.id);

    const measure = await Measure.query()
      .where("product_id", params.id)
      .fetch();

    let arrayOfCosts = measure.toJSON().map((item) => Number(item.cost));
    let totalCost = arrayOfCosts.reduce((a, b) => a + b, 0);

    totalCost.toFixed(2);

    // const product = await Product.create({
    //   title: data.title,
    //   description: data.description,
    //   active: true,
    //   user_id: auth.user.id,
    // });
    product.merge({ total_cost: totalCost });

    await product.save();

    return measure;
  }

  /**
   * Delete a product with id.
   * DELETE products/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
    const product = await Product.findOrFail(params.id);

    await product.delete();
  }
}

module.exports = ProductController;
