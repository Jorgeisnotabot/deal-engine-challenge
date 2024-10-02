import express from "express"
import { config } from 'dotenv';
import ticketRouter from "./routes/ticket.route.js";
import airportRoute from "./routes/airport.route.js";
import weatherRoutes from "./routes/weather.route.js";
import * as path from "node:path"
import { fileURLToPath } from "node:url";

config();

export const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.set("port", process.env.PORT || 8000);
app.set("trust proxy", true);
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../..', 'out')));
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, '../..', 'out', 'index.html'));
})
app.use(express.json());
// Use the weather routes
app.use("/api", weatherRoutes);
app.use(ticketRouter);
app.use(airportRoute);
