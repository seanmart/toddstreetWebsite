<template lang="html">
  <nuxt-link :to="to" class="fancy-link">
    <div class="plus">
      <icons plus class="plus"/>
    </div>
    <h3 class="fancy-link-text">
      <slot/>
    </h3>
  </nuxt-link>
</template>

<script>
export default {
  props:{
    to: {type: String, default: '/'}
  }
}
</script>

<style lang="scss">
.fancy-link{
  display: inline-flex;
  align-items: center;
  @include headerFont;

  .fancy-link-text{
    flex: 0 0 auto;
    font-size: 20px;
    text-transform: uppercase;
    font-weight: 500;
    padding-left: 5px;
    transition: transform .25s;
  }

  .plus{
    flex: 0 0 auto;
    fill: #ffb723;
    line-height: 0;
    svg{
      transition: transform .25s;
      width: 14px;
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
