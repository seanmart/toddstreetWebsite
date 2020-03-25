<template lang="html">
  <main id="home" v-scroll:page>
    <section class="intro" v-scroll:section>
      <p v-html="data.mission" ref="mission"/>
    </section>
    <section class="work" v-scroll:section>
      <div class="card" v-for="(item,i) in work" :key="i" ref="card">
        <div class="container">
          <div class="content" v-scroll="cardProps(i)">
            <h1 v-html="item.title"/>
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
      <div class="content">
        <marquee :staff="staff" run>
          <div class="employee marquee-item" v-for="(employee,i) in staff" :key="i">
            <div class="image" :style="img(employee.image)"/>
          </div>
        </marquee>
        <circle-link class="link" :size="150" v-scroll="staffButtonProps">
          <span v-html="data.staff.button"/>
        </circle-link>
      </div>
    </section>
    <section class="process" v-scroll:section="processProps">

    </section>
  </main>
</template>

<script>
import content from '@/assets/data/content'
import staff from '@/assets/data/staff'
import marquee from '@/components/move/marquee'
import circleLink from '@/components/text/circleLink'
import {mapState} from 'vuex'
export default {
  components:{marquee, circleLink},
  data(){
    return{
      data: content.home,

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
      let props = {}
      props.onCursorEnter = ()=> console.log('entering')
      props.onCursorLeave = ()=> console.log('leaving')
      if ([1,4].indexOf(i % 8 + 1) > -1) props.y = 1
      return props
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
    },
    staffButtonProps(){
      return {y: 2}
    },
    processProps(){
      return{
        offset:'50vh'
      }
    }
  }
}
</script>

<style lang="scss">
  main{
    .intro{
      padding: $site-padding $site-padding $site-padding / 2;

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

        h1{
          @include font('body mega');
          position: absolute;
          top: 5vw;
          left: 5vw;
          color: $snow;
          z-index: 1;
        }

        .image{
          margin-top: -20%;
          height: 120%;
          width: 100%;
          background-size: cover;
          background-position: center center;
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
      position: relative;

      .info{
        display: flex;
        flex-direction: row;
        padding: 0px $site-padding $site-padding;
        width: 100%;

        h1{
          @include font('body mega');
          flex: 0 0 auto;
          margin-right: $site-padding;
        }

        p{
          flex: 1 1 auto;
        }
      }
      .content{
        position: relative;
      }

      .employee{
        padding: 3px;
        width: 300px;
        height: 300px;
        .image{
          height: 100%;
          background-size: cover;
          background-position: center center;
        }
      }

      .link{
        position: absolute;
        top: 105%;
        left: 25%;
      }
    }

    .process{
      height: 100vh;
    }
  }
</style>
