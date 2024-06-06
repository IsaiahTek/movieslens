<script lang="ts">
export default {
  name: 'MovieTile',
  methods:{
    posterOrBackdropPath(){
      return '../placeholder.jpeg'
    }
  }
};
</script>
<template>
  <div class="placeholder-glow upnext">
    <img :src=" posterOrBackdropPath()" class="placeholder">
    <!-- <div class="text-container"> -->
    <div class="text-body">
        <div class="primary">
        <h4 class="placeholder width-80 height-20"></h4>
        <p class="overflowing-text placeholder width-90 height-20"></p>
        </div>
        <div class="secondary">
        <p class="placeholder width-40 height-20"></p>
        <p class="placeholder width-20 height-20"></p>
        </div>
    </div>
  </div>
</template>
<style>

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
.upnext p{
  color: gray;
}
.upnext .text-body, .upnext .primary, .upnext .secondary{
  display: flex;
  flex-direction: column;
}
.upnext .text-body{
  justify-content: space-between;
  min-width: 65%;
}
div.text-body{
  font-size: larger;
}
p, h1, h2, h3, h4, h5, h6{
  /* background-color: white; */
  /* display: block; */
  margin-bottom: 2px;
}
</style>