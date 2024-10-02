import { Router } from "express";
import { getWeatherReportsController } from "../controller/weather.controller.js";
import cors from "cors";


const router = Router();

router.use(
    cors({
        origin: 'http://localhost:5173', // Allow requests from this origin
        credentials: true, // Allow credentials (cookies, authorization headers, etc.)
    })
)

// Register the route
router.post("/weather-reports", getWeatherReportsController);

export default router;