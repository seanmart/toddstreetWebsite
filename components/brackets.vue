<template lang="html">
  <div class="brackets" ref="brackets" :style="{ opacity: animated ? 0 : 1 }">
    <div class="bracket left" />
    <div class="content">
      <slot />
    </div>
    <div class="bracket right" />
  </div>
</template>

<script>
import { TimelineMax } from "gsap";
export default {
  props: {
    animated: Boolean,
    time: { type: Number, default: 2 }
  },
  mounted() {
    if (!this.animated) return;
    let brackets = this.$refs.brackets;
    let width = brackets.getBoundingClientRect().width;
    let tl = new TimelineMax({ delay: 0.2 });

    tl.set(brackets, {
      width: 0,
      paddingLeft: 4,
      paddingRight: 4
    });

    tl.to(brackets, this.time, {
      opacity: 1,
      width: width,
      padding: "4vw",
      ease: Power4.easeOut
    });

    tl.set(brackets, {
      clearProps: "all"
    });
  }
};
</script>

<style lang="css" scoped>

.brackets{
  position: relative;
  padding: 4vw;
  overflow: hidden;
}

.brackets .content{
  display: flex;
  justify-content: center;
  align-items: center;
  white-space: nowrap;
}

.bracket{
  border: .6vw solid #333;
  position: absolute;
  top: 0px;
  height: 100%;
  width: 3vw;
  z-index: 1
}

.bracket.left{
  left: 0px;
  border-right: none
}

.bracket.right{
  right: 0px;
  border-left: none
}
</style>
