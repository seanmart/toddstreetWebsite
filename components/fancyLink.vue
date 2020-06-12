<template lang="html">
  <nuxt-link v-if="to" :to="to" class="fancy-link">
    <div class="plus"><icons plus class="plus"/></div>
    <h3 v-if="$slots.default" class="fancy-link-text button--rg"><slot/></h3>
    <h3 v-else class="fancy-link-text button--rg">check it out</h3>
  </nuxt-link>
  <div v-else class="fancy-link">
    <div class="plus"><icons plus class="plus"/></div>
    <h3 v-if="$slots.default" class="fancy-link-text button--rg"><slot/></h3>
    <h3 v-else class="fancy-link-text button--rg">check it out</h3>
  </div>
</template>

<script>
export default {
  props:{
    to: {type: [String, Object], default: null}
  }
}
</script>

<style lang="scss">
.fancy-link{
  display: inline-flex;
  align-items: center;

  .fancy-link-text{
    flex: 0 0 auto;
    padding-left: 5px;
    transition: transform .25s;
  }

  .plus{
    flex: 0 0 auto;
    fill: $yellow;
    line-height: 0;
    svg{
      transition: transform .25s;
      width: 12px;
    }
  }

  &:hover{
    .fancy-link-text{
      transform: translateX(5px);
    }
    svg{
      transform: rotate(90deg);
    }
  }

}

</style>
