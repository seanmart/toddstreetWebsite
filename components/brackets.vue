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
    trigger: Boolean,
    time: { type: Number, default: 3 }
  },
  watch: {
    trigger() {
      this.trigger ? this.on() : this.off();
    }
  },
  data() {
    return {
      tl: new TimelineMax()
    };
  },
  mounted() {
    if (this.trigger) this.on();
  },
  methods: {
    on() {
      let brackets = this.$refs.brackets;
      let content = this.$refs.content;
      let width = content.offsetWidth + 1;

      this.tl.set(content, {
        width: width
      });

      this.tl.set(brackets, {
        width: 0,
        paddingLeft: 0,
        paddingRight: 0
      });

      this.tl.to(brackets, this.time, {
        width: width,
        opacity: 1,
        paddingLeft: "4vw",
        paddingRight: "4vw"
      });

      this.tl.set(content, { clearProps: "all" });
    },
    off() {
      let brackets = this.$refs.brackets;

      this.tl.set(brackets, {
        clearProps: "all"
      });
    }
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
  border: .6vw solid rgba(255,255,255,.3);
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
