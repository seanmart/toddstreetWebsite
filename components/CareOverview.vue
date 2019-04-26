<template lang="html">
  <div class="is-padding line-top">
    <h1 class="is-padding-bottom"><i class="yellow">How</i> We Care</h1>
    <div class="cares">
      <template v-for="care in cares">
        <div class="care">
          <div class="care-image" :style="img(care['cover-image'])" />
          <h4>{{ care.title }}</h4>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    cares() {
      return this.$store.getters.careOverview;
    }
  },
  methods: {
    img(img) {
      return { backgroundImage: `url(${img})` };
    }
  }
};
</script>

<style lang="css" scoped>

.cares{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-bottom: -30px;
}

.care{
  flex: 0 0 23%;
  background: white;
  border: 1px solid #eee;
  box-shadow: 0px 20px 20px -20px rgba(0,0,0,.5);
  margin-bottom: 30px;
}

.care-image{
  padding-top: 100%;
  background-size: cover;
}

h4{
  padding: 40px 30px;
}

@media screen and (max-width: 1200px){
  .care{
    flex: 0 0 31%;
  }
}

@media screen and (max-width: 900px){
  .care{
    flex: 0 0 48%;
  }
}

@media screen and (max-width: 600px){
  .care{
    flex: 0 0 100%;
  }
}
</style>
