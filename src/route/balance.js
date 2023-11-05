import balanceController from "../controller/balance_controller.js";
import express from "express";

const route = express.Router();

route.get("/balance", balanceController.getBalances);
route.put("/balance/:id", balanceController.updateBalance);

export default route;
