<template lang="html">
  <section id="cares" v-section v-scroll="[handleScroll,'100vh - 70','70']">
      <section-title :title="data.title"/>
      <section-description :description="data.description"/>
      <div class="blog">
        <div class="image-posts">
          <div class="image" v-image="posts[0].image"/>
          <div class="side-posts">
            <nuxt-link class="side-post-link" v-for="post, i in posts.slice(1,posts.length)" :key="i" :to="post.link">
              <side-post :data="post"/>
            </nuxt-link>
          </div>
        </div>
        <div class="text">
          <h1 class="header--sm" v-html="posts[0].title"/>
          <p  class="body--sm" v-html="posts[0].body.split(/\s+/).slice(0,25).join(' ') + '...'"/>
          <fancy-link :to="posts[0].link">read More</fancy-link>
        </div>
      </div>
  </section>
</template>

<script>
import sectionTitle from '@/components/sectionTitle'
import sectionDescription from '@/components/sectionDescription'
import sidePost from '@/components/sidePost'
import previewPost from '@/components/previewPost'
import {mapState} from 'vuex'

export default {
  props:['data'],
  components:{sectionTitle,sectionDescription, sidePost, previewPost},
  computed:{
    posts(){
      return [...this.$store.state.care].sort((a,b) => new Date(b.date) - new Date(a.date)).slice(0,this.data.postCount)
    },
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

  .image-posts{
    display: flex;
    flex-direction: row;
  }
  .image{
    flex: 1 1 auto;
    margin-right: $col;
    background-size: cover;
    background-position: center center;
  }

  .text{
    margin-right: 300px;
    padding-top: 40px;
    padding-right: $col;

    h1{
      margin-bottom: 20px;
    }
  }

  .side-posts{
    flex: 0 0 auto;
    width: 300px;
  }

  .side-post{
    border-color: $yellow;
  }

  .side-post-link{
    display: block;
  }


  @media (max-width: $tablet){

    .side-posts{
      width: 200px;
    }
  }

  @media (max-width: $mobile){
    padding-top: 200 + $tablet-margins;

    .blog{
      flex-direction: column;
    }

    .preview-post{
      margin: 0px 0px 80px;
      flex: 0 0 auto;
    }

    .side-posts{
      width: 100%;
    }
  }
}
</style>
