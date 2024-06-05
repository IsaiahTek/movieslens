<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { RouterLink, RouterView } from 'vue-router'
import { useMovieStore } from './store/movies';
import MovieTile from './components/MovieTile.vue';
import MovieTilePlaceholder from './components/MovieTilePlaceholder.vue';

const movieStore = useMovieStore();
const searchResults = ref<Movie[]>([]);

const search_query = ref("");

const showSearchResults = ref<boolean>(false);
const isTypingOrIsFocused = ref<boolean>(false);


function handleNavigation(id:number){
  movieStore.navigateToMovie(id);
  showSearchResults.value = false;
}
watch(()=>search_query.value, async(newValue:string, oldValue:string)=>{
  if(newValue != oldValue && newValue.length > 3){
    await movieStore.fetchSearchResults(newValue);
    searchResults.value = movieStore.searchResults;
    showSearchResults.value = true;
  }
  if(newValue.length == 0){
    showSearchResults.value = false;
  }else{
    showSearchResults.value = true;
  }
});
const inputHandle = ref<HTMLElement|null>(null);
onMounted(()=>{
  inputHandle.value = document.getElementById('search');
  inputHandle!.value!.onfocus = (e)=>{
    isTypingOrIsFocused.value = true;
    showSearchResults.value = true;
  };
  inputHandle!.value!.onblur = (e)=>{
    isTypingOrIsFocused.value = false;
    showSearchResults.value = false;
  }

})
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
        <div class="search-result" v-if="showSearchResults && searchResults.length">
          <div v-for="result in searchResults" class="upnext" @click="handleNavigation(result.id)">
            <template v-if="typeof result != 'undefined'">
              <MovieTile :movie="result as Movie"></MovieTile>
            </template>
          </div>
        </div>
        <div class="search-result" v-else-if="showSearchResults && search_query.length">
          <div class="upnext">
            <MovieTilePlaceholder ></MovieTilePlaceholder>
          </div>
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
  padding: 2% 8%;
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
.search-result{
  position: absolute;
  top: 50px;
  right: 0%;
  background-color: rgba(1, 27, 27, 0.973);
  z-index: 100;
  width: 100%;
  overflow-y: scroll;
  max-height: 80vh;
  /* height: 70vh; */
}
@media (min-width: 794px) {
  .search-result{
    width: 40%;
    right: 8%;
    top: 90px;
  }
}
</style>

