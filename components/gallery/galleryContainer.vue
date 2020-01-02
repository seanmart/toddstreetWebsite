<template lang="html">
  <div class="gallery bg-0" ref="gallery">
    <slot
    :index="index"
    :dir="direction"
    :set="(i)=>{nextIndex(i)}"
    ></slot>
  </div>
</template>
<script>
export default {
  props: {
    timer: { type: Boolean, default: true },
    swipe: { type: Boolean, default: true },
    duration: { type: Number, default: 6 },
    count: { type: Number, default: 0 }
  },
  data() {
    return {
      timeout: null,
      direction: 'right',
      prevent: false,
      index: 0
    }
  },
  methods: {
    nextIndex(i) {
      if (this.prevent) return
      this.prevent = true

      this.direction = i >= this.index ? 'right' : 'left'
      this.index = i >= this.count ? 0 : i < 0 ? this.count - 1 : i
      clearTimeout(this.timeout)
      this.timeout = setTimeout(
        () => this.nextIndex(this.index + 1),
        this.duration * 1000
      )

      setTimeout(() => (this.prevent = false), 500)
    },
    startTouch(e) {
      this.initialX = e.changedTouches[0].clientX
      this.initialY = e.changedTouches[0].clientY
    },
    endTouch(e) {
      if (this.initialX === null || this.initialY === null) return
      let diffX = this.initialX - e.changedTouches[0].clientX
      let diffY = this.initialY - e.changedTouches[0].clientY

      if (Math.abs(diffX) > Math.abs(diffY)) {
        this.nextIndex(diffX > 0 ? this.index + 1 : this.index - 1)
      }
    }
  },
  created() {
    this.timer && this.nextIndex(this.index)
  },
  mounted() {
    if (this.swipe) {
      this.$refs.gallery.addEventListener('touchstart', this.startTouch)
      this.$refs.gallery.addEventListener('touchend', this.endTouch)
    }
  },
  beforeDestroy() {
    if (this.swipe) {
      this.$refs.gallery.removeEventListener('touchstart', this.startTouch)
      this.$refs.gallery.removeEventListener('touchend', this.endTouch)
    }
  }
}
</script>
<style lang="css">
.gallery{
  min-height: 56.25vw;
  overflow: hidden;
  position: relative;
  display: flex;
  flex-direction: column;
  animation: slide-on-up 1s
}

</style>
