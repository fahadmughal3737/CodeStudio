import { weatherApiID } from "../constants/constants";
export const GetSearchedLocation = (location: string) => {

    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };
    return fetch("https://api.openweathermap.org/data/2.5/weather?q=" + location + "&appid=" + weatherApiID, requestOptions)
}