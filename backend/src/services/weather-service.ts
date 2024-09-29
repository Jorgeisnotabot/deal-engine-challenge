import axios from 'axios';
import { Weather } from '../types.js';
import { config } from 'dotenv';
config();

const API_KEY = process.env.OPENWEATHER_API_KEY;

const BASE_URL = "https://api.openweathermap.org/data/2.5/weather?"

export const getWeatherData = async (lat: number, lon: number) => {
    const url = `${BASE_URL}lat=${lat}&lon=${lon}&appid=${API_KEY}`; 
    const response = await axios.get(url);
    return response.data;
}