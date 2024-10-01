// import { getCachedWeatherData } from "../services/weather-service.js";
// import { Ticket, WeatherReport, Weather } from "../types.js";

// export const getWeatherForTickets = async (tickets: Ticket[]): Promise<WeatherReport[]> => {
//     const weatherReport: WeatherReport[] = [];
//     for (const ticket of tickets) {

//         // Fetch weather data for origin and destination airports
//         const originWeatherData = await getCachedWeatherData(ticket.originAirport.latitude, ticket.originAirport.longitude);
//         const destinationWeatherData = await getCachedWeatherData(ticket.destinationAirport.latitude, ticket.destinationAirport.longitude);

//         // Map OpenWeather API to our internal Weather interface
        
//         const originWeather: Weather = {
//             temp: originWeatherData.main.temp,
//             description: originWeatherData.weather[0].description,
//             humidity: originWeatherData.main.humidity,
//             windSpeed: originWeatherData.wind.speed
//         }

//         const destinationWeather: Weather = {
//             temp: destinationWeatherData.main.temp,
//             description: destinationWeatherData.weather[0].description,
//             humidity: destinationWeatherData.main.humidity,
//             windSpeed: destinationWeatherData.wind.speed
//         }

//         // Create a WeatherReport object and add it to the array

//         weatherReport.push({
//             ticket,
//             originWeather,
//             destinationWeather
//         })
//     }
//     return weatherReport;
// }