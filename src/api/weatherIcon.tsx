export const GetIcon = (icon:string) => {
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };
    return fetch("http://openweathermap.org/img/wn/" +icon+"@4x.png", requestOptions)
}