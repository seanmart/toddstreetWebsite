<template lang="html">
  <main id="care" class="space--all">
    <section-title v-if="post.title" :key="post.id" :text="post.title" class="space--b"/>
    <div class="content">
      <div class="article">
        <nuxt-child :post="post" :key="post.id"/>
      </div>
      <div class="side" v-parallax="1">
        <side-post v-for="(post,i) in carePosts" :key="i" :data="post"/>
      </div>
    </div>
  </main>
</template>

<script>
import {mapGetters, mapState} from 'vuex'
import sidePost from '@/components/sidePost'
import sectionTitle from '@/components/sectionTitle'
export default {
  components:{sidePost,sectionTitle},
  mounted(){
    gsap.set('.side-post',{y:100, opacity:0})
  },
  computed:{
    ...mapGetters(['carePosts']),
    ...mapState(['ready']),
    post(){
      let id = this.$route.params.id || this.carePosts[0].id
      return this.carePosts.find(post => post.id == id)
    }
  },
  watch:{
    $route(){
      gsap.set('.side-post',{y:100, opacity:0})
    },
    ready(ready){
      ready && gsap.to('.side-post',.5,{y:0, opacity:1, stagger: .1})
    }
  }
}
</script>

<style lang="scss">
#care{

  .content{
    display: flex;
    flex-direction: row;
  }

  .article{
    flex: 1 1 auto;
    margin-right: $margin--dk;
  }

  .side{
    flex: 0 0 300px;

    .side-post{
      transform-origin: left;
      border-color: $lightBlue;
    }
  }

  @media (max-width: $tablet){

    .article{
      margin-right: $margin--tb;
    }

    .side{
      flex: 0 0 200px;
    }

  }

  @media (max-width: $mobile){
    .content{
      flex-direction: column;
    }

    .article{
      flex: 0 0 auto;
      margin: 0px 0px $space--mb;
    }

    .side{
      flex: 0 0 auto;
    }
  }
}
</style>
