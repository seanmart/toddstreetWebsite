<template lang="html">
  <component  :is="tag" class="swap">
    <transition name="swap">
      <ul :key="index" class="swap-item">
        <li
          class="swap-letter"
          v-for="(letter,i) in letters"
          :key="i"
          v-html="letter"
          :style="{transitionDelay: `${i * (.3/letters.length)}s`}"
          />
      </ul>
    </transition>
  </component>
</template>

<script>
export default {
  props:{
    tag: {type: String, default: 'p'},
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
    letters(){
      return this.list[this.index].split('').map(l => l === ' ' ? '&nbsp' : l)
    }
  }
}
</script>

<style lang="scss">
.swap{
  display: inline-block;
  position: relative;

  .swap-item{
    display: flex;
    flex-direction: row;
    overflow: hidden;

    .swap-letter{
      transition: transform 1s, opacity 1s;
    }
  }
}

.swap-enter-active,
.swap-leave-active{
  transition: transform 1s, opacity 1s;
}

.swap-leave-active{
  position: absolute;
}

.swap-enter .swap-letter{
  transform: translateY(100%);
}
.swap-leave-to .swap-letter{
  transform: translateY(-100%);
}
</style>
