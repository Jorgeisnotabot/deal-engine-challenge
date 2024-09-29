import { Request, Response } from 'express';
import { parseTicketsData } from '../utils/csv-parser.js';

export const getTickets = async (req: Request, res: Response) => {
    try {
        const tickets = await parseTicketsData('./data/tickets.csv');
        res.status(200).json(tickets);
    } catch (error) {
        res.status(500).json({ error: 'Failed to parse tickets'  });
    }
}

export const home = async (req: Request, res: Response) => {
    res.send("Hello, world!");
}

export const upload = async (req: Request, res: Response) => {

}