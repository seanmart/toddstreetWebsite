<template lang="html">
  <div class="social">
    <template v-for="media in data.social">
    <a :href="media.link" :key="media.icon">
      <icons :icon="media.icon"/>
    </a>
  </template>
  </div>
</template>

<script>
import data from '@/assets/data/site'
import icons from '@/components/icons'
export default {
  components:{icons},
  data(){ return { data }}
}
</script>

<style lang="scss">
.social{
  a{
    display: inline-block;
    box-sizing: content-box;
    height: 30px;
    width: 30px;
    position: relative;
    padding-left: 20px;

    @media (max-width: $tablet){
      height: 20px;
      width: 20px;
      padding-left: 15px;
    }

    &:first-child{
      padding-left: 0px;

    }

    svg{
      width: 100%;
      fill: inherit;
    }
  }
}
</style>
