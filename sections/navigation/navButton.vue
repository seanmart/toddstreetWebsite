<template lang="html">
  <button type="button" id="nav-button"><i/><i/><i/></button>
</template>

<script>
export default {
}
</script>

<style lang="scss">
#nav-button{
  z-index: 100;
  height: $space--dk;
  width: $margin--dk;
  position: fixed;
  top: 0px;
  right: 0px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  i{
    flex: 0 0 auto;
    width: 30px;
    height: 2px;
    margin: 2px 0px;
    background: black;
    border-radius: 1px;
    transition: transform .25s;
  }
  &:hover{
    i:first-child{
      transform: translateY(-2px);
    }
    i:last-child{
      transform: translateY(2px);
    }
  }
  @media (max-width: $tablet){
    height: $space--tb;
    width: $margin--tb;
  }
  @media (max-width: $mobile){
    height: $space--mb;
    width: $margin--mb-right;
  }
}
</style>
