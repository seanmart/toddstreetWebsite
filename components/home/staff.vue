<template lang="html">
  <div class="max">
    <tabs
      :labels="departments"
      @clicked="setIndex($event.index)"
      :setActive="setActive"
      class="space top"
    />
    <no-ssr>
      <flickity ref="flickity" :options="flickityOptions">
        <div class="department" v-for="(d, i) in departments" :key="i">
          <div class="employee" v-for="(e, x) in content[d]" :key="x">
            <div
              class="image"
              :style="{ backgroundImage: `url(${e.image})` }"
            />
            <div class="text">
              <h3>{{ e.title }}</h3>
              <p>{{ e.role }}</p>
            </div>
          </div>
        </div>
      </flickity>
    </no-ssr>
  </div>
</template>

<script>
import tabs from "@/components/global/tabs";
export default {
  components: { tabs },
  props: {
    content: Object
  },
  data() {
    return {
      setActive: 0,
      flickityOptions: {
        initialIndex: 0,
        prevNextButtons: false,
        pageDots: false,
        wrapAround: true,
        freeScroll: false,
        autoPlay: false,
        pauseAutoPlayOnHover: false,
        selectedAttraction: 0.02,
        friction: 0.25,
        adaptiveHeight: true
      }
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.$refs.flickity.on("change", event => (this.setActive = event));
    });
  },
  computed: {
    departments() {
      return Object.keys(this.content);
    },
    employees() {
      return this.content[this.departments[this.active]];
    }
  },
  methods: {
    setIndex(i) {
      this.$refs.flickity.select(i);
    }
  }
};
</script>

<style lang="css">
.department{
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  width: 100%;
  padding-top: 50px;
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
  font-weight: 300
}

@media screen and (max-width: 850px){
  .employee .image{
    height: 100px;
    width: 100px;
  }
}

@media screen and (max-width: 700px){
  .department{
    flex-direction: column;
  }
}
</style>
