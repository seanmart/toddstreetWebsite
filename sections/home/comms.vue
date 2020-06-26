<template lang="html">
  <section id="comms" class="space--all">

    <section-title class="space--b" :text="data.title"/>
    <p v-if="data.heading" class="heading body--font bold col--ml4" v-enter:slideup v-html="data.heading"/>
    <p v-if="data.description" class="description body--font col--ml4" v-enter:slideup v-html="data.description"/>
    <div class="texture big-circle margin--t" v-enter:zoomout v-parallax="2"/>

    <div class="gallery margin--t">
      <div v-for="(caseStudy,i) in data.caseStudies" :key="i" class="gallery-item">
        <case-study :title="caseStudy.title" v-bg="caseStudy.color">
          <div class="comm">
            <img class="image" :src="caseStudy.image"/>
          </div>
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
#comms{
  .gallery-item{
    flex: 0 0 100%;
  }

  .comm{
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .image{
    flex: 0 0 auto;
    padding: 0px 30px;
    max-height: 60%;
    max-width: 100%;
  }
}
</style>
