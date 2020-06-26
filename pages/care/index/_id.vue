<template lang="html">
  <div id="article" v-if="post">
    <section-title v-if="post.title" :text="post.title"/>
    <img v-if="post.image" class="margin--t" :src="require(`@/static/${post.image}`)" v-enter:zoomout/>
    <div v-if="post.html" class="body body--font margin--t" v-html="post.html"/>
  </div>
</template>

<script>
import sectionTitle from '@/components/sectionTitle'
export default {
  components:{sectionTitle},
  props:{
    post:{type: Object, default:()=>({})}
  }
}
</script>

<style lang="scss">
#article{

  img{
    width: 100%;
  }

  p{
    font-size: 20px;
    line-height: 150%;
    margin-bottom: 20px;
  }

  a{
    font-weight: 700;
    color: $lightBlue;
  }
}
</style>
