<script lang="ts">

export default {
  name: 'MovieCard',
  props: {
    movie: {
      type: Object as () => Movie,
      required: true
    },
  },
  methods:{
    posterOrBackdropPath(){
      let prefix = 'https://image.tmdb.org/t/p/w185/';
      let base = this.movie?.poster_path ?? this.movie?.backdrop_path;
      if(this.movie?.poster_path || this.movie?.backdrop_path){
        return prefix+base;
      }else{
        return '../placeholder.jpeg'
      }
    }
  }
};
</script>

<template>
  <div class="movie-card">
    <img :src="posterOrBackdropPath()" :alt="movie.title">
    <div class="movie-text-box">
      <div class="content">
        <p class="movie-title">{{movie.title}}</p>
        <p> &#x2B50; Rating: {{ movie.vote_average.toString().substring(0, 3) }}</p>
        <p> Language: {{ movie.original_language }}</p>
        <p> Released: {{ movie.release_date }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.movie-card{
  border-radius: 20px;
  border: 2px solid rgba(255, 255, 255, 0.082);
  margin-bottom: 20px;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;
}
.movie-card:hover{
  transform: scale(1.03);
  transition: all ease .3s;
}
.movie-title{
  font-size: large;
  max-width: 100%;
  font-weight: bold;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
.movie-card img{
  border-radius: 20px 20px 0px 0px;
  width: 100%;
  height: 220px;
  margin-bottom: 0px;
}
.movie-text-box{
  background-color: rgba(255, 255, 255, 0.082);
  display: block;
  padding: 10px 10px 50px 10px;
  /* text-justify: distribute; */
  /* text-align: justify; */
  max-height: 120px;
  text-wrap: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  margin-top: -10px;
  box-sizing: border-box;
  font-size: small;
}
</style>