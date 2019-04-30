<template>
  <box col5 class="employee">
    <div class="image" :style="{ backgroundImage: `url(${image})` }" />
    <t title small thick before>{{ name }}</t>
    <t body small grey>{{ role }}</t>
  </box>
</template>
<script>
export default {
  props: {
    name: String,
    role: String,
    image: String
  }
}
</script>
<style lang="css" scoped>

.employee{
  text-align: center;
  padding:10px;
}

.image{
  height: 32vw;
  width: 32vw;
  max-height: 150px;
  max-width: 150px;
  border-radius: 100%;
  background-size: cover;
  margin: 0px auto;
}
</style>
