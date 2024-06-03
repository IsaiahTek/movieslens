<script setup lang="ts">
  import { ref, onMounted } from "vue";
  import MovieCard from "../components/MovieCard.vue";
  
  const headers = {
    Authorization: import.meta.env.TMDB_AUTHORIZATION,
    Accept: import.meta.env.TMDB_API_ACCEPT
  };

  
  interface Movie {
    id: number;
    title: string;
    overview: string;
    poster_path:string;
    vote_average:Number;
    vote_count:Number;
    release_date:string;
    original_language:string;
  }
  
  const movies = ref<Movie[]>([])
  
  function getMovies() {
    fetch(
      'https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1',
      {
        headers: headers
      }
    ).then((response)=>{
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((v)=>{
      movies.value = v.results;
    })
  }

onMounted(() => {
  getMovies();
});

</script>

<template>
  <main>
    <section class="movies">
      <div v-for="movie in movies" class="movie">
        <MovieCard :title="movie.title" :description="movie.overview" :srcPath="movie.poster_path" :rating="movie.vote_average" :likes="movie.vote_count" :language="movie.original_language" :release_date="movie.release_date" />
      </div>   
    </section>
    <div class="load-more">
      <button>Load More</button>
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
