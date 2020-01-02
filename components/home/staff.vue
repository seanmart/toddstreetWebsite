<template lang="html">
  <div class="max space top staff-container">
    <carousel :options="options">
      <div class="staff-page" v-for="(page, i) in staff" :key="i">
        <div class="employee" v-for="(e, x) in page" :key="x">
          <div class="image" :style="{ backgroundImage: `url(${e.image})` }" />
          <div class="text">
            <h3>{{ e.title }}</h3>
            <p>{{ e.role }}</p>
          </div>
        </div>
      </div>
    </carousel>
  </div>
</template>

<script>
import tabs from "@/components/global/tabs";
import carousel from "@/components/global/carousel";
import { chunk } from "lodash";
export default {
  components: { tabs, carousel },
  props: {
    content: Array
  },
  data() {
    return {
      index: 0,
      options: {
        initialIndex: 0,
        prevNextButtons: false,
        pageDots: true,
        wrapAround: true,
        freeScroll: false,
        autoPlay: false,
        pauseAutoPlayOnHover: false,
        selectedAttraction: 0.02,
        friction: 0.25,
        adaptiveHeight: false
      }
    };
  },
  computed: {
    staff() {
      return chunk(this.content, 6);
    }
  }
};
</script>

<style lang="css">

.staff-page{
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  width: 100%;
  padding-bottom: 50px;
}

.employee{
  flex: 0 0 50%;
  padding: 10px;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
}


.employee .image{
  flex: 0 0 auto;
  height: 120px;
  width: 120px;
  margin-right: 20px;
  background-size: cover;
}

.employee .text{
  flex: 1 1 auto;
}

.employee h3{
  font-size: 16px;
  font-weight: 900;
  margin-bottom: 3px;
}

.employee p{
  font-family: 'Roboto Slab', serif;
  font-size: 13px;
  font-weight: 400
}


@media screen and (max-width: 850px){
  .employee .image{
    height: 90px;
    width: 90px;
  }
}

@media screen and (max-width: 700px){
  .staff-page{
    flex-direction: column;
    padding: 50px 0px 0px;
  }

  .employee{
    padding: 7px;
  }

  .staff-container .flickity-page-dots {
    top: -20px;
    bottom: 100%;
  }
}
</style>
