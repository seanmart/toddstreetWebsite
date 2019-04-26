<template lang="html">
  <div class="bars" :class="{ active }" @click="$emit('clicked', !active)">
    <div class="bar top" :style="{ background: color }" />
    <div class="bar bottom" :style="{ background: color }" />
  </div>
</template>

<script>
export default {
  props: {
    color: { type: String, default: '#000' },
    active: Boolean
  }
}
</script>

<style lang="css" scoped>

.bars{
  margin-left: -10px;
  padding: 10px;
  height: 30px;
  width: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  cursor: pointer;
}

.bar{
  height: 2px;
  width: 30px;
  transition: transform .25s;
}


.active .top{
  transform: rotate(45deg) translate(3px, 4px);
}

.active .bottom{
  transform: rotate(-45deg) translate(1px, -3px);
}
</style>
