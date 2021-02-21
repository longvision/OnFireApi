"use strict";

const Antl = use("Antl");

class User {
  get validateAll() {
    return true;
  }

  get rules() {
    return {
      username: "required|unique:users",
      email: "required|unique:users",
      password: "required",
    };
  }

  get messages() {
    return Antl.list("validation");
  }
}

module.exports = User;
