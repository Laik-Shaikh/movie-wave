import axios from "axios";

export const BASE_URL = "https://api.themoviedb.org/3"
export const TMDB_API_KEY = process.env.REACT_APP_API_KEY;

const API = axios.create({
    baseURL: BASE_URL,
});

export const fetchDataFromApi = async (fetchURL, params) => {
    console.log(params);
    try {
        const { data } = await API.get(fetchURL, {
            
            params: params
        });
        return data;
    } catch (error) {
        console.log(error);
        return error;
    }
}
