<template lang="html">
  <div class="virtual" v-scroll:page >
  </div>
</template>

<script>
export default {
  data(){
    return{
      info:{
        order: 1,
        title: 'Virtual Meetings',
        image: '/virtual/cover.jpg',
        color: '#7cd1f5'
      }
    }
  }
}
</script>

<style lang="scss">
.virtual{
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
