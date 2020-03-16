<template lang="html">
  <div id="quads" v-scroll:section>
    <div class="quad" v-for="(quad,i) in quads" :key="i" v-scroll="{rotate: -.1}">
      <div
      class="square"
      v-for="square in 4"
      :key="square"
      v-scroll="squareProps(square)"
      :style="squareStyle()"
      :class="`square-${square}`"
      />
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      quads:100
    }
  },
  methods:{
    squareStyle(){
      return {
        background: this.color()
      }
    },
    squareProps(i){
      return{
        x: i == 1 ? this.rnd(1,5) : i == 4 ? this.rnd(-1,-5) : 0,
        y: i == 2 ? this.rnd(1,5) : i == 3 ? this.rnd(-1,-5) : 0
      }
    },
    rnd(a = 0,b = 1){
      let num = Math.floor(Math.random() * b)
      return a < 0
             ? num *= Math.floor(Math.random()* 2) == 1 ? 1 : -1
             : num + a
    },
    color(){
       return '#' + Math.floor(Math.random() * 16777215).toString(16);
    }
  }
}
</script>

<style lang="scss">
#quads{
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

  .quad{
    flex: 0 0 auto;
    width: 20vw;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    flex-wrap: wrap;
    padding: 2vw;

    .square{
      flex: 0 0 auto;
      padding-bottom: 50%;
      width: 50%;
    }
  }
}
</style>
