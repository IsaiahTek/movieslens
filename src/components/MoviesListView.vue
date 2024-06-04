
<script lang="ts">
type Movies = Movie[];

import MovieCard from "./MovieCard.vue";
export default {
  name: 'MoviesListView',
  components:{MovieCard},
  props: {
    movies: {
      type: Array as () => Movies,
      required: true
    },
  },
};

</script>
<template>
    <main>
      <section class="movies">
        <div v-for="movie in movies" class="movie">
          <MovieCard :movie="movie" @click="$emit('navigateToMovie', movie.id)" />
        </div>   
      </section>
      <div class="load-more">
        <button>Load More...</button>
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