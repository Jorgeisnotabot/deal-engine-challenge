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


// parse in batches

export const parseTicketsDataPaginated = (filePath: string, page: number, batchSize: number): Promise<{ tickets: Ticket[], totalPages: number }> => {
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
                    };

                    const destinationAirport: Airport = {
                        iataCode: row.destination_iata_code,
                        name: row.destination_name,
                        latitude: parseFloat(row.destination_latitude.toString()),
                        longitude: parseFloat(row.destination_longitude.toString())
                    };

                    const ticket: Ticket = {
                        originCode: row.origin,
                        destinationCode: row.destination,
                        airline: row.airline,
                        flightNumber: row.flight_num,
                        originAirport,
                        destinationAirport
                    };
                   
                    tickets.push(ticket);
                });
            },
            complete: () => {
                // Calculate total pages
                const totalTickets = tickets.length;
                const totalPages = Math.ceil(totalTickets / batchSize);
                
                // Calculate the start and end index for the current page
                const startIndex = (page - 1) * batchSize;
                const endIndex = page * batchSize;
                
                // Get the tickets for the current page
                const paginatedTickets = tickets.slice(startIndex, endIndex);
                
                resolve({
                    tickets: paginatedTickets,
                    totalPages: totalPages
                });
            },
            error: (error) => {
                console.log('Error parsing CSV: ', error);
                reject(error);
            }
        });
    });
};