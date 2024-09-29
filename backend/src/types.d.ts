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
    originAirport: Airport;
    destinationAirport: Airport;
}

export interface CSVRow {
    origin: string;
    destination: string	
    airline: string	
    flight_num: string	
    origin_iata_code: string	
    origin_name: string	
    origin_latitude: number	
    origin_longitude: number	
    destination_iata_code: string	
    destination_name: string	
    destination_latitude: number	
    destination_longitude: number
}