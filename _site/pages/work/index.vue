<template>
  <section class="bg-lg">
    <intro>
        <p class="c-80">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
    </intro>
    <gridContainer class="container c-100">
      <template v-for="(work, index) in works">
        <gridBox class="work-item" fade boxWidth="half" :index="index">
          <nuxt-link :to="work.link" class="image" :style="{ backgroundImage: `url(${work.meta.poster})`}">
            <h4>{{work.meta.title}}</h4>
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
    gridBox
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

.work-item a {
  display: flex;
  justify-content: center;
  align-items: center;
  background-size: cover;
  height: 100%;
}

.work-item h4 {
  opacity: 0;
  transition: 0.5s;
}

.work-item a:hover h4 {
  opacity: 1;
}

@media screen and (max-width: 850px) {
  .work-item {
    height: 60vw;
  }

  .work-item h4 {
    margin: 0px;
  }

  .work-item span {
    display: none;
  }
}
</style>
