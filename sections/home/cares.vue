<template lang="html">
  <section id="cares">
      <section-title :title="data.title"/>
      <section-description :description="data.description"/>
      <div class="blog">
        <div class="main-post">

        </div>
        <side-posts :posts="posts"/>
      </div>
  </section>
</template>

<script>
import sectionTitle from '@/components/sectionTitle'
import sectionDescription from '@/components/sectionDescription'
import sidePosts from '@/components/blog/sidePosts'
import {mapState} from 'vuex'

export default {
  props:['data'],
  components:{sectionTitle,sectionDescription, sidePosts},
  computed:{
    posts(){
      return [...this.$store.state.posts].sort((a,b) => a.date > b.date).slice(0,this.data.postCount)
    }
  },
  methods:{
    handleScroll(e){
      if (e.enter) this.$store.commit('navColor','#fff')
      if (e.leave) this.$store.commit('navColor',null)
    }
  }
}
</script>

<style lang="scss">
#cares{
  background: $blue;
  color: white;
  hr{
    background: $lightBlue;
  }
  .blog{
    display: flex;
    flex-direction: row;
  }
  .main-post{
    flex: 1 1 auto;
  }
  .side-posts{
    width: 300px;
  }
  @media (max-width: $mobile){
    padding-top: 200 + $tablet-margins;

    .blog{
      flex-direction: column;
    }
    .side-posts{
      width: 100%;
    }
  }
}
</style>
