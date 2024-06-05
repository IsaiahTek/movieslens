<script setup lang="ts">
  import { ref, onMounted, computed, watch } from "vue";
  import { useRouter } from 'vue-router';
  import MoviesListView from "../components/MoviesListView.vue";
  import { useMovieStore } from "@/store/movies";

  const movieStore = useMovieStore();

  onMounted(() => {
    movieStore.getUpcomingMovies(1);
  });

  const router = useRouter();
  const movies = ref<Movie[]>([])
  
  const types = ["UPCOMING", "NOW PLAYING", "TOP RATED", "POPULAR"]
  
  const pageIndex = ref(0);
  
  const typeIndex = ref(0)

  movies.value = movieStore.upcomingMovies;
  
  watch(()=>typeIndex.value, async(newIndex, oldIndex)=>{
    if(newIndex != oldIndex){
      movies.value = await movieStore.getMoviesByType(types[newIndex] as MovieTypes, 1)
    }
  })
</script>
<template>
  <nav class="movie-type-links">
    <h1>Explore Movies</h1>
    <button v-for="(type, id) in types" @click="()=>typeIndex = id" :class="typeIndex==id?'active':''">{{type}}</button>
  </nav>
  <MoviesListView :movies="movies" @navigate-to-movie="movieStore.navigateToMovie" />
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