<script setup lang="ts">
import { useMovieStore } from '@/store/movies';
import TheWelcome from '../components/MovieCard.vue'
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const movie = ref<Movie|null>(null);

const movieStore = useMovieStore();
onMounted(() => {
  movie.value = movieStore.getMovieByID(Number(route.params.id))
  // Fetch movie details using the movieId here
});
</script>

<template>
  <main>
    <h1>Movie {{ movie?.release_date }}</h1>
  </main>
</template>
