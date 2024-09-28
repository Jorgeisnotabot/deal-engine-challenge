import { Router, Request, Response } from "express";
import { home, upload } from "../controller/ticket.controller.js";

const ticketRouter = Router();

ticketRouter.get("/", home);

ticketRouter.get("/upload", upload)

export default ticketRouter;



