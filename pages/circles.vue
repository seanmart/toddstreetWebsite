<template lang="html">
  <div id="circles" v-scroll:section :style="{height: `${circles * 10}vh`}">
    <div v-for="(circle,i) in circles" :key="i" class="circle" v-scroll="circleProps(i)" :style="style(i)" >
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      circles: 500
    }
  },
  methods:{
    circleProps(i){
      return{
        y: Math.sin(i) * 10,
        x: Math.sin(i) * 10,
        //scale:Math.sin(i) * 10,
      }
    },
    style(i){
      let unit = this.rnd(1,i) * 10
      return{
        background: this.color(),
        opacity: this.rnd(0,10) * .10,
        height: `${unit/10}px`,
        width: `${unit/10}px`,
        zIndex: this.circles - i,
        top: this.rnd(1,100) + '%',
        left: this.rnd(1,100) + '%'
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
#circles{
  position: relative;
  .circle{
    position: absolute;
    background: black;
    margin: 0px auto;
    height: 50vw;
    width: 50vw;
    border-radius: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    .inner-circle{
      height: 25vw;
      width: 25vw;
      background: white;
    }
  }
}
</style>
