import { Router, Request, Response } from "express";
import { home, upload } from "../controller/ticket.controller.js";
import { parseTicketsData, parseTicketsDataPaginated } from "../utils/csv-parser.js";
import cors from "cors";
const ticketRouter = Router();

ticketRouter.use(
    cors({
        origin: 'http://localhost:5173', // Allow requests from this origin
        credentials: true, // Allow credentials (cookies, authorization headers, etc.)
    })
)

// ticketRouter.get("/", home);

// ticketRouter.get("/upload", upload)

ticketRouter.post("/parse-tickets", async(req: Request, res: Response) => {
    try {
        const tickets = await parseTicketsData('./backend/data/dataset.csv');
        res.status(200).json(tickets);
    } catch (error) {
        res.status(500).json({ error: 'Failed to parse tickets'  });
    }
})

ticketRouter.post("/parse-tickets-in-batches", async (req, res) => {
    try {
        const filePath = req.body.filePath; // Assume file path is passed
        const page = req.body.page || 0; // Assume page number is passed
        const batchSize = 30; // Set the batch size to 30
        const ticketBatches = await parseTicketsDataPaginated(filePath, page ,batchSize);
        res.status(200).json(ticketBatches);
    } catch (error) {
        res.status(500).json({ error: "Failed to parse tickets in batches" });
    }
});
export default ticketRouter;



