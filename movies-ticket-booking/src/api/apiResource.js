import axios from "axios";

export const upcoming_api_key = '90dda51970ad9d22a9ba585a98c4f127';

export const upcoming = axios.create({
    baseURL: 'https://api.themoviedb.org/3/'
})

export const api = axios.create({
    baseURL: 'http://localhost:3300'
})