import express from "express"
import { config } from 'dotenv';
import ticketRouter from "./routes/ticket.route.js";
import airportRoute from "./routes/airport.route.js";
config();

export const app = express();

app.set("port", process.env.PORT || 8000);
app.set("trust proxy", true);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(ticketRouter);
app.use(airportRoute);
