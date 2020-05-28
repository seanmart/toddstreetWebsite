<template lang="html">
  <div class="card">
    <div class="card-container">
      <div class="card-wrapper">
        <div class="card-content" v-entrance:slide>
          <div class="card-ribbon"/>
          <slot/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss">
.card{

  .card-container{
    position: relative;
    width: 100%;
    padding-bottom:100%;
  }
  .card-wrapper{
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
  }
  .card-content{
    height: 100%;
    width: 100%;
    background: #eee;
    position: relative;
    overflow: hidden;
  }
  .card-ribbon{
    transform: scaleX(0);
    position: absolute;
    top: 0px;
    left: 0px;
    right: 0px;
    height: 15px;
    background: blue;
  }
}
</style>
