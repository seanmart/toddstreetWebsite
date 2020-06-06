<template lang="html">
  <section id="events" v-section>
      <section-title :title="data.title"/>
      <section-circle/>
      <section-description :heading="data.heading" :description="data.description"/>
      <div class="gallery">
        <template v-for="(item,i) in data.gallery">
          <case-study :key="i" :title="item.title" :image="item.image" :link="item.link"/>
        </template>
      </div>
  </section>
</template>

<script>
import caseStudy from '@/components/caseStudy'
import sectionTitle from '@/components/sectionTitle'
import sectionDescription from '@/components/sectionDescription'
import sectionCircle from '@/components/sectionCircle'
export default {
  props:['data'],
  components:{
    sectionTitle,
    sectionDescription,
    sectionCircle,
    caseStudy
  }
}
</script>

<style lang="scss">
#events{
  .gallery{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }
  .case-study{
    flex: 0 0 $col4;
    margin-bottom: $gutter;
    .height{
      padding-bottom: 130%;
    }

    &:nth-child(8n + 1),
    &:nth-child(8n + 5){
      flex: 0 0 $col8;
      .height{
        padding-bottom: 90%;
      }
    }

    &:nth-child(8n + 1){
      margin-right: $col4 + $gutter;
    }

    &:nth-child(8n + 2),
    &:nth-child(8n + 8){
      .wrapper{
        top: 50%
      }
    }

    &:nth-child(8n + 4),
    &:nth-child(8n + 6){
      .wrapper{
        top: -50%
      }
    }

    &:nth-child(8n + 3),
    &:nth-child(8n + 7){
      margin-right: $gutter;
      margin-left: $gutter;
    }

    &:nth-child(8n + 5){
      margin-left: $col4 + $gutter;
    }
  }
}
</style>
