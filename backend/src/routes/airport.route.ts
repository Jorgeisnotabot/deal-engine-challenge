import { Router } from "express";
import {  getAirports } from "../controller/airport.controller.js";

const airportRoute = Router();

airportRoute.get("/airports", getAirports);

export default airportRoute;

