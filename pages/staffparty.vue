<template lang="html">
  <main id="staffparty" v-scroll:section>
    <div
      class="item"
      v-for="(item,i) in items"
      :key="i"
      :style="img(item.image)"
      v-scroll="item.vscroll"
    >
    <div class="text">
      <h1>{{item.name}}</h1>
      <p>{{item.role}}</p>
    </div>

    </div>
  </main>
</template>

<script>
import staff from '@/assets/data/staff'
export default {
  computed:{
    items(){
      let items = []
      for (let i = 0; i < 300; i++){

        let item = {}
        item.image = staff[this.rnd(0,staff.length - 1)].image
        item.name = staff[this.rnd(0,staff.length - 1)].name
        item.role = staff[this.rnd(0,staff.length - 1)].role
        item.vscroll = {
          y: Math.sin(i),
          rotate: Math.sin(-i)/10,
          scale:Math.sin(i)/8
        }

        items.push(item)
      }
      return items
    }
  },
  methods:{
    img(url){
      return {backgroundImage: `url(${url})`}
    },
    rnd(min, max) {
      return Math.floor(Math.random() * (max - min) ) + min;
    }
  }
}
</script>

<style lang="scss">
  #staffparty{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    padding-top: $site-padding;

    .item{
      flex: 0 0 33.333vw;
      height: 33.333vw;
      background-size: cover;
      position: relative;

      .text{
        position: absolute;
        bottom: 0px;
        left: 0px;
        right: 0px;
        padding: 10px;
        background: $midnight;
        color: $snow;
        h1{
          @include font('header');
        }
        p{
          @include font('link');
        }
      }
    }
  }
</style>
