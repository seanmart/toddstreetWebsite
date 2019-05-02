<template>
  <box ratio :image="image" col2 class="project" v-scroll-reveal="scrollAttr">
    <div class="content" @click="clicked" :class="{ active }" v-if="!empty">
      <div class="project-text">
        <t grey body small>{{ type }}</t>
        <t title medium thick>{{ title }}</t>
        <nuxt-link :to="link"
          ><t link body small before class="link">check it out</t></nuxt-link
        >
      </div>
    </div>
    <div class="empty" v-if="empty">
      <slot></slot>
    </div>
    <nuxt-link :to="link" class="project-link" />
  </box>
</template>
<script>
export default {
  props: {
    type: String,
    title: String,
    link: String,
    image: String,
    height: { type: Number, default: 400 },
    active: Boolean,
    empty: Boolean
  },
  data() {
    return {
      scrollAttr: {
        duration: 1000,
        opacity: 0,
        scale: 0.9,
        reset: false
      }
    }
  },
  methods: {
    clicked() {
      console.log('clicked')
      this.$emit('clicked')
    }
  }
}
</script>
<style lang="css" scoped>
.content{
  display: block;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 50px;
  opacity: 0;
  background: white;
  transition: opacity .5s;
  position: relative;
  z-index: 1;
}


.project-text a{
  display: inline-block;
}

.empty{
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: black;
}

.link{
  position: relative;
  z-index: 3
}

.project-image,
.project-link {
  position: absolute;
  top: 0px;
  left: 0px;
  bottom: 0px;
  right: 0px;
}

.project-image{
  z-index: 0;
  background-size: cover;
  background-position: center center;
}

.project-link{
  z-index: 2;
  display: none;
}

.project{
  overflow: hidden;
}

.project-text{
  transform: translateX(-100%);
  transition: transform .25s
}


@media screen and (max-width: 800px){
  .active .project-text{
    transform: translateX(0px);
  }

  .content.active{
    opacity: .95
  }
}

@media screen and (min-width:801px){
  .project:hover .project-text{
    transform: translateX(0px);
  }
  .project:hover .content{
    opacity: .95
  }

  .project-link{
    display: block;
  }
}
</style>
