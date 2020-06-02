<template lang="html">
  <div class="section-description">
    <p class="bold body--rg" v-html="heading" v-enter:slideup/>
    <p class="body--rg" v-html="description" v-enter:slideup/>
  </div>
</template>

<script>
export default {
  props:{
    heading: {type: String, default: ''},
    description: {type: String, default: ''}
  }
}
</script>

<style lang="scss">
.section-description{
  margin-left: $col4 + $gutter;
  margin-bottom: $desktop-section-space;

  @media (max-width: $tablet){
    margin-left: $col4;
  }

  @media (max-width: $mobile){
    margin-left: 0px;
    br{
      display: none;
    }
  }
}
</style>
