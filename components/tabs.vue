<template lang="html">
  <div class="tabs">
    <p
      v-for="(item, i) in list"
      :title="item.label"
      :key="i"
      @click="click(i)"
      :class="{ active: i === active }"
    >
      {{ item.label }}
    </p>
  </div>
</template>

<script>
export default {
  props: {
    list: Array
  },
  data() {
    return {
      active: 0
    };
  },
  methods: {
    click(i) {
      this.$emit("clicked", { item: this.list[i], index: i });
      this.active = i;
    }
  }
};
</script>

<style lang="css">
.tabs{
  display: flex;
  flex-direction: row;
  padding: 0px 15px 15px;
  margin: 70px 0px;
  border-bottom: 3px solid white;
  width: 100%;
  overflow: scroll;
}

.tabs p{
  flex: 1 1 auto;
  font-size: 1.2em;
  padding:10px 20px;
  opacity: .85;
  cursor: pointer;
  transition: .25s;
}

.tabs p::after {
  font-size: 1.2em;
    display: block;
    content: attr(title);
    font-weight: 900;
    height: 0;
    overflow: hidden;
    visibility: hidden;
}

.tabs p.active{
  font-weight: 900;
  opacity: 1;
}
</style>
