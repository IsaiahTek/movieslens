const headers = {
    Authorization: import.meta.env.VITE_API_AUTHORIZATION,
    accept: import.meta.env.VITE_API_ACCEPT
};
type FetchByTypeType = {type:string, page:number}
export async function fetchMovieByType(prop:FetchByTypeType){
    let movie = await fetch(
      `https://api.themoviedb.org/3/movie/${prop.type}?language=en-US&page=${prop.page}`,
      {
        headers: headers
      }
    ).then((response)=>{
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }else if(response.ok){
        return response.json();
      }
    })
    .then((v:MoviesApiType)=>{
      return v;
    });
    return movie;
}
  
export  async function fetchMovieByID(id:number){
    let movie = await fetch(
      `https://api.themoviedb.org/3/movie/${id}`,
      {
        headers: headers
      }
    ).then((response)=>{
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }else if(response.ok){
        return response.json();
      }
    })
    .then((v:Movie)=>{
      return v;
    });
    return movie;
}
  
export async function search(searchQuery:string){
    let results = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(searchQuery)}&include_adult=false&language=en-US&page=1`,
      {
        headers: headers
      }
    ).then((response)=>{
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }else if(response.ok){
        return response.json();
      }
    })
    .then((v:MoviesApiType)=>{
      return v.results as Movie[];
    });
    return results;
}

export async function fetchMovieTrailers(id:number){
    let trailers = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/videos`,
      {
        headers: headers
      }
    ).then((response)=>{
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }else if(response.ok){
        return response.json();
      }
    })
    .then((v:VideosApiType)=>{
      return v.results as Video[];
    });
    return trailers.filter((trailer)=>trailer.type.toUpperCase() == "TRAILER");
}

export async function handleFetchAndCommit(movieType:PaginatedMoviesType, page:number, fetchType:FetchByTypeType){
  if(movieType.pages.every(e=>e.page != page)){
    let upcomingMovies = await fetchMovieByType(fetchType);
    movieType = {...movieType, pages:[...movieType.pages, {page:upcomingMovies.page, movies:upcomingMovies.results, dates:upcomingMovies.dates}]}
    return upcomingMovies;
  }else{
    let foundPage = movieType.pages.find(a=>a.page == page)
    return ({page:page, results:foundPage?.movies, dates:foundPage?.dates, total_pages:movieType.total_pages, total_results: movieType.total_results}) as MoviesApiType
  }
}

export const emptyMoviesApi : MoviesApiType = {
  results: [],
  dates: undefined,
  page: 0,
  total_pages: 0,
  total_results: 0
}