
<script lang="ts">

import { ref } from "vue";
import MovieCard from "./MovieCard.vue";
import MovieCardPlaceholder from "./MovieCardPlaceholder.vue";
import { setNumberOfButtons } from "@/set_buttons_amount";
const pageIndex = ref(0)
const paginationGroupCurrentIndex = ref(1);
const paginationMaxIndex = ref(0)
const numberOfButtons = ref(5);
setNumberOfButtons(numberOfButtons)
function onPageButtonClicked(page:number, callback:Function){
  pageIndex.value = page;
  callback(page)
}
export default {
  name: 'MoviesListView',
  components:{MovieCard, MovieCardPlaceholder},
  methods:{
    onPageButtonClicked: onPageButtonClicked,
    
    checkIsCurrentPage: (page:number)=>{
      return pageIndex.value == page;
    },

    getCurrentPageIndex:()=>pageIndex.value,
    
    movePaginationControlsBackward: ()=>{
      if(paginationGroupCurrentIndex.value > 1){
        paginationGroupCurrentIndex.value -= 1
      }
    },
    // canGoBack:()=>{}
    getPaginationGroupCurrentIndex:()=>paginationGroupCurrentIndex.value,

    getPaginationItemsCount:(total_pages:number)=>{
      return total_pages - (paginationGroupCurrentIndex.value - 1) * numberOfButtons.value > numberOfButtons.value ? numberOfButtons.value : total_pages - (paginationGroupCurrentIndex.value - 1) * numberOfButtons.value;
    },
    getCurrentPaginationItemValue:(page:number)=>{
      return (paginationGroupCurrentIndex.value - 1 ) * numberOfButtons.value + page;
    },
    movePaginationControlsForward: ()=>{
      if(paginationGroupCurrentIndex.value < paginationMaxIndex.value){
        paginationGroupCurrentIndex.value += 1
      }
    }
  },
  computed:{
    canGoBack:()=>paginationGroupCurrentIndex.value > 1,
    canGoForward: ()=>paginationGroupCurrentIndex.value < paginationMaxIndex.value,
    numberOfButtons : ()=> numberOfButtons.value
  },
  beforeUpdate() {
    paginationMaxIndex.value = Math.ceil(this.movies.total_pages/numberOfButtons.value);
  },
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
    <section class="movies">
      <template v-if="movies.results?.length">
        <div v-for="movie in movies.results" class="movie">
            <MovieCard :movie="movie" @click="$emit('navigateToMovie', movie.id)" />
          </div>   
        </template>
        <template v-else>
          <div v-for="_ in numberOfButtons" class="movie">
            <MovieCardPlaceholder />
          </div>
        </template>
      </section>
      <div v-if="movies.total_pages" class="load-more">
        <!-- <div> -->
          <button :class="canGoBack?'':'disabled'" @click="movePaginationControlsBackward()"><span>&#x2039;</span></button>
          <!-- </div> -->
          <template v-for="page of getPaginationItemsCount(movies.total_pages)">
            <button :class="checkIsCurrentPage(getCurrentPaginationItemValue(page))? 'active': '' " @click="onPageButtonClicked(getCurrentPaginationItemValue(page), fetchByPage)">{{ getCurrentPaginationItemValue(page) }}</button>
          </template>
          <div>
            <button :class="canGoForward?'':'disabled'" @click="movePaginationControlsForward()"><span>&#x203A;</span></button>
          </div>
          <!-- <button @click="fetchByPage(2)">2</button>
            <button @click="fetchByPage(3)">3</button>
            <button @click="fetchByPage(4)">4</button>
            <button @click="fetchByPage(movies.total_pages)">{{movies.total_pages}}</button> -->
          </div>
          <div style="text-align: center;">
            <p>
              Page {{ movies.page }} of {{ movies.total_pages }} Pages AND Showing {{ movies.results.length }} of Total {{ movies.total_results }} Results
            </p>
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
    margin-bottom: 30px;
    text-align: center;
    display: flex;
    justify-content: space-evenly;
    overflow-wrap: break-word;
    flex-wrap: wrap;
  }
  div.load-more button{
    outline: unset;
    border: 2px solid rgba(245, 245, 220, 0.541);
    padding: 10px 20px;
    background-color: rgba(0, 0, 0, 0.26);
    color: wheat;
    font-weight: bold;
    cursor: pointer;
    border-radius: 5px;
    margin: 2px;
  }
  div.load-more button:hover, div.load-more button.active{
    background-color: rgb(255, 255, 255);
    color: rgb(41, 30, 0);
  }
  div.load-more button.disabled{
    appearance: none;
    background-color: rgb(145, 145, 145);
    color: rgb(92, 92, 92);
    cursor: not-allowed;
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