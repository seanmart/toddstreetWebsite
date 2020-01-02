<template>
  <div class="employee">
    <div class="image" :style="{ backgroundImage: `url(${image})` }" />
    <t title small thick before>{{ name }}</t>
    <t body small grey>{{ role }}</t>
  </div>
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
  flex: 0 0 20%;
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

@media screen and (max-width: 1100px){
  .employee{
    flex: 0 0 25%;
  }
}

@media screen and (max-width: 880px){
  .employee{
    flex: 0 0 33.333%;
  }
}

@media screen and (max-width: 670px){
  .employee{
    flex: 0 0 50%;
  }
}
</style>
