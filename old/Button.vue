<template lang="html">
  <nuxt-link :to="to" class="button" :class="{ big }">
    <slot />
  </nuxt-link>
</template>

<script>
export default {
  props: {
    to: String,
    big: { type: Boolean, default: false }
  }
};
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

.button.big{
  padding: 15px 25px;
  font-size: 1em;
  letter-spacing: .2em;
}

.button:hover,.button:active{
  background: #555
}
</style>
