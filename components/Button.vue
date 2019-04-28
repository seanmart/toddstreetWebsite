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
  background: rgba(0,0,0,.03);
  color: rgba(0,0,0,.4);
  padding: 10px 15px;
  border: 1px solid rgba(0,0,0,.1);
  font-weight: 600;
  border-radius: 3px;
  text-transform: uppercase;
  font-size: .6em;
  line-height: .6em;
  letter-spacing: .1em;
}

.button:hover{
  background: black;
  color: white;
  border-color: black;
}
</style>
