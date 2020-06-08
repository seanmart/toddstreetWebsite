<template lang="html">
  <section id="comms">
      <section-title :title="data.title"/>
      <section-circle/>
      <section-description :heading="data.heading" :description="data.description"/>
      <div class="gallery">
        <template v-for="(item,i) in data.gallery">
          <case-study :key="i" :title="item.title" :color="item.color" :link="item.link">
            <img v-if="item.image" :src="item.image"/>
          </case-study>
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
#comms{
  .gallery{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }
  .case-study{
    flex: 0 0 $col6;
    margin-bottom: $gutter;
    .case-study-container{
      padding-bottom: 90%;
    }

    img{
      flex: 0 0 auto;
      width: 75%;
    }

    &:nth-child(even){
      .wrapper{
        top: 20%;
      }
    }
  }

  .case-study:nth-child(odd){
    margin-right: $gutter;
  }
}
</style>
