<template>
  <section class="bg-lg spacer nav">
    <gridContainer class="container c-blue">
      <template v-for="(work, index) in works">
        <gridBox class="work-item" fade boxWidth="half" :index="index">
          <nuxt-link :to="work.link" class="image" :style="{ backgroundImage: `url(${work.meta.poster})`}">
            <gridText reveal>
              <h4>{{work.meta.title}}</h4>
              <span class="c-80">{{work.meta.tagline}}</span>
              <h6 class="project-link">Check it out</h6>
            </gridText>
          </nuxt-link>
        </gridBox>
      </template>
    </gridContainer>
  </section>
</template>

<script>
import gridContainer from '@/components/grid/gridContainer'
import gridImage from '@/components/grid/gridImage'
import gridBox from '@/components/grid/gridBox'
import gridText from '@/components/grid/gridText'
import works from '@/data/work'
import { orderBy } from 'lodash'
export default {
  async asyncData() {
    async function asyncImport(item) {
      let data = await import(`@/data/work/${item}.js`)
      return {
        ...data.default,
        link: `/work/${item}`
      }
    }

    return Promise.all(works.map(item => asyncImport(item))).then(res => {
      return { works: orderBy(res, 'meta.index') }
    })
  },
  components: {
    gridContainer,
    gridImage,
    gridBox,
    gridText
  },
  data() {
    return {
      works: []
    }
  },
  mounted() {
    this.$store.commit('nav/navColor')
  }
}
</script>

<style>
.work-item {
  height: 30vw;
}

.project-link {
  margin-top: 40px;
}

.work-item a {
  display: flex;
  justify-content: center;
  align-items: center;
  background-size: cover;
  height: 100%;
}

.work-item h4 {
  margin-bottom: 20px;
}

@media screen and (max-width: 850px) {
  .work-item {
    height: 60vw;
  }
}
</style>
