<template lang="html">
  <div class="tabs">
    <p
      v-for="(item, i) in labels"
      :title="item"
      :key="i"
      @click="click(i)"
      :class="{ active: i === active }"
    >
      {{ item }}
    </p>
  </div>
</template>

<script>
export default {
  props: {
    labels: Array
  },
  data() {
    return {
      active: 0
    };
  },
  methods: {
    click(i) {
      this.$emit("clicked", { item: this.labels[i], index: i });
      this.active = i;
    }
  }
};
</script>

<style lang="css">
.tabs{
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 0px 15px 15px;
  margin: 70px 0px;
  border-bottom: 3px solid white;
  width: 100%;
  overflow: scroll;
}

.tabs p{
  flex: 0 0 auto;
  font-size: 1.2em;
  opacity: .85;
  cursor: pointer;
  transition: .25s;
  display: inline-block;
  text-align: center;
  padding: 5px;
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

@media screen and (max-width: 700px){
  .tabs{
    justify-content: flex-start;
    padding-left: 0px;
  }

  .tabs p{
    text-align: left;
  }
  .tabs p:first-child{
    margin-left: -5px;
  }
}
</style>
