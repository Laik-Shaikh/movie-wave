import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3"
const TMDB_API_KEY = process.env.REACT_APP_API_KEY;

const API = axios.create({
    baseURL: BASE_URL,
});

export const fetchDataFromApi = async (fetchURL, params) => {
    try {
        const { data } = await API.get(fetchURL, {
            
            params: {
                api_key: process.env.REACT_APP_API_KEY
            }
        });
        return data;
    } catch (error) {
        console.log(error);
        return error;
    }
}
