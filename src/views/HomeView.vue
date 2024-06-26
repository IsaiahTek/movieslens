<script setup lang="ts">
import { useMovieStore } from '@/store/movies';
import { ref, onMounted, computed, watch } from 'vue';
import { useRoute } from 'vue-router';
import MoviesListView from '@/components/MoviesListView.vue';
import MovieTile from '@/components/MovieTile.vue';
import MovieTilePlaceholder from '@/components/MovieTilePlaceholder.vue';
import { emptyMoviesApi } from '@/store/fetch_functions';

const route = useRoute();
const movie = ref<Movie|null>(null);
const upcomingMovies = ref<Movie[]>([]);
const topRatedMovies = ref<MoviesApiType>(emptyMoviesApi);

const movieStore = useMovieStore();

onMounted(async() => {
  topRatedMovies.value = await movieStore.getTopRatedMovies(1);
  upcomingMovies.value = (await movieStore.getUpcomingMovies(1)).results
  movie.value = upcomingMovies.value[0];
});

const indexOfCurrentMovie = computed(()=>upcomingMovies.value.findIndex(a=>a.id == movie.value?.id))

async function getTopRatedMoviesForPage(page:number){
  topRatedMovies.value = await movieStore.getTopRatedMovies(page);
}

function moveCurrentIndexBy(step:number){
  if(step < 0 && indexOfCurrentMovie.value == 0){
    movie.value = upcomingMovies.value[upcomingMovies.value.length-1]
  }else if(step > 0 && indexOfCurrentMovie.value == upcomingMovies.value.length-1){
    movie.value = upcomingMovies.value[0]
  }else{
    movie.value = upcomingMovies.value[indexOfCurrentMovie.value + step]
  }
}

const posterOrBackdropPath = (movie:Movie|null)=>{
  let prefix = 'https://image.tmdb.org/t/p/w185/';
  let base = movie?.poster_path ?? movie?.backdrop_path;
  if(movie?.poster_path || movie?.backdrop_path){
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
const upNextIndex = (id:number)=>{
  return indexOfCurrentMovie.value + id > upcomingMovies.value.length - 1 ? indexOfCurrentMovie.value + id - upcomingMovies.value.length : indexOfCurrentMovie.value + id;
}
</script>

<template>
  <main class="banner">
    <template v-if="movie">
      <div class="main-content">
        <div class="img-container">
          <button @click="moveCurrentIndexBy(-1)" class="ctrl prev"> <span>&#x2039;</span></button>
          <img :src="backdropPathOrPlaceholder()" :alt="movie?.title">
          <button @click="moveCurrentIndexBy(1)" class="ctrl next"> <span>&#x203A;</span></button>
        </div>
        <div class="backdrop"></div>
        <div class="movie-card">
          <img :src="posterOrBackdropPath(movie)" :alt="movie?.title">
          <div class="text-box">
            <h1>{{ movie?.title }}</h1>
            <p>{{ movie?.overview }}</p>
            <p>Rating: {{ movie?.vote_average }}</p>
            <p> &#128077; {{ movie?.vote_count }}</p>
          </div>
        </div>
      </div>
    </template>
    <template v-else>
      <div class="main-content">
        <div class="img-container placeholder-glow">
          <img class="placeholder" style="max-height: 50vh; min-width: 100%; background-size: contain; background-position: center;" :src="backdropPathOrPlaceholder()" >
        </div>
        <div class="backdrop"></div>
        <div class="movie-card placeholder-glow">
          <img class="placeholder" :src="posterOrBackdropPath(movie)">
          <div class="text-box width-100" style="display: flex; flex-direction: column">
            <h1 class="placeholder width-40 height-40"></h1>
            <p class="placeholder width-90 height-20"></p>
            <p class="placeholder width-60 height-20"></p>
            <p class="placeholder width-30 height-20"></p>
          </div>
        </div>
      </div>
    </template>
    <div class="upnext-content">
      <h2>Up Next</h2>
      <template v-if="upcomingMovies.length">
        <div v-for="id of 3" class="upnext" @click="movieStore.navigateToMovie(upcomingMovies[upNextIndex(id)].id)">
          <template v-if="typeof upcomingMovies[upNextIndex(id)] != 'undefined'">
            <MovieTile :movie="upcomingMovies[upNextIndex(id)] as Movie" ></MovieTile>
          </template>
        </div>
      </template>
      <template v-else>
        <div v-for="id of 3" >
          <MovieTilePlaceholder ></MovieTilePlaceholder>
        </div>
      </template>
    </div>
  </main>

  <section class="top-rated-movies">
    <h1>Top Rated Movies</h1>
    <MoviesListView :fetch-by-page="getTopRatedMoviesForPage" class="list" :movies="topRatedMovies" @navigate-to-movie="movieStore.navigateToMovie" ></MoviesListView>
  </section>
</template>

<style scoped>
main.banner div.main-content{
  display: grid;
}
/* main .main-content .img-container{
  display: block;
} */
.main-content .backdrop{
  background: linear-gradient(to bottom, transparent, rgba(1, 15, 14, 0.589), rgb(1, 15, 14));
  position: relative;
  /* background-color: red; */
  z-index: 1;
  top: -100%;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 60vh;
}
main.banner .main-content .img-container button.ctrl{
  position: absolute;
  width: 50px;
  top: 0;
  bottom: 0;
  background-color: transparent;
  border: unset;
  cursor: pointer;
  z-index: 20;
}
button.ctrl span:hover{
  background-color: rgba(255, 255, 255, 0.795);
  transition: all ease .3s;
}
button.ctrl.prev{
  left: 0;
}
button.ctrl.next{
  right: 0;
}
button.ctrl span{
  background-color: rgba(255, 255, 255, 0.432);
  display: flex;
  border-radius: 5px;
  align-content: center;
  justify-content: center;
  padding: 10px 20px;
  font-size: 2rem;
  position: relative;
  top: 8%;
  cursor: pointer;
}
main.banner div.main-content div.img-container img{
  max-width: 100%;
}
main.banner div.main-content div.img-container{
  position: relative;
  /* top: 0px; */
}
main.banner div.movie-card{
  padding: 0px 5%;
  position: relative;
  top: -80vh;
  display: block;
  z-index: 10;
  /* background-color: red; */
}
main.banner div.movie-card img{
  max-width: 35%;
}
.upnext-content{
  margin-top: -80vh;
  margin-left: 3%;
  margin-right: 3%;
  
}
.upnext-content h2{
  color: bisque;
  font-weight: bold;
}

.list{
  margin-top: -4%;
}
section.top-rated-movies h1{
  padding: 02% 5% 0px 5%;
  font-weight: bold;
  font-size: xx-large;
  color: rgb(255, 187, 0);
  margin-bottom: 30px;
}

/* PLACEHOLDER TEXT BOX ITEM VERTICAL MARGIN SETTING */
.text-box p, .text-box h1{
  margin-top: 10px;
}
@media(min-width: 760px){
  main.banner{
    display: flex;
    transition: all ease 3s;
  }
  main.banner div.main-content{
    margin-left: 5%;
    min-width: 60%;
    max-width: 60%;
  }
  main.banner div.main-content .movie-card{
    display: flex;
    align-items: center;
  }
  main.banner .main-content img{
    margin-right: 5%;
  }
  .text-box{
    font-size: larger;
  }
  
  main.banner div.upnext-content{
    margin-right: 5%;
  }
  .upnext-content{
    margin-top: 0%;
  }
  section.top-rated-movies{
    margin-top: -70vh;
  }
}
</style>