<template lang="html">
  <div class="swap">
    <transition name="swap">
      <div :key="index" class="swap-item">{{list[index]}}</div>
    </transition>
  </div>
</template>

<script>
import split from './split'
export default {
  components:{split},
  props:{
    list: {type:Array, default: ()=>[]},
    speed: {type: Number, default: 1}
  },
  data(){
    return{
      index: 0
    }
  },
  mounted(){
    setInterval(()=>{
      let i = this.index + 1
      this.index = i === this.list.length ? 0 : i
    },this.speed * 1000)
  },
  computed:{
    listItem(){
      return this.list[this.index].split('').map(l => l.replace(' ', '&nbsp'))
    }
  }
}
</script>

<style lang="scss">
.swap{
  display: inline-block;
  width: 100%;
  position: relative;
  overflow: hidden;

  .swap-item{
    line-height: 100%;
  }
}

.swap-enter-active,
.swap-leave-active{
  transition: 1s;
}

.swap-leave-active{
  position: absolute;
}

.swap-enter{
  transform: translateY(100%);
}
.swap-leave-to{
  transform: translateY(-100%);
}
</style>
