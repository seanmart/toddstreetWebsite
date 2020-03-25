<template lang="html">
  <div class="training" v-scroll:page >

  </div>
</template>

<script>
export default {
  data(){
    return{
      info:{
        order: 3,
        title: 'Training',
        image: '/experiential/1.jpg'
      }
    }
  }
}
</script>

<style lang="scss">
.training{
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
