import { Router } from "express";
import { getWeatherReportsController } from "../controller/weather.controller.js";

const router = Router();

// Register the route
router.post("/weather-reports", getWeatherReportsController);

export default router;