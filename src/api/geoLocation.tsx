import { GoogleAPIKEY } from "../constants/constants";
export const GetLocation =  (lat: number, long: number,) => {
    console.log('lat', lat, 'long', long)
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };
    return fetch("https://maps.googleapis.com/maps/api/geocode/json?latlng=" + lat + "," + long + "&key=" + GoogleAPIKEY, requestOptions)
}