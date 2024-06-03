<script>
export default {
  name: 'MovieCard',
  props: {
    title: {
      type: String,
      required: true
    },
    srcPath: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true
    },
    language: {
      type: String,
      required: true
    },
    likes: {
      type: Number,
      required: true
    },
    release_date:{
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
  }
};
</script>

<template>
  <div class="movie-card" @click="">
    <img :src="'https://image.tmdb.org/t/p/w185/'+srcPath" alt="">
    <div class="movie-text-box">
      <div class="content">
        <p class="movie-title">{{title}}</p>
        <p> &#x2B50; Rating: {{ rating.toString().substring(0, 3) }}</p>
        <p> Language: {{ language }}</p>
        <p> Released: {{ release_date }}</p>
      </div>
    </div>
  </div>
</template>

<style>
.movie-card{
  border-radius: 20px;
  border: 1px solid rgb(105, 105, 105);
  margin-bottom: 20px;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;
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