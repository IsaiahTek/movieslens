import { defineStore } from "pinia";

interface MovieState{
  upcomingMovies:Movie[],
  lastFetchedPage:0,
}
const headers = {
  Authorization: import.meta.env.VITE_API_AUTHORIZATION,
  accept: import.meta.env.VITE_API_ACCEPT
};
export const useMovieStore = defineStore('movie', {
  state: (): MovieState =>({
    upcomingMovies: [],
    lastFetchedPage:0,
  }),
  actions:{
    getUpcomingMovies(page:number) {
        console.log("Requested fetching")
      if(page == this.lastFetchedPage+1){
        fetch(
          `https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=${page}`,
          {
            headers: headers
          }
        ).then((response)=>{
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }else if(response.ok){
            this.incrementLastFetchedPage();
            return response.json();
          }
        })
        .then((v)=>{
          console.log("Fetched and adding new upcomingMovies")
          this.addMovies(v.results);
        });
      }
    },
    addMovies(upcomingMovies:Movie[]){
      console.log("Adding")
      this.upcomingMovies.push(...this.upcomingMovies, ...upcomingMovies);
    },
    getMovieByID(id:number):Movie|null{
      let movie = this.upcomingMovies.find((movie)=>movie.id==id);
      if(movie){
        return movie;
      }else{
        return null;
      }
    },
    incrementLastFetchedPage(){
      this.lastFetchedPage += 1;
    }
  }
});