import userController from "../controller/user_controller.js";
import express from "express";

const route = express.Router();

route.get("/user/:identifier", userController.findUserByUsername);
route.get("/user", userController.getUser);
route.put("/user/:id", userController.updateUserData);

export default route;
