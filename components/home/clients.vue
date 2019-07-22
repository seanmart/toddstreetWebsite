<template lang="html">
  <div class="max">
    <tabs
      :labels="categories"
      @clicked="setIndex($event.index)"
      :setActive="setActive"
      class="space top clients-tabs"
    >
      <template v-slot:default="props">
        <h1>{{ props.label }}</h1>
      </template>
    </tabs>
    <no-ssr>
      <flickity ref="flickity" :options="flickityOptions">
        <div class="category" v-for="c in categories" :key="c">
          <div
            v-for="(client, x) in content[c]"
            :key="x"
            class="client"
            :title="client.title"
          >
            <div class="inner-client" v-html="client.html" />
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
        adaptiveHeight: false
      }
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.$refs.flickity.on("change", event => (this.setActive = event));
    });
  },
  computed: {
    categories() {
      return Object.keys(this.content);
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
.category{
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding-top: 50px;
}

.clients-tabs h1{
  font-size: 20px;
  padding: 20px;
  font-weight: 900
}

.clients-tabs h1:first-child{
  margin-left: -20px;
}

.client{
  flex: 0 0 16.666%;
  fill: white;
}

.inner-client{
  padding-top: 100%;
  position: relative;
}

.inner-client svg{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  max-width:60%;
  max-height: 40%;
}

@media screen and (max-width: 1200px){
  .client{
    flex: 0 0 20%;
  }
}

@media screen and (max-width: 850px){
  .client{
    flex: 0 0 25%;
  }
}

@media screen and (max-width: 600px){
  .client{
    flex: 0 0 33.333%;
  }
}
</style>
