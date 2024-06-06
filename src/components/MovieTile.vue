<script lang="ts">
export default {
  name: 'MovieTile',
  props: {
    movie: {
      type: Object as ()=> Movie,
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
    <img :src=" posterOrBackdropPath()" :alt="movie?.title">
    <!-- <div class="text-container"> -->
    <div class="text-body">
        <div class="primary">
        <h4>{{ movie?.title }}</h4>
        <p class="overflowing-text">{{ movie?.overview }}</p>
        </div>
        <div class="secondary">
        <p>Rating: {{ movie?.vote_average }}</p>
        <p>{{ movie?.vote_count }}</p>
        </div>
    </div>
</template>
<style>
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
  font-size: small;
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
div.text-body{
  font-size: larger;
}
</style>