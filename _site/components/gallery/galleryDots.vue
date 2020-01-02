<template lang="html">
  <div :class="['gallery-dots', {top, bottom: !this.top,left, right: !this.left}]">
    <div class="container">
      <template v-for="i in count">
        <div class="dot-container" @click="$emit('set', i - 1)">
          <div :class="['dot',{active: index + 1 === i}]" />
        </div>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    count: Number,
    index: Number,
    top: Boolean,
    bottom: Boolean,
    left: Boolean,
    right: Boolean
  }
}
</script>

<style lang="css">
.gallery-dots{
  z-index: 1;
  position: absolute;
  left: 0px;
  right: 0px;
}
.gallery-dots .container{
  display: flex;
  flex-direction: row;
}

.gallery-dots .dot{
  height: 15px;
  width: 15px;
  border-radius: 100%;
  background: white;
  opacity: .5
}

.gallery-dots .dot.active{
  opacity: 1
}

.gallery-dots .dot-container{
  padding: 10px;
  flex: 0 0 auto;
}

.gallery-dots.left .container{
  justify-content: flex-start;
}

.gallery-dots.right .container{
  justify-content: flex-end;
}

.gallery-dots.top{
  top: 20px;
}

.gallery-dots.bottom{
  bottom: 20px;
}

@media screen and (max-width: 850px){
  .gallery-dots.right .container,
  .gallery-dots.left .container{
    justify-content: center;
  }
}

</style>
