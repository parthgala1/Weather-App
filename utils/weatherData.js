import request from "request";
import constants from "../config.js";

const weatherData = (address, callback) => {
    const url = constants.openWeatherMap.BASE_URL + encodeURIComponent(address) + '&appid=' + constants.openWeatherMap.SECRET_KEY;

    request({url, json: true}, (error, {body}) => {
        if(error) {
            callback("Can't fetch data from open weather map api", undefined)
        }
        else {
            callback(undefined,{
                temperature: body.main.temp,
                desc: body.weather[0].description,
                cityName: body.name
            })
        }
    })
}

export default weatherData;