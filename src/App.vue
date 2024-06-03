<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <div class="wrapper">
      <nav>
        <div class="nav-links">
          <div class="home active">
            <RouterLink to="/">MovieLens</RouterLink>
          </div>
          <div class="explore">
            <RouterLink to="/explore">Explore</RouterLink>
          </div>
        </div>
        <div class="f-half">
          <input placeholder="search" type="search" name="search" id="search">
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
  background-color: rgba(255, 255, 255, 0.151);
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
</style>
