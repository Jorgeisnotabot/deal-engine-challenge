import fs from 'fs';
import Papa from 'papaparse';
import { Ticket, Airport, CSVRow } from '../types.js';

export const parseTicketsData = (filePath: string): Promise<Ticket[]> => {
    return new Promise((resolve, reject) => {
        const fileStream = fs.createReadStream(filePath);
        const tickets: Ticket[] = [];

        Papa.parse<CSVRow>(fileStream, {
            header: true,
            delimiter: ",",
            skipEmptyLines: true,
            worker: true,
            chunk: (results, parser) => {
                results.data.forEach((row: CSVRow) => {
                    const originAirport: Airport = {
                        iataCode: row.origin_iata_code,
                        name: row.origin_name,
                        latitude: parseFloat(row.origin_latitude.toString()),
                        longitude: parseFloat(row.origin_longitude.toString())
                    }

                    const destinationAirport: Airport = {
                        iataCode: row.destination_iata_code,
                        name: row.destination_name,
                        latitude: parseFloat(row.destination_latitude.toString()),
                        longitude: parseFloat(row.destination_longitude.toString())
                    }

                    const ticket: Ticket = {
                        originCode: row.origin,
                        destinationCode: row.destination,
                        airline: row.airline,
                        flightNumber: row.flight_num,
                        originAirport,
                        destinationAirport
                    }

                    tickets.push(ticket);


                })
            },
            complete: () => {
                // Parsing complete, resolve the promise with all tickets
                resolve(tickets);
              },
            error: (error) => {
                console.log('Error parsing CSV: ', error);
                reject(error);
            }
        })
    }
    )
}
