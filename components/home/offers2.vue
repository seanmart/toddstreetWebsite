<template lang="html">
  <div class="max space top offers-container" :class="{ stack }">
    <tabs
      :labels="labels"
      @clicked="active = $event.index"
      :setActive="active"
      v-if="stack"
    >
      <template v-slot:default="props">
        <h1>{{ props.label }}</h1>
      </template>
    </tabs>
    <div class="list-container">
      <template v-for="(col, i) in content">
        <div class="col" :key="i" ref="col" :class="{ active: i === active }">
          <h1 v-show="!stack">{{ col.label }}</h1>

          <div class="list">
            <p v-for="item in col.list" :key="item">{{ item }}</p>
          </div>
        </div>

        <div
          v-if="i < content.length - 1"
          class="line-container"
          v-show="!stack"
        >
          <div class="line" />
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { chunk } from "lodash";
import tabs from "@/components/global/tabs";
export default {
  components: { tabs },
  props: {
    content: Array
  },
  data() {
    return {
      totalWidth: 0,
      active: 0,
      stack: false
    };
  },
  computed: {
    labels() {
      return this.content.map(i => i.label);
    }
  },
  methods: {
    handleResize() {
      this.stack = this.totalWidth > window.innerWidth / 1.5;
    },
    reducer(total, i) {
      return total + i.clientWidth;
    }
  },
  mounted() {
    this.totalWidth = this.$refs.col.reduce(this.reducer, 0);
    window.addEventListener("resize", this.handleResize);
    this.handleResize();
  }
};
</script>

<style lang="css">

.list-container{
  display: flex;
  flex-direction: row;
}

.offers-container .col{
  flex: 0 0 auto;
}

.offers-container .line-container{
  flex: 1 1 auto;
  text-align: center;
}
.offers-container .line{
  height: 100%;
  display: inline-block;
  border-left: 3px solid white;
}


.offers-container h1{
  display: block;
  font-size: 30px;
  font-weight: 900;
  margin-bottom: 30px;
}

.offers-container p{
  flex: 0 0 auto;
  margin: 5px 0px;
  font-size: 17px;
  font-family: 'Roboto Slab', serif;
}

.stack .list-container{
  justify-content: space-between;
  flex-direction: column;
}

.stack .col{
  margin-top: 30px;
  display: none;
}

.stack .col.active{
  display: block;
}

.stack .list p{
  display: inline-block;
  width: 50%;
}

@media screen and (max-width: 750px){
  .stack .list p{
    width: 100%;
  }
}
</style>
