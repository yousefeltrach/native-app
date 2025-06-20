export const IMDB_CONFIG = {
    BASE_URL : "https://imdb236.p.rapidapi.com/api/imdb",
    API_KEY : process.env.EXPO_PUBLIC_MOVIE_API_KEY ,
    Headers: {
      accept: "application/json",
      authorization:` "Bearer" ${process.env.EXPO_PUBLIC_MOVIE_API_KEY}`,
    }
}                                           