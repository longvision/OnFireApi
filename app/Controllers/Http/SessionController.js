"use strict";

class SessionController {
  async store({ request, response, auth }) {
    const { email, password } = request.all();
    const token = await auth.attempt(email, password);
    token;
    return token;
  }
}

module.exports = SessionController;
