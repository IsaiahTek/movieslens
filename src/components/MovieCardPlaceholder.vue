<script lang="ts">

export default {
  name: 'MovieCard',
  methods:{
    posterOrBackdropPath(){
      return '../placeholder.jpeg'
    }
  }
};
</script>

<template>
  <div class="movie-card placeholder-glow">
    <img class="placeholder" :src="posterOrBackdropPath()">
    <div class="movie-text-box">
      <div class="content">
        <h1 class="movie-title placeholder width-40 height-20"></h1>
        <p class="placeholder width-90 height-20"></p>
        <p class="placeholder width-80 height-20"></p>
        <p class="placeholder width-20 height-20"></p>
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
  height: 100%;
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
.movie-text-box .content{
  display: flex;
  flex-direction: column;
}
</style>