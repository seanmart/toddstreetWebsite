<template lang="html">
  <div :to="data.link" class="side-post">
    <div class="title-container">
      <h3 class="title title--font" v-html="data.title"/>
    </div>
    <div class="link-container">
      <nuxt-link :to="data.link" class="link fancy-link">check it out</nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  props:['data']
}
</script>

<style lang="scss">
.side-post{
  padding: 30px 0px;
  border-top: 1px solid $yellow;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: stretch;
  min-height: 180px;

  &:last-child{
    border-bottom: 1px solid $yellow;
  }

  h3{
    font-weight: 600;
    font-size: 30px;
    margin-bottom: 10px;
  }

  .title-container,
  .link-container{
    overflow: hidden;
    flex: 0 0 auto;
  }
}
</style>
