<script setup lang="ts">
  import { ref, onMounted, computed } from "vue";
  import { useRouter } from 'vue-router';
  import MovieCard from "../components/MovieCard.vue";
  import { useMovieStore } from "@/store/movies";

  const movieStore = useMovieStore();

  const router = useRouter();

  const pageIndex = ref(0);

  const navigateToMovie = (movie:Movie) => {
    router.push({
      name: 'movie',
      params: {id:movie.id},
    });
  };



  
  onMounted(() => {
    movieStore.getUpcomingMovies(1);
  });
  
  const movies = computed(()=> movieStore.upcomingMovies);
  
</script>

<template>
  <main>
    <section class="movies">
      <div v-for="movie in movies" class="movie">
        <MovieCard :title="movie.title" :description="movie.overview" :srcPath="movie.poster_path" :rating="movie.vote_average" :likes="movie.vote_count" :language="movie.original_language" :release_date="movie.release_date" @click="navigateToMovie(movie)" />
      </div>   
    </section>
    <div class="load-more">
      <button>Load More...</button>
    </div>
  </main>
</template>

<style>

main{
  padding: 2% 2%;
}

section.movies{
  display: flex;
  flex-wrap: wrap;
  max-width: 100vw;
  margin: 0 auto;
  padding: 10px;
  /* justify-content: space-around; */
}

section.movies .movie{
  /* flex: 1; */
  width: 48%;
  margin: 0px 1%;
  /* height: 390px; */
}
div.load-more{
  margin-top: 90px;
  margin-bottom: 30vh;
  text-align: center;
}
div.load-more button{
  outline: unset;
  border: 2px solid rgba(245, 245, 220, 0.541);
  padding: 15px 30px;
  background-color: rgba(0, 0, 0, 0.26);
  color: wheat;
  font-weight: bold;
  cursor: pointer;
  border-radius: 5px;
}
div.load-more button:hover{
  background-color: rgb(255, 255, 255);
  color: rgb(41, 30, 0);
}
@media (min-width: 1024px) {
  main{
    padding: 2% 4%;
  }
  section.movies .movie{
    margin: 0px 13px;
    /* min-width: 160px; */
    width: calc(100%/6.9);
  }
}
</style>
