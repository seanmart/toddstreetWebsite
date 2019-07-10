<template lang="html">
  <div class="project">
    <div
      class="image"
      :class="{ fade: active }"
      :style="{ backgroundImage: `url(${image})` }"
    />
  </div>
</template>

<script>
export default {
  props: {
    image: { type: String, default: "" },
    text: { type: Object, default: {} },
    link: String,
    active: Boolean
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

.project .text{
  padding: 4vw;
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
  transition: opacity 1s;
}

.image.fade{
  opacity: .3
}


.project .link{
  margin-top: 40px;
}

.project h1{
  max-width: 60vw;
}

.project h3{
  margin-bottom: 10px;
  text-transform: uppercase;
  font-size: .9em;
  font-weight: 400;
  letter-spacing: 1px;
}
</style>
