<template lang="html">
  <section id="training">
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
#training{
  padding-bottom: 0px;

  .gallery{
    display: flex;
    flex-direction: column;
  }
  .case-study{
    flex: 0 0 auto;
    width: $col10;
    margin-bottom: $gutter;

    .height{
      padding-bottom: 50%;
    }

    &:nth-child(even){
      margin-left: $col2 + $gutter;
    }
    &:last-child{
      margin-bottom: 0px;
    }
  }
}
</style>
