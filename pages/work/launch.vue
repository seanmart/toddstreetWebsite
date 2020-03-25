<template lang="html">
  <div class="launch" v-scroll:page>

  </div>
</template>

<script>
export default {
  data(){
    return{
      info:{
        order: 4,
        title: 'Launch Events',
        image: '/experiential/2.jpg'
      }
    }
  }
}
</script>

<style lang="scss">
.launch{
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
