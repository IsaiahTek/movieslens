<script setup lang="ts">
import { useMovieStore } from '@/store/movies';
import { ref, onMounted, computed, watch } from 'vue';
import { useRoute } from 'vue-router';
import MoviesListView from '@/components/MoviesListView.vue';

const route = useRoute();
const movie = ref<Movie|null>(null);
const similarMovies = ref<Movie[]>([]);

const movieStore = useMovieStore();
async function initData(){
  movie.value = movieStore.getMovieByID(Number(route.params.id))  
  similarMovies.value = await movieStore.getSimilarMovies(Number(route.params.id), 1);
}

onMounted(async() => {
  await movieStore.getUpcomingMovies(1);
  await initData();
});

function scrollTo(){
  const element = document.getElementById('movieView');
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};

watch(() => route.params.id, async(newId, oldId) => {
  if(newId != oldId){
    await initData()
    scrollTo()
  }
})

const imageUrl = 'https://image.tmdb.org/t/p/w300/'+movie.value?.backdrop_path;

const posterOrBackdropPath = ()=>{
  let prefix = 'https://image.tmdb.org/t/p/w185/';
  let base = movie.value?.poster_path ?? movie.value?.backdrop_path;
  if(movie.value?.poster_path || movie.value?.backdrop_path){
    return prefix+base;
  }else{
    return '../placeholder.jpeg'
  }
}
const backdropPathOrPlaceholder = ()=>{
  let prefix = 'https://image.tmdb.org/t/p/original/';
  let base = movie.value?.backdrop_path ?? movie.value?.poster_path;
  if(movie.value?.poster_path || movie.value?.backdrop_path){
    return prefix+base;
  }else{
    return '../placeholder.jpeg'
  }
}

const backgroundImageStyle = computed(() => ({
  backgroundImage: `url(${imageUrl})`,
  backgroundSize: 'cover', // Optional: Adjust as needed
  backgroundPosition: 'center', // Optional: Adjust as needed
}));

</script>

<template>
  <img :src="backdropPathOrPlaceholder()" :alt="movie?.title" class="backdrop-img">
  <!-- <div class="backdrop"></div> -->
  <main class="movie-view" id="movieView">
    <section class="movie-view">
      <div class="poster">
        <img :src="posterOrBackdropPath()" :alt="movie?.title">
      </div>
      <div class="content">
        <h1>{{ movie?.title }}</h1>
        <p>{{ movie?.overview }}</p>
        <p>Genres: {{ movieStore.getGenreNames(movie?.genre_ids) }}</p>
        <p>Rating: {{ movie?.vote_average.toString().substring(0, 3)}}</p>
        <p>Original Language: {{ movieStore.getLanguageEnglishName(movie?.original_language) }}</p>
        <p>Released Date: {{ movie?.release_date }}</p>
      </div>
    </section>
  </main>
  <section class="similar-movies">
    <h1>Similar Movies</h1>
    <MoviesListView class="list" :movies="similarMovies" @navigate-to-movie="movieStore.navigateToMovie" ></MoviesListView>
  </section>
</template>
<style scoped>
img.backdrop-img{
  width: 100%;
  max-height: 110vh;
}
/* div.backdrop{
  content: "";
  background-color: black;
  position: absolute;
  top: 50vh;
  height: 100vh;
  width: 100vw;
} */
main.movie-view{
  padding: 80vh 5% 10px 5%;
  position: relative;
  top:-120vh;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.315), rgba(1, 15, 14, 0.897), rgb(1, 15, 14))
}
/* main img{
  width: 100%;
} */
main > section.movie-view{
  display: flex;
  z-index: 2; /* Ensure content is above the overlay */
  color: white;
}
section .poster{
  min-width: 26vw;
  margin-right: 2%;
}
section .poster img{
  width: 100%;
}
section .content{
  font-size: 1.3rem;
}
section .content h1{
  font-size: 3rem;
}
section .content p{
  margin: 15px 0px;
}
section.similar-movies{
  margin-top: -120vh;
}
section.similar-movies .list{
  margin-top: -30px;
}
section.similar-movies h1{
  padding: 5% 20px 0px 5%;
  color: rgb(255, 187, 0);
  font-weight: bold;
  font-size: xx-large;
}
@media (min-width: 794px) {
  main.movie-view{
    display: flex;
  }
}
</style>