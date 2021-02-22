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
//arquivos upload
Route.get("/files/:id", "FileController.show");

Route.group(() => {
  Route.post("/files", "FileController.store");

  Route.post("/ingredient", "IngredientController.store");
  Route.patch("/ingredient/:id", "IngredientController.update");

  Route.post("/measure", "MeasureController.store");
  Route.get("/measures", "MeasureController.index");
  Route.get("/measure/:id", "MeasureController.show");

  Route.get("/product/:id", "ProductController.show");
  Route.get("/products", "ProductController.index");
  Route.post("/products", "ProductController.store");

  Route.patch("/product/:id", "ProductController.update");

  //projetos
  Route.resource("projects", "ProjectController")
    .apiOnly()
    .validator(new Map([[["projects.store"], ["Project"]]]));

  //tarefas
  Route.resource("projects.tasks", "TaskController")
    .apiOnly()
    .validator(new Map([[["projects.tasks.store"], ["Task"]]]));
}).middleware(["auth"]);
