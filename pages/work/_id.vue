<template lang="html">
  <section class="bg-lg work">
    <intro v-if="meta" >
      <h1 class="c-0">{{meta.title}}</h1>
      <p class="tagline c-40"><b>{{meta.tagline}}</b></p>
      <p class="c-80">{{meta.description}}</p>
      <div v-if="meta.tags" class="tags">
        <span class="tags-title c-40"><b>Tags:</b></span>
        <span v-for="tag in meta.tags" class="tag bg-40 c-100">{{tag}}</span>
      </div>
    </intro>
    <div class="work-content c-80">
      <template v-for="item in content">

        <p v-if="item.text" class="container spacer">{{item.text}}</p>

        <VueMarkdownIt v-if="item.markdown" :source="split(item.markdown)" class="container spacer"/>

        <galleryContainer v-if="item.gallery" :count="item.gallery.length">
          <template slot-scope="{index, dir, set}">
            <galleryDots v-if="item.dots" :count="item.gallery.length" :index="index" @set="set($event)"/>
            <galleryImage v-if="item.gallery[index]" :image="item.gallery[index]" :index="index" :dir="dir" :crop="false" slide/>
          </template>
        </galleryContainer>

        <img v-if="item.image" :src="item.image" alt="">

      </template>
    </div>
  </section>
</template>

<script>
import VueMarkdownIt from 'vue-markdown-it'
import galleryContainer from '@/components/gallery/galleryContainer'
import galleryImage from '@/components/gallery/galleryImage'
import galleryDots from '@/components/gallery/galleryDots'
export default {
  async asyncData({ params }) {
    const job = await import(`~/data/work/${params.id}.js`)
    return { meta: job.default.meta, content: job.default.content }
  },
  components: {
    galleryContainer,
    galleryImage,
    galleryDots,
    VueMarkdownIt
  },
  data() {
    return {
      meta: {},
      content: []
    }
  },
  methods: {
    split(str) {
      let arr = str.split(/\r\n|\r|\n/g).map(i => i.trim())
      return arr.join('\n')
    }
  }
}
</script>

<style lang="css">


.work-content a{
  text-decoration: underline;
}

.tagline{
  display: block;
  margin: 10px 0px 40px;
}

.tags{
  margin-top: 40px;
}

.tags-title{
  margin-right: 10px;
  margin-bottom: 5px;
}

.tag{
  margin-right: 5px;
  margin-top: 5px;
  padding: 5px 10px;
  border-radius: 5px;
  display:inline-block;
}

@media screen and (max-width: 850px){
  .tags-title{
    display: block;
  }

}
</style>
