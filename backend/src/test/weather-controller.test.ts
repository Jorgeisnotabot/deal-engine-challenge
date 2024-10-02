// import { getWeatherForAllTickets } from "../controller/weather.controller.js";
// import { Ticket } from "../types.js";
// import { getCachedWeatherData } from "../services/weather-service.js";

// // Mock the weather service
// jest.mock('../services/weather-service.js', () => ({
//     getCachedWeatherData: jest.fn()
// }));

// describe('getWeatherForAllTickets', () => {
//     it('should fetch weather data for all tickets in parallel', async () => {
//         // Arrange
//         const mockTickets: Ticket[] = [
//             {
//                 originCode: 'TLC',
//                 destinationCode: 'MTY',
//                 airline: '4O',
//                 flightNumber: '104',
//                 originAirport: {
//                     iataCode: 'TLC',
//                     name: 'Licenciado Adolfo Lopez Mateos International Airport',
//                     latitude: 19.3371,
//                     longitude: -99.566
//                 },
//                 destinationAirport: {
//                     iataCode: 'MTY',
//                     name: 'General Mariano Escobedo International Airport',
//                     latitude: 25.7785,
//                     longitude: -100.107
//                 }
//             },
//             {
//                 originCode: 'MTY',
//                 destinationCode: 'TLC',
//                 airline: '4O',
//                 flightNumber: '119',
//                 originAirport: {
//                     iataCode: 'MTY',
//                     name: 'General Mariano Escobedo International Airport',
//                     latitude: 25.7785,
//                     longitude: -100.107
//                 },
//                 destinationAirport: {
//                     iataCode: 'TLC',
//                     name: 'Licenciado Adolfo Lopez Mateos International Airport',
//                     latitude: 19.3371,
//                     longitude: -99.566
//                 }
//             },
//             {
//                 originCode: 'MEX',
//                 destinationCode: 'MTY',
//                 airline: '4O',
//                 flightNumber: '2100',
//                 originAirport: {
//                     iataCode: 'MEX',
//                     name: 'Licenciado Benito Juarez International Airport',
//                     latitude: 19.4363,
//                     longitude: -99.0721
//                 },
//                 destinationAirport: {
//                     iataCode: 'MTY',
//                     name: 'General Mariano Escobedo International Airport',
//                     latitude: 25.7785,
//                     longitude: -100.107
//                 }
//             },
//             {
//                 originCode: 'MTY',
//                 destinationCode: 'MEX',
//                 airline: '4O',
//                 flightNumber: '2101',
//                 originAirport: {
//                     iataCode: 'MTY',
//                     name: 'General Mariano Escobedo International Airport',
//                     latitude: 25.7785,
//                     longitude: -100.107
//                 },
//                 destinationAirport: {
//                     iataCode: 'MEX',
//                     name: 'Licenciado Benito Juarez International Airport',
//                     latitude: 19.4363,
//                     longitude: -99.0721
//                 }
//             },
//             {
//                 originCode: 'MEX',
//                 destinationCode: 'MTY',
//                 airline: '4O',
//                 flightNumber: '2102',
//                 originAirport: {
//                     iataCode: 'MEX',
//                     name: 'Licenciado Benito Juarez International Airport',
//                     latitude: 19.4363,
//                     longitude: -99.0721
//                 },
//                 destinationAirport: {
//                     iataCode: 'MTY',
//                     name: 'General Mariano Escobedo International Airport',
//                     latitude: 25.7785,
//                     longitude: -100.107
//                 }
//             }
//         ];

//         const mockWeatherData = [
//             {
//                 temperature: 301.91,
//                 description: 'Clear sky',
//                 humidity: 61,
//                 windSpeed: 5
//             }
//         ];

//         // Mock implementation of getCachedWeatherData
//         (getCachedWeatherData as jest.Mock).mockImplementation((lat, lon) => {
//             if (lat === 19.3371 && lon === -99.566) {
//                 return Promise.resolve(mockWeatherData[0]);
//             } else if (lat === 34.052235 && lon === -118.243683) {
//                 return Promise.resolve(mockWeatherData[1]);
//             }
//         });

//          // Act
//          const weatherReports = await getWeatherForAllTickets(mockTickets);

//          // Assert
//          expect(weatherReports).toEqual(mockWeatherData);
//          expect(getCachedWeatherData).toHaveBeenCalledTimes(5);
//          expect(getCachedWeatherData).toHaveBeenCalledWith(19.3371, -99.566);
//          expect(getCachedWeatherData).toHaveBeenCalledWith(25.7785, -100.107);



//     })
// });