<template lang="html">
  <nuxt-link :to="to" class="button">
    <slot />
  </nuxt-link>
</template>

<script>
export default {
  props: {
    to: String
  }
}
</script>

<style lang="css" scoped>

.button{
  display: inline-block;
  background: black;
  color: white;
  padding: 10px 15px;
  font-weight: 600;
  border-radius: 3px;
  text-transform: uppercase;
  font-size: .6em;
  line-height: .6em;
  letter-spacing: .1em;
}

.button:hover,.button:active{
  background: #555
}
</style>
