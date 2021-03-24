"use strict";

const Database = use("Database");
const User = use("App/Models/User");

class UserController {
  async store({ request, response }) {
    try {
      const data = request.only(["username", "email", "password"]);
      // const addresses = request.input("addresses");

      // const trx = await Database.beginTransaction();

      const user = await User.create(data);
      // const user = await User.create(data, trx);

      // await user.addresses().createMany(addresses, trx);

      // await trx.commit();

      return user;
    } catch (err) {
      return response.status(err.status).send({
        error: {
          message: `Usuário ou email já cadatrados no sistema. Verifique os dados ou cadastre com dados diferentes.`,
        },
      });
    }
  }
}

module.exports = UserController;
