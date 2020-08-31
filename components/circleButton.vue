<template lang="html">
  <button type="button" name="button" class="circle-button">
    <div class="inner-circle-button">
      <div class="circle-button-content">
        <slot/>
      </div>
    </div>
  </button>
</template>

<script>
export default {
}
</script>

<style lang="scss">
.circle-button{
  border-radius: 50%;
  background: white;
  overflow: hidden;
  padding: 0px;

  .inner-circle-button{
    padding-bottom: 100%;
    position: relative;
  }

  .link,
  .circle-button-content{
    position: absolute;
    top: 0px;
    left: 0px;
    height: 100%;
    width: 100%;
    padding: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
