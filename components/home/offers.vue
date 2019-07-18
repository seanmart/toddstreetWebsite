<template lang="html">
  <div class="max">
    <tabs
      :labels="labels"
      @clicked="index = setIndex($event.index)"
      :setActive="setActive"
      class="space top"
    />
    <no-ssr>
      <flickity ref="flickity" :options="flickityOptions">
        <div class="list" v-for="(list, i) in content" :key="i">
          <ul v-for="(chunk, a) in listChunk(list.list)" :key="a">
            <li v-for="(item, b) in chunk" :key="b">
              <p>{{ item }}</p>
            </li>
          </ul>
        </div>
      </flickity>
    </no-ssr>
  </div>
</template>

<script>
import tabs from "@/components/global/tabs";
import { chunk } from "lodash";
export default {
  components: { tabs },
  props: { content: Array },
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
  computed: {
    labels() {
      return this.content.map(x => x.label);
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.$refs.flickity.on("change", event => (this.setActive = event));
    });
  },
  methods: {
    listChunk(l) {
      return chunk(l, Math.ceil(l.length / 2));
    },
    setIndex(i) {
      this.$refs.flickity.select(i);
    }
  }
};
</script>

<style lang="css" scoped>


.list{
  display: flex;
  flex-direction: row;
  width: 100%;
  padding-top: 50px
}

.list ul{
  flex: 0 0 50%;
  padding: 0px;
}

.list li{
  list-style: none;
}

.list p{
  font-family: 'Roboto Slab', serif;
  font-size: 23px;
  padding: 5px 0px;
  transition: font-size .25s
}

@media screen and (max-width:1180px){
  .list p{
    font-size: 22px;
  }
}

@media screen and (max-width:1000px){
  .list p{
    font-size: 19px;
  }
}

@media screen and (max-width:850px){
  .list{
    flex-direction: column;
  }

  .list p{
    font-size: 23px;
  }
}

@media screen and (max-width:600px){

  .list p{
    font-size: 18px;
  }
}
</style>
