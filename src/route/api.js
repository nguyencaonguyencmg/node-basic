import express from "express";
import APIController from "../controller/APIController";
let router = express.Router();

const initAPIRoute = (app) => {
  //[GET] /users
  router.get("/users", APIController.getAllUsers);

  //[PUSH] /create-user
  router.post("/create-user", APIController.createNewUser);

  //[PUT] /update-user
  router.put("/update-user", APIController.updateUser);

  //[DELETE] /delete-user
  router.delete("/delete-user/:id", APIController.deleteUser);

  return app.use("/api/v1/", router);
};
module.exports = initAPIRoute;
