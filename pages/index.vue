<template lang="html">
  <div id="home">

    <!--<section class="landing" v-scroll:section>
      <video-player class="bg-image" :image="'events/events1.jpg'"/>
    </section>-->

    <section class="intro" v-scroll:section>
      <div class="content">
        <h1>title</h1>
        <p>description</p>
      </div>
    </section>

    <section class="work" v-scroll:section>
        <preview
          v-for="(item,i) in caseStudyItems"
          :key="i"
          :type="item.type"
          :title="item.title"
          :link="item.link"
          :image="item.image"
          class="work-item"
        />
    </section>

    <section class="clients" v-scroll:section>

    </section>

    <section class="offerings" v-scroll:section>

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
  </div>
</template>

<script>
import videoPlayer from '@/components/video'
import preview from '@/components/caseStudy/preview'
export default {
  components:{
    videoPlayer,
    preview
  },
  methods:{
    getClass(el,c){
      return el.getElementsByClassName(c)
    }
  },
  computed:{
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

.landing{
  height: 100vh;
  background: $midnight;

  .bg-image{
    height: 100%;
    width: 100%;
  }
}

.intro{
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  @include sitePadding;

  .content{
    flex: 0 0 auto;
    h1{
      @include font('header')
    }
  }
}

.work{
  display: flex;
  flex-direction: row;
  flex-wrap:wrap;

  .work-item{
    flex: 0 0 auto;
    width: 50%;
    height: 30vw;
  }
}
</style>
