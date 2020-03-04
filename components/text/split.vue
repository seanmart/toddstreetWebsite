<template lang="html">
  <ul class="split">
    <template v-for="(item,i) in items">
      <li :key="i" v-html="item" :style="itemStyle(i)"/>
    </template>
  </ul>
</template>

<script>
export default {
  props:{
    text: {type: String, default: null},
    on:{type: String, default: ''},
    delay: {type: Number, default: 0}
  },
  computed:{
    items(){
      if (!this.text) return []
      return this.text.split(this.on).map(l => l.replace(' ', '&nbsp'))
    }
  },
  methods:{
    itemStyle(i){
      if (!this.delay) return {}

      let delay = `${i * this.delay}s`

      return {
        transitionDelay: delay,
        animationDelay: delay
      }
    }
  }
}
</script>

<style lang="scss">
.split{
  display: inline-block;
  li{
    display: inline-block;
  }
}
</style>
