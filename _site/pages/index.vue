<template>
  <section class="bg-lg">
    <intro>
      <p class="c-80">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
      </p>
    </intro>

    <galleryContainer v-if="gallery.length >0" class="home-gallery c-100" :count="gallery.length" :duration="6">
      <template slot-scope="{index, dir, set}">

        <galleryText left :dir="dir" :index="index">
          <h1 v-if="gallery[index].title">{{gallery[index].title}}</h1>
          <p v-if="gallery[index].tagline">{{gallery[index].tagline}}</p>
          <galleryLink v-if="gallery[index].link" :to="gallery[index].link" :duration="6">Check it out</galleryLink>
        </galleryText>

        <galleryDots :count="gallery.length" :index="index" @set="set($event)"/>
        <galleryImage v-if="gallery[index].poster" :image="gallery[index].poster" :index="index" :dir="dir" slide/>

      </template>
    </galleryContainer>

    <gridContainer class="container spacer">
      <template v-for="item in grid">
        <gridBox v-if="item.width" :boxWidth="item.width">
          <gridText>
            <h3 v-if="item.title">{{item.title}}</h3>
          </gridText>
        </gridBox>
      </template>
    </gridContainer>

  </section>
</template>

<script>
import galleryContainer from '@/components/gallery/galleryContainer'
import galleryText from '@/components/gallery/galleryText'
import galleryImage from '@/components/gallery/galleryImage'
import galleryDots from '@/components/gallery/galleryDots'
import galleryLink from '@/components/gallery/galleryLink'
import gridContainer from '@/components/grid/gridContainer'
import gridBox from '@/components/grid/gridBox'
import gridText from '@/components/grid/gridText'
import home from '@/data/home'
export default {
  async asyncData() {
    async function asyncImport(item) {
      const job = await import(`~/data/${item.folder}/${item.name}.js`)
      return { ...job.default.meta, link: `/${item.folder}/${item.name}` }
    }
    return Promise.all(home.gallery.map(item => asyncImport(item))).then(
      res => {
        return { gallery: res }
      }
    )
  },
  mounted() {
    this.$store.commit('nav/navColor')
  },
  components: {
    galleryContainer,
    galleryText,
    galleryImage,
    galleryDots,
    galleryLink,
    gridContainer,
    gridBox,
    gridText
  },
  data() {
    return {
      gallery: [],
      grid: []
    }
  },
  computed: {}
}
</script>

<style>
.home-gallery {
  height: 56.25vw;
  min-height: 500px;
}

@media screen and (max-width: 850px) {
  .home-gallery {
    height: 100vh;
    max-height: 900px;
  }
}
</style>
