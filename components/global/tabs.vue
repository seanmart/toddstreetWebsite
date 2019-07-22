<template lang="html">
  <div class="tabs" :class="{ collapse, black }" ref="tabs">
    <arrow class="arrow left" @click.native="set(active - 1)" />
    <template v-for="(label, i) in labels">
      <div class="tab" ref="tab" :class="isActive(i)" @click="set(i)">
        <slot v-bind:label="label" />
      </div>
    </template>
    <arrow class="arrow right" @click.native="set(active + 1)" />
  </div>
</template>

<script>
import arrow from "@/components/svg/Arrow";
export default {
  components: { arrow },
  props: {
    setActive: Number,
    labels: Array,
    black: { type: Boolean, default: false }
  },
  data() {
    return {
      active: 0,
      collapse: false,
      totalWidth: 0
    };
  },
  watch: {
    setActive() {
      this.set(this.setActive);
    }
  },
  methods: {
    set(i) {
      let l = this.labels.length;
      let next = i === l ? 0 : i < 0 ? l - 1 : i;
      this.active = next;
      this.$emit("clicked", {
        item: this.labels[this.active],
        index: this.active
      });
    },
    isActive(i) {
      return this.active === i ? "active" : "";
    },
    handleResize() {
      this.collapse = this.$refs.tabs.clientWidth < this.totalWidth;
    },
    reducer(total, i) {
      return total + i.clientWidth + 20;
    }
  },
  mounted() {
    if (this.setActive) this.active = this.setActive;
    this.totalWidth = this.$refs.tab.reduce(this.reducer, 0);
    window.addEventListener("resize", this.handleResize);
    this.handleResize();
  },
  destroyed() {
    window.removeEventListener("resize", this.handleResize);
  }
};
</script>

<style lang="css">
.tabs{
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  border-bottom: 3px solid #fff;
}

.tabs.black{
  border-color: black;
}

.tab{
  flex: 0 0 auto;
  white-space: nowrap;
  font-weight: 900;
  margin: 0px 10px;
  border-radius: 0px;
  cursor: pointer;
  font-size: 18px;
  opacity: .3
}

.tab.active{
  opacity: 1
}

.tab:first-of-type{
  margin-left: 0px;
}

.tabs .arrow{
  flex: 0 0 auto;
  box-sizing: content-box;
  padding: 10px;
  display: none;
  fill: white;
}

.tabs.black .arrow{
  fill: black;
}

.tabs .arrow.left{
  transform: rotate(180deg);
}

.tabs.collapse{
  justify-content: center;
}

.tabs.collapse .tab{
  display: none;
}

.tabs.collapse .tab.active{
  display: block;
  background: none;
  color: inherit;
  flex: 1 1 auto;
  text-align: center;
}

.tabs.collapse .arrow{
  display: block;
}
</style>
