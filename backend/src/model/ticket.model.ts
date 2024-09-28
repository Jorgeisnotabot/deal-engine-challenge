import { Ticket } from "../types.js";
//DUMMY DATA
const tickets: Ticket[] = [
    {
        originCode: "TLC",
        destinationCode: "MTY",
        airline: "4O",
        flightNumber: "104"
    },
    {
        originCode: "MTY",
        destinationCode: "TLC",
        airline: "4O",
        flightNumber: "119"
    }
]

export const getTicketsData = async () => {
    return tickets;
}