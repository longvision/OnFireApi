"use strict";

const Route = use("Route");
//auth
Route.post("users", "UserController.store").validator("User");
Route.post("sessions", "SessionController.store").validator("Session");

Route.post("passwords", "ForgotPasswordController.store").validator(
  "ForgotPassword"
);
Route.put("passwords", "ForgotPasswordController.update").validator(
  "ResetPassword"
);

Route.group(() => {
  Route.post("/files", "FileController.store");

  Route.delete("/ingredient/:id", "IngredientController.destroy");
  Route.get("/ingredient/:id", "IngredientController.show");
  Route.get("/ingredients", "IngredientController.index");
  Route.post("/ingredient", "IngredientController.store");
  Route.patch("/ingredient/:id", "IngredientController.update");

  Route.post("/measure", "MeasureController.store");
  Route.delete("/measure/:id", "MeasureController.destroy");
  Route.get("/measures", "MeasureController.index");
  Route.get("/measures/:id", "MeasureController.show");

  Route.delete("/product/:id", "ProductController.destroy");
  Route.get("/product/:id", "ProductController.show");
  Route.get("/products", "ProductController.index");
  Route.post("/product", "ProductController.store");

  Route.patch("/product/:id", "ProductController.update");

  //projetos
  Route.resource("projects", "ProjectController")
    .apiOnly()
    .validator(new Map([[["projects.store"], ["Project"]]]));

  //tarefas
  Route.resource("projects.tasks", "TaskController")
    .apiOnly()
    .validator(new Map([[["projects.tasks.store"], ["Task"]]]));
  Route.resource("/files", "FileController").apiOnly();
}).middleware(["auth"]);
