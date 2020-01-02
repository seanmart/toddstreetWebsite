<template lang="html">
  <section class="light-gradient">
    <intro class="white">
        <h2>{{attributes.title}}</h2>
        <p class="light">{{attributes.description}}</p>
    </intro>
    <div class="light markdown">
      <no-ssr>
      <markdown :renderFunc="renderFunc" :staticRenderFuncs="staticRenderFuncs"/>
      </no-ssr>
    </div>
  </section>
</template>

<script>
import markdown from '@/components/markdown'
export default {
  async asyncData({ params }) {
    const fileContent = await import(`~/data/work/${params.id}.md`)
    return {
      attributes: fileContent.attributes,
      renderFunc: fileContent.vue.render,
      staticRenderFuncs: fileContent.vue.staticRenderFns
    }
  },
  components: { markdown },
  mounted() {
    this.$store.commit('nav/navColor')
  },
  data() {
    return {
      attributes: {},
      renderFunc: null,
      staticRenderFuncs: null
    }
  }
}
</script>

<style lang="css">


</style>
