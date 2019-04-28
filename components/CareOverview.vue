<template lang="html">
  <div class="is-padding">
    <h1 class="is-padding-bottom section"><i class="yellow">How</i> We Care</h1>
    <div class="cares">
      <template v-for="care in cares">
        <div class="care">
          <div class="care-image" :style="img(care['cover-image'])" />
          <div class="info">
            <h4>{{ care.title }}</h4>
            <Button to="/work">view</Button>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import Button from '@/components/Button'
export default {
  components: { Button },
  computed: {
    cares() {
      return this.$store.getters.careOverview
    }
  },
  methods: {
    img(img) {
      return { backgroundImage: `url(${img})` }
    }
  }
}
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
  box-shadow: 0px 2px 5px -2px rgba(0,0,0,.2);
  margin-bottom: 30px;

}

.care-image{
  padding-top: 70%;
  background-size: cover;
}

.info{
  padding: 30px;
  text-align: center;
}

h4{
  margin-bottom: 30px;
  font-weight: 500;
  text-align: left;
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
