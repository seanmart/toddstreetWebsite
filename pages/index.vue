<template lang="html">
  <div id="home">
    <section class="landing" v-scroll:section>
      <video-player/>
    </section>
    <section class="intro" v-scroll:section>
      <div class="content">
        <h1>title</h1>
        <p>description</p>
      </div>
    </section>
    <section class="work" v-scroll:section>
      <case-study-box
        v-for="(item,i) in caseStudyItems"
        :key="i"
        :type="item.type"
        :title="item.title"
        :link="item.link"
        :image="item.image"
        class="work-item"
      />
    </section>
    <section class="employees" v-scroll:section>
      <div class="content">
        <div class="">

        </div>
      </div>
    </section>
    <section class="clients" v-scroll:section>

    </section>
    <section class="offerings" v-scroll:section>

    </section>
  </div>
</template>

<script>
import videoPlayer from '@/components/video'
import caseStudyBox from '@/components/caseStudyBox'
export default {
  components:{
    videoPlayer,
    caseStudyBox
  },
  computed:{
    caseStudyItems(){
      return[
        {
          type: 'communications',
          title: 'This is title one',
          image: '/events/events1.jpg',
          link: '/'
        },
        {
          type: 'events',
          title: 'This is title two',
          image: '/events/events2.jpg',
          link: '/'
        },
        {
          type: 'training',
          title: 'This is title three',
          image: '/events/events3.jpg',
          link: '/'
        },
        {
          type: 'communications',
          title: 'This is title four',
          image: '/events/events5.jpg',
          link: '/'
        },
        {
          type: 'events',
          title: 'This is title five',
          image: '/events/events6.jpg',
          link: '/'
        }
      ]
    }
  }
}
</script>

<style lang="scss">

.landing{
  height: 100vh;
  background: $midnight;
}

.intro{
  display: flex;
  justify-content: center;
  align-items: center;
  @include sitePadding;
  min-height: 50vw;

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
