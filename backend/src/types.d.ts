export interface Airport {
    name: string;
    iataCode: string;
    latitude: number;
    longitude: number;
}

export interface Ticket {
    originCode: string;
    destinationCode: string;
    airline: string;
    flightNumber: string;
}