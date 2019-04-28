<template lang="html">
  <div class="is-padding is-grey">
    <h1 class="is-padding-bottom section"><i class="yellow">How</i> We Care</h1>
    <div class="cares">
      <template v-for="care in cares">
        <div class="care">
          <div class="image" :style="img(care['cover-image'])" />
          <div class="info">
            <h4>{{ care.title }}</h4>
            <span class="small">{{ shorten(care.body) }}...</span>
            <Button to="/work" class="link">view</Button>
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
    },
    shorten(s) {
      return s
        .split(' ')
        .slice(0, 15)
        .join(' ')
    }
  }
}
</script>

<style lang="css" scoped>

.cares{
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
  margin: 0px -20px -20px;
}

.care{
  flex: 0 0 33.333%;
  padding: 20px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: stretch;

}

.image{
  flex: 0 0 200px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.info{
  flex: 1 1 auto;
  position: relative;
  padding: 30px 30px 60px;
  background: white;
}

h4{
  margin-bottom: 10px;
  font-weight: 700;
  text-align: left;
  text-transform: uppercase;
}

span{
  margin-bottom: 30px;
  line-height: 1.4em;
  color: #999;
  display: block;
}

.link{
  position: absolute;
  bottom: 30px;
  left: 30px;
}

@media screen and (max-width: 1000px){
  .care{
    flex: 0 0 100%;
    flex-direction: row;
  }
}

@media screen and (max-width: 600px){
  .care{
    flex-direction: column;
  }
}
</style>
