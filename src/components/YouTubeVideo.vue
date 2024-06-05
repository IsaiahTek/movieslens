<script lang="ts">
export default{
    props:{
        video:{
            type: Object as () => Video,
            required:true
        }
    }
}
</script>
<template>
    <iframe width="100%" height="315" :src="'https://www.youtube.com/embed/'+video.key" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
</template>