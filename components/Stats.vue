<template lang="html">
  <div class="is-padding is-grey">
    <h1 class="is-padding-bottom section"><i class="blue">Our</i> Stats</h1>
    <div class="stats">
      <template v-for="stat in stats">
        <div class="stat">
          <div class="icon blue" v-html="icons[stat.icon].body" />
          <h1>{{ title(stat['stat-title']) }}</h1>
          <span>{{ stat['stat-description'] }}</span>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    stats() {
      return this.$store.getters.stats
    },
    icons() {
      return this.$store.getters.icons
    }
  },
  methods: {
    title(title) {
      if (title['date-diff']) {
        let today = new Date().getFullYear()
        return today - title['date-diff']
      }
      if (title.get) {
        return this.$store.getters[title.get]
      }
      return title
    }
  }
}
</script>

<style lang="css">
.stats{
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.stat{
  flex: 0 0 33.333%;
  text-align: center;
  padding: 40px;
}

.stat .icon{
  margin-bottom: 20px;
}

.stat svg{
  width: 50%;
  max-width: 100px;
}

.stat h1{
  font-weight: 600;
  margin-bottom: 10px;
}

.stat span{
  color: #999;
}

@media screen and (max-width: 900px){
  .stat{
    flex: 0 0 50%;
  }
}

@media screen and (max-width: 600px){
  .stat{
    flex: 0 0 100%;
  }
}
</style>
