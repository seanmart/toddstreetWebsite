<template lang="html">
  <button type="button" :class="{hide}" name="btn" class="btn">
    <div class="btn-content">
      <div class="text button--rg">
        <slot/>
      </div>
      <div class="circle"/>
    </div>
  </button>
</template>

<script>
export default {
  props:{
    hide: Boolean
  }
}
</script>

<style lang="scss">

.btn{

  .btn-content{
    position: relative;
    width: 100px;
    height: 100px;
    transition: transform .25s;
  }

  .text, .circle{
    position: absolute;
    height: 100%;
    width: 100%;
  }

  .text{
    z-index: 1;
  }

  .circle{
    border-radius: 50%;
    background: white;
  }

  &.hide{
    .btn-content{
      transform: scale(0)
    }
  }



}
</style>
