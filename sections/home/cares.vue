<template lang="html">
  <section id="cares" class="space--all" data-button-color="#fff">
    <section-title :text="data.title"/>
    <div class="margin--t content">
      <div class="main" v-enter:zoomout>
        <div class="image" v-image="carePosts[0].image"/>
        <h3 class="title--font" v-html="carePosts[0].title"/>
        <p class="body--font" v-html="carePosts[0].body.split('.')[0] + '...'"/>
        <nuxt-link :to="carePosts[0].link" class="fancy-link">keep reading</nuxt-link>
      </div>
      <div class="side" v-enter:slideup>
        <side-post v-for="(post, i) in carePosts.slice(1,5)" :key="i" :data="post"/>
      </div>
    </div>
  </section>
</template>

<script>
import sectionTitle from '@/components/sectionTitle'
import sidePost from '@/components/sidePost'
import {mapGetters} from 'vuex'
export default {
  components:{sectionTitle, sidePost},
  props:['data'],
  computed: mapGetters(['carePosts'])
}
</script>

<style lang="scss">
#cares{
  background: $blue;
  color: white;

  .content{
    display: flex;
    flex-direction: row;
  }

  .main{
    flex: 1 1 auto;
    margin-right: $margin--dk;

    .image{
      padding-bottom: 56.25%;
      background-size: cover;
      background-position: center center;
    }

    h3{
      font-size: 35px;
      font-weight: 600;
      padding: 50px 0px 30px;
    }

    p{
      font-size: 23px;
      margin-bottom: 50px;
    }
  }

  .side{
    flex: 0 0 300px;
  }

  @media (max-width: $tablet){
    .main{
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

    .main{
      margin-right: 0px;
      margin-bottom: $space--mb;
    }

    .side{
      flex: 0 0 auto;
    }
  }
}
</style>
