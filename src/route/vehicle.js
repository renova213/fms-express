import vehicleController from "../controller/vehicle_controller.js";
import express from "express";

const route = express.Router();

route.get("/vehicle/userId=:userId", vehicleController.getVehicles);
route.post("/vehicle", vehicleController.createVehicle);
route.delete("/vehicle/:id", vehicleController.deletevehicle);

export default route;
