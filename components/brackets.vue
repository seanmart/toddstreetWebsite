<template lang="html">
  <div class="brackets" ref="brackets">
    <div class="bracket left" />
    <div class="content" ref="content">
      <slot />
    </div>
    <div class="bracket right" />
  </div>
</template>

<script>
import { TimelineMax } from "gsap";
export default {
  props: {
    time: { type: Number, default: 3 }
  },
  mounted() {
    let tl = new TimelineMax({ delay: 0.3 });
    let brackets = this.$refs.brackets;
    let content = this.$refs.content;
    let width = content.offsetWidth + 1;

    tl.set(content, { width: width });

    tl.set(brackets, {
      width: 0,
      paddingLeft: 0,
      paddingRight: 0
    });

    tl.to(brackets, this.time, {
      width: width,
      opacity: 1,
      paddingLeft: "4vw",
      paddingRight: "4vw"
    });

    tl.set(content, { clearProps: "all" });
    tl.set(brackets, { width: "" });
  }
};
</script>

<style lang="css" scoped>

.brackets{
  box-sizing: content-box;
  position: relative;
  overflow: hidden;
  max-width: 90vw;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4vw;
  opacity: 0

}

.brackets .content{
  text-align: center;
  display: inline-block;
  flex: 0 0 auto;
}

.bracket{
  border: .8vw solid rgba(255,255,255,.3);
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
