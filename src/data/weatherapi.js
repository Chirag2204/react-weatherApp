import axios from 'axios'
import dotenv from 'dotenv'

dotenv.config();

const baseUrl = 'http://api.openweathermap.org/data/2.5/weather?'
export const getWeatherData = async (cityname) => {
    try {
        console.log(process.env.API_key);
        const { data } = await axios.get(baseUrl + `q=${cityname}&appid=process.env.API_KEY`)
        console.log(data);
        return data
    } catch (error) {
        throw error;
    }
}
