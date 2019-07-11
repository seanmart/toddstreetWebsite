<template lang="html">
  <div ref="tabs" class="tabs-container" :class="{ collapse }">
    <div class="tabs" :style="{ opacity: this.totalWidth > 0 ? 1 : 0 }">
      <p
        v-for="(item, i) in labels"
        :title="item"
        :key="i"
        @click="handleClick(i)"
        :class="{ active: i === active }"
        ref="tab"
      >
        {{ item }}
      </p>
      <p class="arrow left" @click="handleArrow(active - 1)"><arrow /></p>
      <p class="arrow right" @click="handleArrow(active + 1)"><arrow /></p>
    </div>
  </div>
</template>

<script>
import arrow from "@/components/svg/Arrow";
export default {
  components: { arrow },
  props: {
    labels: Array
  },
  data() {
    return {
      active: 0,
      collapse: false,
      totalWidth: 0
    };
  },
  mounted() {
    this.totalWidth = this.$refs.tab.reduce(this.reducer, 0);
    window.addEventListener("resize", this.handleResize);
    this.handleResize();
  },
  destroyed() {
    window.removeEventListener("resize", this.handleResize);
  },
  methods: {
    handleClick(i) {
      this.active = i;
      this.$emit("clicked", {
        item: this.labels[this.active],
        index: this.active
      });
    },
    handleResize() {
      this.collapse = this.$refs.tabs.clientWidth < this.totalWidth;
    },
    handleArrow(inc) {
      let l = this.labels.length;
      let i = inc === l ? 0 : inc < 0 ? l - 1 : inc;
      this.handleClick(i);
    },
    reducer(total, i) {
      return total + i.clientWidth;
    }
  }
};
</script>

<style lang="css">
.tabs-container{
  padding: 0px 0px 15px;
  margin: 70px 0px;
  border-bottom: 3px solid white;
  width: 100%;
  overflow: hidden;
  height: 80px;
  text-align: center;
}
.tabs{
  font-size: 18px;
  display: inline-flex;
  flex-direction: row;
  position: relative;
  justify-content: flex-start;
}

.tabs .arrow{
  position: absolute;
  top: 0px;
  display: none;
  padding: 20px;
}

.tabs .arrow.left svg{
  transform: rotate(180deg);
}

.tabs .arrow:active{
  transform: scale(.95)
}

.tabs .arrow.left{
  right: 100%;
}

.tabs .arrow.right{
  left: 100%;
}

.tabs p{
  flex: 0 0 auto;
  font-size: inherit;
  opacity: .85;
  cursor: pointer;
  transition: font-weight .25s;
  display: inline-block;
  text-align: center;
  padding:20px;
}

.tabs p::before {
  display: block;
  content: attr(title);
  font-weight: 900;
  height: 1px;
  color: blue;
  overflow: hidden;
  visibility: hidden;
  font-size: inherit
}

.tabs p.active{
  font-weight: 900;
  opacity: 1;
}

@media screen and (max-width:850px){
  .tabs-container{
    text-align: left;
  }

  .tabs{
    margin-left: -20px;
  }
}

.tabs-container.collapse{
  text-align: center;
}

.tabs-container.collapse .tabs{
  flex-direction: column;
  margin-left: 0px;
}
.tabs-container.collapse p{
  transition: none;
}

.tabs-container.collapse p.active{
  order: -1
}

.tabs-container.collapse .arrow{
  display: block;
}
</style>
