<template lang="html">
  <div class="tabs-container" ref="tabs">
    <div
      class="tabs"
      :class="{ collapse }"
      :style="{ opacity: this.totalWidth > 0 ? 1 : 0 }"
    >
      <p
        v-for="(item, i) in labels"
        :title="item"
        :key="i"
        @click="click(i)"
        :class="{ active: i === active }"
        ref="tab"
      >
        {{ item }}
      </p>
      <p class="arrow left" @click="handleClick(-1)"><</p>
      <p class="arrow right" @click="handleClick(1)">></p>
    </div>
  </div>
</template>

<script>
export default {
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
  watch: {
    active() {
      this.$emit("clicked", {
        item: this.labels[this.active],
        index: this.active
      });
    }
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
    click(i) {
      this.active = i;
    },
    handleResize() {
      this.collapse = this.$refs.tabs.clientWidth < this.totalWidth;
    },
    handleClick(inc) {
      let i = this.active + inc;
      this.active =
        i === this.labels.length ? 0 : i < 0 ? this.labels.length : i;
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
}

.tabs .arrow{
  position: absolute;
  top: 0px;
  display: none;
  padding: 20px;
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

.tabs.collapse{
  flex-direction: column;
  justify-content: flex-start;
}
.tabs.collapse p{
  transition: none;
}

.tabs.collapse p.active{
  order: -1
}

.tabs.collapse .arrow{
  display: block;
}
</style>
