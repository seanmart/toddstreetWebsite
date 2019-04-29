<template lang="html">
  <div class="is-padding-bottom">
    <div class="image" :style="{ backgroundImage: `url(${data.image})` }" />
    <div class="info">
      <h4>{{ data.title }}</h4>
      <span class="small">{{ data.role }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: ["data"]
};
</script>

<style lang="css" scoped>

.image{
  box-shadow: 0px 20px 20px -20px rgba(0,0,0,.5);
  height: 35vw;
  width: 35vw;
  max-height: 150px;
  max-width: 150px;
  margin: 0px auto;
  background-size: cover;
  border-radius: 100%;
}

 h4{
  font-weight: 600;
  text-align: center;
  margin-top: 20px;
}

span{
  display: block;
  text-align: center;
  margin: 5px 5%;
  color: #999;
}
</style>
