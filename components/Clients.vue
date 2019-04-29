<template lang="html">
  <div class="is-padding">
    <Grid>
      <template v-for="client in clients">
        <div class="client" v-html="client.body" />
      </template>
    </Grid>
  </div>
</template>
<script>
import Grid from "@/components/Grid";
export default {
  components: { Grid },
  computed: {
    clients() {
      return this.$store.getters.clients;
    }
  }
};
</script>

<style lang="css">

.clients{
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  margin: -30px;
}

.client{
  flex: 0 0 25%;
  padding: 30px;
  text-align: center;
}

.client svg{
  fill: #aaa;
  width: 100%;
  max-height: 60px;
  max-width: 100px;
}

@media screen and (max-width: 1000px){
  .client{
    flex: 0 0 33.333%;
  }
}

@media screen and (max-width: 600px){
  .client{
    flex: 0 0 50%;
  }
}
</style>
