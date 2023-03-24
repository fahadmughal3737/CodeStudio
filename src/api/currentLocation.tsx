import { weatherApiID } from "../constants/constants";
export const GetCurrentLocation = (lat: number, long: number,) => {
    console.log('lat', lat, 'long', long)
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };
    return fetch("https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + long + "&appid=" + weatherApiID, requestOptions)
}