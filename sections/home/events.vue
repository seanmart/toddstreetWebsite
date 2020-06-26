<template lang="html">
  <section id="events" class="space--all">

    <section-title class="space--b" :text="data.title"/>
    <p v-if="data.heading" class="heading body--font bold col--ml4" v-enter:slideup v-html="data.heading"/>
    <p v-if="data.description" class="description body--font col--ml4" v-enter:slideup v-html="data.description"/>

    <div class="texture big-circle margin--t" v-enter:zoomout v-parallax="2"/>

    <div class="gallery margin--t">
      <div v-for="(caseStudy,i) in data.caseStudies" :key="i" class="gallery-item">
        <case-study :title="caseStudy.title">
          <div class="image" v-image="caseStudy.image" v-parallax:no-min="'200px'"/>
        </case-study>
      </div>
    </div>

  </section>
</template>

<script>
import sectionTitle from '@/components/sectionTitle'
import caseStudy from '@/components/caseStudy'
export default {
  components:{sectionTitle,caseStudy},
  props:['data'],
}
</script>

<style lang="scss">
#events{

  .gallery-item{
    position: relative;
    flex: 0 0 100%;
  }

  .image{
    background-size: cover;
    background-position: center center;
    position: absolute;
    top: -200px;
    left: 0px;
    right: 0px;
    bottom: 0px;
  }


}
</style>
