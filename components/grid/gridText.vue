<template lang="html">
  <div :class="['grid-text bg-100', {reveal}]">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    reveal: Boolean
  }
}
</script>

<style lang="css">
.grid-text{
  padding: 30px;
}

.grid-text.reveal{
  transition: .5s;
  opacity:0;
  position: absolute;
  top: 20px;
  bottom: 20px;
  left: 20px;
  right: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}


.grid-inner-box:hover .grid-text.reveal{
  opacity: 1
}
</style>
