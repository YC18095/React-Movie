import axios from "axios"

const apiKey = "25b35c5d5d131cf96dde327b09e51dad"


const baseApi = axios.create({
    baseURL: 'https://api.themoviedb.org/3/movie/popular'
});


const movieImagesUrl = 'https://image.tmdb.org/t/p/original'

const movieImagew500 = 'https://image.tmdb.org/t/p/w500'



export { apiKey, baseApi, movieImagesUrl, movieImagew500 }