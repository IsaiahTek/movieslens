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
    .then((v:{results:Movie[]})=>{
      return v.results;
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
    .then((v:{results:Movie[]})=>{
      return v.results;
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
    .then((v:{results:Video[]})=>{
      return v.results;
    });
    return trailers.filter((trailer)=>trailer.type.toUpperCase() == "TRAILER");
}