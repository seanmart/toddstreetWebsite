<template lang="html">
  <nuxt-link
    :to="`/projects/${data.permalink}`"
    class="project-item"
    :class="{ active }"
    v-touch="() => (active = !active)"
    v-touch-class="'hover'"
  >
    <div class="info">
      <span>{{ data["work-category"] }}</span>
      <h3>{{ data.header }}</h3>
      <Link :to="`/projects/${data.permalink}`">view project</Link>
    </div>
    <div
      class="image"
      :style="{ backgroundImage: `url(${data['cover-image']})` }"
    />
  </nuxt-link>
</template>

<script>
import { filter, orderBy } from "lodash";
import Link from "@/components/Button";
export default {
  props: ["data"],
  components: { Link },
  data() {
    return {
      active: null
    };
  }
};
</script>

<style lang="css" scoped>

.project-item{
  padding: 40px;
  position: relative;
  z-index: 0;
  overflow: hidden;
  background: #fff;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  overflow: hidden;
}

.image{
  user-select: none;
  background-size: cover;
  background-position: center;
  position: absolute;
  top: 0px;
  left: 0px;
  bottom: 0px;
  right: 0px;
  z-index: 0;
  transition: .25s;
  opacity: 1;
}

.info{
  color: black;
  opacity: 0;
  transition: .5s;
  transform: translateX(-10px);
  position: relative;
  z-index: 1;
}

span{
  user-select: none;
  display: block;
  margin-bottom: 10px;
  color: rgba(0,0,0,.3);
}

h3{
  user-select: none;
  display: block;
  margin-bottom: 40px;
}

@media screen and (min-width:801px){
  .hover .image{
    opacity: .05
  }

  .hover .info{
    opacity: 1;
    transform: translateX(0px);
  }
}

@media screen and (max-width:800px){


  .active .image{
    opacity: .05
  }

  .info{
    transform: translateX(-100%);
  }

  .active .info{
    opacity: 1;
    transform: translateX(0px);
  }
}
</style>
