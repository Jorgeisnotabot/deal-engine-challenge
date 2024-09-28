import { Request, Response } from 'express';
import { getTicketsData } from '../model/ticket.model.js';

export const getTickets = async (req: Request, res: Response) => {
    try {
        const tickets = await getTicketsData();
        res.status(200).json(tickets);
    } catch (error) {
        res.status(500).json({ message: "Error fetching Tickets" });
    }
}

export const home = async (req: Request, res: Response) => {
    res.send("Hello, world!");
}

export const upload = async (req: Request, res: Response) => {

}