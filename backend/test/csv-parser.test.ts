import { parseTicketsData } from '../src/utils/csv-parser';
import { Ticket } from '../src/types';
import path from 'path';

describe('CSV Parsing with data set file', () => {
    it('should parse the CSV file and return the data', async () => {
        const filePath = path.join(__dirname, '../data/dataset.csv');
        const tickets:Ticket[] = await parseTicketsData(filePath);
         // Check if the tickets are defined and if the CSV was parsed correctly
        expect(tickets).toBeDefined();
        expect(tickets.length).toBeGreaterThan(0);

         // Validate a few sample records to ensure correct parsing
    expect(tickets[0].originCode).toBe('TLC');
    expect(tickets[0].destinationCode).toBe('MTY');
    expect(tickets[1].originCode).toBe('MTY');
    expect(tickets[1].destinationCode).toBe('TLC');

    // Log first 5 rows (optional)
    console.log('Sample Tickets:', tickets.slice(0, 5));
    })
})


