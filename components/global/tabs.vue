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
  font-size: 18px;
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

@media screen and (max-width: 850px){
  .tabs{
    justify-content: flex-start;
    padding-left: 0px;
    padding-right: 0px;
    margin: 50px 0px;
  }

  .tabs p{
    flex: 0 1 auto;
    text-align: left;
    margin: 0px;
    padding: 10px;
    font-size: 16px
  }

  .tabs p:first-child{
    margin-left: -10px;
  }

}

@media screen and (max-width: 600px){
  .tabs{
    font-size: 16px
  }
}
</style>
