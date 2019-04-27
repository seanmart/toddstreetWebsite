<template lang="html">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 252 252"
    class="burger"
    @click="$emit('clicked')"
    :class="{ on }"
  >
    <rect class="top" width="252" height="15" rx="4.46" y="80" />
    <rect class="bottom" y="147" width="252" height="15" rx="4.46" />
  </svg>
</template>

<script>
export default {
  props: {
    on: Boolean
  }
}
</script>

<style lang="css" scoped>

.burger{
  width: 40px;
  padding: 5px;
  transition: .1s;
}

.top, .bottom{
  transform-origin: center;
  transition: transform .25s;
}
.on .top{
  transform: translateX(-10%) rotate(45deg);
}

.on .bottom{
  transform: translateY(-18%) translateX(-8%) rotate(-45deg);
}
</style>
