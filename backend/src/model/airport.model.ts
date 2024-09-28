import { Airport } from "../types.js";
//DUMMY DATA
const airports: Airport[] = [
    {
        name: "Licenciado Adolfo Lopez Mateos International Airport",
        iataCode: "TLC",
        latitude: 19.3371,
        longitude: -99.566
    },
    {
        name: "General Mariano Escobedo International Airport",
        iataCode: "MTY",
        latitude: 25.7785,
        longitude: -100.107
    }
]

export const getAirportsData = async () => {
    return airports;
}