<template lang="html">
  <div class="project inset">
    <div class="max">
      <h3 v-if="text.category">{{ text.category }}</h3>
      <h1 v-if="text.title">{{ text.title }}</h1>
      <btn white medium caps :to="link">check it out</btn>
    </div>
    <div
      class="image"
      :class="{ fade: active }"
      :style="{ backgroundImage: `url(${image})` }"
    />
  </div>
</template>

<script>
import btn from "@/components/global/button";
export default {
  props: {
    image: { type: String, default: "" },
    text: { type: Object, default: {} },
    link: String,
    active: Boolean
  },
  components: { btn }
};
</script>

<style lang="css">
.project{
  position: relative;
}

.project .text{
  padding: 4vw;
}
.project .image{
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  position: absolute;
  top: 0px;
  left: 0px;
  bottom: 0px;
  right: 0px;
  z-index: -1;
  transition: opacity 1s;
}

.image.fade{
  opacity: .5
}


.project .link{
  margin-top: 40px;
}

.project h1{
  margin: 10px 0px 40px;
  font-weight: 900;
}

.project h3{
  text-transform: uppercase;
  font-size: .9em;
  font-weight: 400;
  letter-spacing: 2px;
}
</style>
