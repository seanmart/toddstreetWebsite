<template lang="html">
  <main v-scroll:page>

    <section class="intro" v-scroll:section>
      <div class="content">
        <p v-html="intro.mission" ref="mission"/>
      </div>
      <video-player v-if="intro.wistia" class="video" :wistia="intro.wistia"/>
    </section>

    <section class="work" v-scroll:section>
      <div class="work-item" v-for="(item,i) in caseStudyItems" :key="i">
        <div class="inner-work-item">
          <preview
            :type="item.type"
            :title="item.title"
            :link="item.link"
            :image="item.image"
          />
        </div>
      </div>
    </section>

    <section class="employees" v-scroll:section>
      <div class="content">
        <div class="description">
          we are across the country...
        </div>
        <div class="">

        </div>
      </div>
    </section>

    <section class="clients" v-scroll:section>

    </section>

    <section class="offerings" v-scroll:section>

    </section>
  </main>
</template>

<script>
import data from '@/assets/data/home'
import videoPlayer from '@/components/video'
import preview from '@/components/work/preview'
import {mapState} from 'vuex'
export default {
  components:{
    videoPlayer,
    preview
  },
  data(){
    return{
      intro: data.intro
    }
  },
  mounted(){
    this.init()
    if (this.ready) this.onReady()
  },
  watch:{
    ready(){
      this.onReady()
    }
  },
  methods:{
    init(){
      this.$gsap.set(this.$refs.mission, {opacity:0,y: '10vh'})
    },
    onReady(){
      this.$gsap.to(this.$refs.mission,1,{opacity:1, y: 0, ease: 'power4.out'})
    }
  },
  computed:{
    ...mapState(['ready']),
    caseStudyItems(){
      let pages = require.context('./work',false, /.*\.vue$/)
      let caseStudies = pages.keys().map(key => {
        let page = pages(key)
        let link = '/work/' + key.replace('.vue', '').replace('./','')
        return {...page.default.data().info, link}
      })

      return caseStudies.sort((a,b) => a.overview - b.overview )
    }
  }
}
</script>

<style lang="scss">

section{
  min-height: 100vh;
}

.intro{
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  @include sitePadding;
  position: relative;
  overflow: hidden;

  .content{
    flex: 0 0 auto;
    p{
      @include font('body mega')
    }
  }

  .video{
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0px;
    left: 0px;
  }
}

.work{
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  flex-wrap:wrap;
  @include sitePadding;

  .work-item{
    flex: 0 0 auto;
    width: 33.333%;
    padding: .5vw;

    .inner-work-item{
      padding-bottom: 100%;
      position: relative;
    }

    .preview{
      position: absolute;
      top: 0px;
      left: 0px;
      bottom: 0px;
      right: 0px;
      z-index: 1;
    }

    &:nth-child(8n + 1){
      width: 66.666%;
      .inner-work-item{
        padding-bottom: 50%;
      }
    }

    &:nth-child(8n + 2),
    &:nth-child(8n + 3){
      .inner-work-item{
        padding-bottom: 50%;
      }
      .preview{
         bottom: -100%;
      }
    }

    &:nth-child(8n + 4){
      margin-right: 33.333%;
    }

    &:nth-child(8n + 5){
      width: 66.666%;
      margin-left: 33.333%;
      .inner-work-item{
        padding-bottom: 50%;
      }
    }

  }
}

.employees{
  background: $midnight;
}

.clients{
}

.offerings{
}
</style>
