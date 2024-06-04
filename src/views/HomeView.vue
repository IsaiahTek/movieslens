<script setup lang="ts">
import { useMovieStore } from '@/store/movies';
import { ref, onMounted, computed, watch } from 'vue';
import { useRoute } from 'vue-router';
import MoviesListView from '@/components/MoviesListView.vue';

const route = useRoute();
const movie = ref<Movie|null>(null);
const topRatedMovies = ref<Movie[]>([]);

const movieStore = useMovieStore();

onMounted(async() => {
  topRatedMovies.value = await movieStore.getMoviesByType('TOP RATED' as MovieTypes, 1);
  movie.value = (await movieStore.getMoviesByType('UPCOMING' as MovieTypes, 1))[0];
});

const indexOfCurrentMovie = computed(()=>movieStore.upcomingMovies.findIndex(a=>a.id == movie.value?.id))

function scrollTo(){
  const element = document.getElementById('movieView');
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};

function moveCurrentIndexBy(step:number){
  if(step < 0 && indexOfCurrentMovie.value == 0){
    movie.value = movieStore.upcomingMovies[movieStore.upcomingMovies.length-1]
  }else if(step > 0 && indexOfCurrentMovie.value == movieStore.upcomingMovies.length-1){
    movie.value = movieStore.upcomingMovies[0]
  }else{
    movie.value = movieStore.upcomingMovies[indexOfCurrentMovie.value + step]
  }
}

// watch(() => route.params.id, async(newId, oldId) => {
//   if(newId != oldId){
//     scrollTo()
//   }
// })

const imageUrl = 'https://image.tmdb.org/t/p/w300/'+movie.value?.backdrop_path;

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
  return indexOfCurrentMovie.value + id > movieStore.upcomingMovies.length - 1 ? indexOfCurrentMovie.value + id - movieStore.upcomingMovies.length : indexOfCurrentMovie.value + id;
}
</script>

<template>
  <main class="banner">
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
    <div class="upnext-content">
      <h2>Up Next</h2>
      <div v-for="id of 3" class="upnext">
        <img :src=" posterOrBackdropPath(movieStore.upcomingMovies[upNextIndex(id)])" :alt="movieStore.upcomingMovies[upNextIndex(id)]?.title">
        <!-- <div class="text-container"> -->
        <div class="text-body">
          <div class="primary">
            <h4>{{ movieStore.upcomingMovies[upNextIndex(id)]?.title }}</h4>
            <p class="overflowing-text">{{ movieStore.upcomingMovies[upNextIndex(id)]?.overview }} ...</p>
          </div>
          <div class="secondary">
            <p>Rating: {{ movieStore.upcomingMovies[upNextIndex(id)]?.vote_average }}</p>
            <p>{{ movieStore.upcomingMovies[upNextIndex(id)]?.vote_count }}</p>
          </div>
        </div>
    </div>
      <!-- </div> -->
    </div>
  </main>

  <section class="top-rated-movies">
    <h1>Top Rated Movies</h1>
    <MoviesListView class="list" :movies="topRatedMovies" @navigate-to-movie="movieStore.navigateToMovie" ></MoviesListView>
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
.upnext{
  padding: 20px;
  background-color: rgba(255, 255, 255, 0.062);
  display: flex;
  cursor: pointer;
}
.upnext img{
  max-width: 30%;
  margin-right: 5%;
}
.upnext div.primary p.overflowing-text{
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  /* text-overflow: ellipsis; */
}
.upnext div.primary p{
  font-size: smaller;
}
.upnext div.secondary p{
  font-size: x-small;
}
.upnext p{
  color: gray;
}
.upnext .text-body, .upnext .primary, .upnext .secondary{
  display: flex;
  flex-direction: column;
}
.upnext .text-body{
  justify-content: space-between;
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
  div.text-body{
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