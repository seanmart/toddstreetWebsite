<template lang="html">
  <div class="is-padding">
    <h1 class="is-padding-bottom section">
      <i class="red">Who</i> We Work With
    </h1>
    <div class="clients">
      <template v-for="client in clients">
        <div class="client" v-html="client.body" />
      </template>
    </div>
  </div>
</template>
<script>
export default {
  computed: {
    clients() {
      return this.$store.getters.clients
    }
  }
}
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
  flex: 1 1 auto;
  padding: 30px;
  text-align: center;
}

.client svg{
  fill: #bbb;
  width: 100%;
  max-height: 60px;
  max-width: 100px;
}
</style>
