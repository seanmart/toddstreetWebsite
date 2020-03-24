<template lang="html">
  <main id="home">
    <section class="intro" v-scroll:section>
      <p v-html="data.mission" ref="mission"/>
    </section>
    <section class="work" v-scroll:section>
      <div class="card" v-for="(item,i) in work" :key="i" ref="card">
        <div class="container">
          <div class="content" v-scroll="cardProps(i)">
            <div class="image" :style="img(item.image)" v-scroll="{y:-.5}"/>
          </div>
        </div>
      </div>
    </section>
    <section class="staff" v-scroll:section>
      <div class="info">
        <h1 v-html="data.staff.title"/>
        <p v-html="data.staff.description"/>
      </div>
      <staff-marquee :staff="staff.slice(0,Math.ceil(staff.length / 2))" run />
      <staff-marquee :staff="staff.slice(Math.ceil(staff.length / 2))" run reverse />
    </section>
    <section class="process" v-scroll:section>

    </section>
  </main>
</template>

<script>
import content from '@/assets/data/content'
import staff from '@/assets/data/staff'
import staffMarquee from '@/components/staff/staffMarquee'
import {mapState} from 'vuex'
export default {
  components:{staffMarquee},
  data(){
    return{
      data: content.home,
      widowWidth: null
    }
  },
  mounted(){
    this.setAnimations()
  },
  watch:{
    ready(){
      this.onReady()
    }
  },
  methods:{
    setAnimations(){
      this.$gsap.set(this.$refs.mission,{opacity:0,y: '10%'})
    },
    onReady(){
      this.$gsap.to(this.$refs.mission,.5,{opacity:1, y: 0})
    },
    img(url){
      return {backgroundImage: `url(${url})`}
    },
    shuffle(array) {
      return array.sort(() => Math.random() - 0.5);
    },
    cardProps(i){
      return [1,4].indexOf(i % 8 + 1) > -1 ? {y:1} : {}
    }
  },
  computed:{
    ...mapState(['ready']),
    work(){
      let pages = require.context('./work',false, /.*\.vue$/)
      let work = pages.keys().map(key => {
        let {info} = pages(key).default.data()
        let link = '/work/' + key.replace('.vue', '').replace('./','')
        return {...info, link}
      })

      return work.sort((a,b) => a.order - b.order )
    },
    staff(){
      return this.shuffle(staff)
    }
  }
}
</script>

<style lang="scss">
  main{
    .intro{
      padding: $site-padding;

      p{
        @include font('body mega');
        padding-right: $site-padding;
      }
    }
    .work{
      padding: $site-padding;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      align-items: flex-end;
      margin: -2vw -2vw 0px;


      .card{
        flex: 0 0 auto;
        width: 33.333%;
        padding: 1vw;

        .container{
          position: relative;
          padding-bottom: 130%;
        }

        .content{
          position: absolute;
          height: 100%;
          width: 100%;
          background: $midnight;
          overflow: hidden;
        }

        .image{
          margin-top: -20%;
          height: 120%;
          width: 100%;
          background-size: cover;
        }

        &:nth-child(8n + 1),
        &:nth-child(8n + 4){
          .content{top: 50%;}
        }

        &:nth-child(8n + 2),
        &:nth-child(8n + 5){
          .container{padding-bottom: 100%;}
          width: 66.666%;
        }

        &:nth-child(8n + 3){
          margin-left: 33.333%;
        }
      }
    }

    .staff{
      padding: $site-padding 0px;

      .info{
        display: flex;
        flex-direction: row;
        align-items: flex-end;
        padding: 0px $site-padding $site-padding;
        width: 100%;

        h1{
          @include font('header');
          flex: 0 0 auto;
          margin-right: $site-padding;
        }

        p{
          @include font('body');
          flex: 1 1 auto;
        }
      }
    }

    .process{
      height: 100vh;
    }
  }
</style>
