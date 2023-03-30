export const GetData = async () => {
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    return await fetch("https://randomuser.me/api/?results=5000", requestOptions)

}