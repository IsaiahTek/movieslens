<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { RouterLink, RouterView } from 'vue-router'
import { useMovieStore } from './store/movies';

const search_query = ref("")

</script>

<template>
  <header>
    <div class="wrapper">
      <nav>
        <div class="nav-links">
          <div class="home active">
            <RouterLink to="/">MoviesLens</RouterLink>
          </div>
          <div class="explore">
            <RouterLink to="/movies">Explore</RouterLink>
          </div>
        </div>
        <div class="f-half">
          <input v-model="search_query" placeholder="search" type="search" name="search" id="search">
        </div>
        <div class="search-result">
          
        </div>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
header{
  padding: 2% 7%;
  display: block;
  background-color: rgb(3, 32, 30);
  position: sticky;
  top: 0;
  z-index: 1000;
}
input{
  background-color: rgba(0, 0, 0, 0.274);
  color: wheat;
  border: unset;
  border-radius: 5px;
  padding: 2%;
  outline: unset;
  font-size: 20px;
  width: 100%;

}
.f-half{
  width: 50%;
}
nav{
  display: flex;
  justify-content: space-between;
  align-items: center;
}
nav div.nav-links{
  display: flex;
  margin-right: 10px;
}
nav div.nav-links div{
  display: inline;
}
nav div.nav-links div a{
  color: wheat;
  font-size: large;
  text-decoration: unset;
}
nav div.nav-links div.home{
  margin-right: 20px;
}
nav div.nav-links div.home a{
  font-weight: bold;
}

nav div.nav-links div .active a, .nav-links > .active a{
  color: rgb(255, 187, 0);
}
</style>import { onMounted } from 'vue';

