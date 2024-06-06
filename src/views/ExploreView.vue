<script setup lang="ts">
  import { ref, onMounted, computed, watch } from "vue";
  import { useRouter } from 'vue-router';
  import MoviesListView from "../components/MoviesListView.vue";
  import { useMovieStore } from "@/store/movies";
import { emptyMoviesApi } from "@/store/fetch_functions";

  const movieStore = useMovieStore();

  
  const router = useRouter();
  const movies = ref<MoviesApiType>(emptyMoviesApi)
  
  const pageIndex = ref(0);
  
  const typeIndex = ref(0)
  
  onMounted(async() => {
    movies.value = await movieStore.getUpcomingMovies(1);
  });

  async function handleConditionalFetchAndCommit(page:number){
    let fetchedMovies;
      switch (typeIndex.value) {
        case movieTypes.indexOf("NOW PLAYING"):
          fetchedMovies = await movieStore.getNowPlayingMovies(page)
          break;
        case movieTypes.indexOf("POPULAR"):
          fetchedMovies = await movieStore.getPopularMovies(page)
          break;
        case movieTypes.indexOf("TOP RATED"):
          fetchedMovies = await movieStore.getTopRatedMovies(page)
          break;
        default:
          fetchedMovies = await movieStore.getUpcomingMovies(page)
          break;
      }
      movies.value = fetchedMovies;
  }
  async function getMoviesForPage(page:number){
    console.log(`FETCHING ${movieTypes[typeIndex.value]} MOVIES AT PAGE ${page}`)
    await handleConditionalFetchAndCommit(page);
  }

  const movieTypes = ["UPCOMING", "NOW PLAYING", "POPULAR", "TOP RATED"]

  watch(()=>typeIndex.value, async(newIndex, oldIndex)=>{
    if(newIndex != oldIndex){
      await handleConditionalFetchAndCommit(1)
    }
  })
</script>
<template>
  <nav class="movie-type-links">
    <h1>Explore Movies</h1>
    <button v-for="(type, id) in movieTypes" @click="()=>typeIndex = id" :class="typeIndex==id?'active':''">{{type}}</button>
  </nav>
  <MoviesListView :fetch-by-page="getMoviesForPage" :movies="movies" @navigate-to-movie="movieStore.navigateToMovie" />
</template>

<style scoped>
nav.movie-type-links{
  padding: 3% 3% 0% 6%;
}
nav.movie-type-links h1{
  font-weight: bold;
  font-size: xx-large;
  color: rgb(255, 187, 0);
  margin-bottom: 30px;
}
nav.movie-type-links button{
  padding: 15px 10px;
  border: 2px solid transparent;
  outline: unset;
  background-color: transparent;
  color: white;
  font-size: x-small;
  font-weight: bold;
  cursor: pointer;
}
nav.movie-type-links button.active{
  border-bottom: 2px solid rgb(255, 187, 0);
  transition: all ease 1s;
}
@media (min-width: 794px) {
  nav.movie-type-links button{
    padding: 15px 40px;
    font-size: large;
  }
}
</style>