<template lang="html">
  <div class="experiential" v-scroll:page>

  </div>
</template>

<script>
export default {
  data(){
    return{
      info:{
        order: 2,
        title: 'Experiential',
        image: '/experiential/cover.jpg'
      }
    }
  }
}
</script>

<style lang="scss">
.experiential{
  .intro{
    min-height: 100vh;
    @include sitePadding();
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  .gallery{
    min-height: 100vh;
  }
}
</style>
