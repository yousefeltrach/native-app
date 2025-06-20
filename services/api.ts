export const TMDB_CONFIG = {
    BASE_URL : `https://api.watchmode.com/v1/sources/?apiKey=${process.env.EXPO_PUBLIC_MOVIE_API_KEY}`,
    API_KEY : process.env.EXPO_PUBLIC_MOVIE_API_KEY ,
    headers: {
      accept: "application/json",
      authorization:` "Bearer" ${process.env.EXPO_PUBLIC_MOVIE_API_KEY}`,
    }
}                                 
//https://api.watchmode.com/v1/search/          

export const fetchMovies = async ({query}:{query:string}) => {
    const endpoint = query
      ? `${TMDB_CONFIG.BASE_URL}/v1/search?query=${encodeURIComponent(query)}`     
      : `${TMDB_CONFIG.BASE_URL}/v1/releases/`;
    const res = await fetch (endpoint,{
      method: "GET",
      headers: TMDB_CONFIG.headers,
    });
      if (!res.ok) {
        throw new Error(`Error fetching movies: ${res.statusText}`);
      
    }
    const data = await res.json();
    return data; 
}
