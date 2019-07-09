<template lang="html">
  <div class="project">
    <brackets :trigger="trigger" :time="1">
      <h1 v-if="text.title">{{ text.title }}</h1>
      <p v-if="text.description">{{ text.description }}</p>
    </brackets>
    <div class="image" :style="{ backgroundImage: `url(${image})` }" />
  </div>
</template>

<script>
import brackets from "@/components/brackets";
export default {
  components: {
    brackets
  },
  props: {
    image: { type: String, default: "" },
    text: { type: Object, default: {} },
    trigger: Boolean
  }
};
</script>

<style lang="css">
.project{
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}

.image{
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  position: absolute;
  top: 0px;
  left: 0px;
  bottom: 0px;
  right: 0px;
  z-index: -1;
  opacity: .4
}

.project h1{
  font-weight: 900;
  max-width: 80vw;
}
</style>
