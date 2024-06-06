
<script lang="ts">

import MovieCard from "./MovieCard.vue";
import MovieCardPlaceholder from "./MovieCardPlaceholder.vue";

export default {
  name: 'MoviesListView',
  components:{MovieCard, MovieCardPlaceholder},
  props: {
    movies: {
      type: Object as () => MoviesApiType,
      required: true
    },
    fetchByPage: {
      type: Function,
      required: true
    }
  },
};

</script>
<template>
  <main>
    <div>
      <p>
        <!-- Page {{ movies.page }} of {{ movies.total_pages }} Pages AND Showing {{ movies.results.length }} of Total {{ movies.total_results }} Results -->
      </p>
    </div>
      <section class="movies">
        <template v-if="movies.results?.length">
          <div v-for="movie in movies.results" class="movie">
            <MovieCard :movie="movie" @click="$emit('navigateToMovie', movie.id)" />
          </div>   
        </template>
        <template v-else>
          <div v-for="_ in 10" class="movie">
            <MovieCardPlaceholder />
          </div>
        </template>
      </section>
      <div v-if="movies.total_pages" class="load-more">

        <button @click="fetchByPage(1)">1</button>
        <button @click="fetchByPage(2)">2</button>
        <button @click="fetchByPage(3)">3</button>
        <button @click="fetchByPage(4)">4</button>
        <button @click="fetchByPage(movies.total_pages)">{{movies.total_pages}}</button>
      </div>
    </main>
  </template>
  
  <style scoped>
  
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
    width: 47%;
    margin: 0px 1%;
    /* height: 390px; */
  }
  div.load-more{
    margin-top: 90px;
    margin-bottom: 30vh;
    text-align: center;
    display: flex;
    justify-content: space-evenly;
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
  @media (min-width: 584px) {
    main{
      padding: 2% 4%;
    }
    section.movies .movie{
      margin: 0px 13px;
      /* min-width: 160px; */
      width: calc(calc(92%/3) - 14px);
    }
  }
  @media (min-width: 745px) {
    main{
      padding: 2% 4%;
    }
    section.movies .movie{
      margin: 0px 13px;
      /* min-width: 160px; */
      width: calc(calc(92%/4) - 14px);
    }
  }
  @media (min-width: 1024px) {
    main{
      padding: 2% 4%;
    }
    section.movies .movie{
      margin: 0px 13px;
      /* min-width: 160px; */
      width: calc(calc(92%/5) - 14px);
    }
  }
  @media (min-width: 1246px) {
    main{
      padding: 2% 4%;
    }
    section.movies .movie{
      margin: 0px 13px;
      /* min-width: 160px; */
      width: calc(calc(92%/6) - 14px);
    }
  }
  </style>