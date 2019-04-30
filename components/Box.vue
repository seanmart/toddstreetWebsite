<template>
  <div
    class="box"
    :class="{
      grow,
      shrink,
      half,
      third,
      fourth,
      fifth,
      responsive,
      cover,
      contain
    }"
  >
    <slot />
  </div>
</template>
<script>
export default {
  props: {
    grow: Boolean,
    shrink: Boolean,
    half: Boolean,
    third: Boolean,
    fourth: Boolean,
    fifth: Boolean,
    responsive: Boolean,
    cover: Boolean,
    contain: Boolean
  }
}
</script>
<style lang="css">
.box{
  flex: 0 0 auto;
  position: relative;
  background-position: center bottom;
  background-repeat: no-repeat;
}

.box.cover{
  background-size: cover;
}

.box.contain{
  background-size: contain;
}

.box.half{
  flex: 0 0 50%
}

.box.third{
  flex: 0 0 33.333%;
}

.box.fourth{
  flex: 0 0 25%;
}

.box.fifth{
  flex: 0 0 20%;
}

@media screen and (max-width:1200px){
  .box.fourth.responsive,
  .box.fifth.responsive{
    flex: 0 0 33.333%
  }

}

@media screen and (max-width: 850px){
  .box.fourth.responsive,
  .box.fifth.responsive,
  .box.third.responsive{
    flex: 0 0 50%
  }
}

@media screen and (max-width: 800px){

  .box.half.responsive,
  .box.third.responsive{
    flex: 0 0 100%;
  }

}

.box.grow{
  flex-grow: 1
}

.box.shrink{
  flex-shrink: 1
}
</style>
