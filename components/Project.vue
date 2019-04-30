<template>
  <box half responsive :style="{ height: `${height}px` }" class="project">
    <div class="content" @click="$emit('clicked')" :class="{ active }">
      <t grey body small>{{ type }}</t>
      <t title medium thick>{{ title }}</t>
      <t link body small><nuxt-link :to="link">check it out</nuxt-link></t>
    </div>
    <div class="project-image" :style="{ backgroundImage: `url(${image})` }" />
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
    active: Boolean
  }
}
</script>
<style lang="css" scoped>
.content{
  display: block;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 50px;
  opacity: 0;
  background: white;
  transition: opacity .5s;
  position: relative;
  z-index: 1
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
@media screen and (max-width: 800px){
  .content.active{
    opacity: .95
  }
}

@media screen and (min-width:801px){

  .project:hover .content{
    opacity: .95
  }

  .project-link{
    display: block;
  }
}
</style>
