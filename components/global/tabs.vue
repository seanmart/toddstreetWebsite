<template lang="html">
  <div class="tabs" :class="{ collapse, black }" ref="tabs">
    <arrow class="arrow left" @click.native="set(active - 1)" />
    <template v-for="(label, i) in labels">
      <p class="tab" ref="tab" :class="isActive(i)" @click="set(i)">
        {{ label }}
      </p>
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
  justify-content: center;
  align-items: center;
  border-bottom: 3px solid #fff;
  padding-bottom: 20px;
}

.tabs.black{
  border-color: black;
}

.tab{
  flex: 0 0 auto;
  padding: 8px 20px;
  white-space: nowrap;
  font-weight: 700;
  margin: 0px 10px;
  border-radius: 25px;
}

.tabs.black .tab{
  color: black;
}

.tab.active{
  background: white;
  color: black;
}

.tabs.black .tab.active{
  background: black;
  color: white;
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

.tabs.collapse .tab{
  display: none;
}

.tabs.collapse .tab.active{
  display: block;
  background: none;
  color: inherit;
  min-width: 200px;
  text-align: center;
}

.tabs.collapse .arrow{
  display: block;
}
</style>
