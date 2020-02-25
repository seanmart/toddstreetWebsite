<template lang="html">
  <div id="test">
    <div class="boxes" v-scroll:section>

      <template v-for="i in 1000">
        <div class="box" :key="i" :style="photo()" v-scroll="{transform:{
          rotate: i * 1
        }}"/>
      </template>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods:{
    rnd(min, max) {
      return Math.floor((Math.random() + .1) * (max - min)) + min ;
    },
    photo(){
      return {backgroundImage: `url(/fun/${this.rnd(1,6)}.jpg)`}
    }
  }
}
</script>

<style lang="scss">

#test{
  min-height: 300vh;

  .boxes{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;

    .box{
      height: 25vw;
      width: 25vw;
      background-color: $ruby;
      margin: 0px auto;
      background-size: cover;
      background-position: center center;

      &:nth-child(10n + 2){
        background-color: darken($ruby, 5%)
      }

      &:nth-child(10n + 3){
        background-color: lighten($ruby, 5%)
      }

      &:nth-child(10n + 5){
        background-color: darken($ruby, 10%)
      }

      &:nth-child(10n + 6){
        background-color: lighten($ruby, 10%)
      }

      &:nth-child(10n + 8){
        background-color: darken($ruby, 15%)
      }

      &:nth-child(10n + 9){
        background-color: lighten($ruby, 15%)
      }
    }
  }
}
</style>
