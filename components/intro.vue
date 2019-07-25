<template lang="html">
  <div
    id="intro"
    class="inset"
    ref="intro"
    v-scroll="{ start, end, active, on, off }"
  >
    <div class="max content">
      <div class="text" ref="text">
        <h1 class="title">Hi, We're toddstreet.</h1>
        <h1 class="title">
          We're a Marketing Communications Agency Located in New York City. We
          Offer a wide range of Communications, Event, and Training Solutions.
          We aim to Engage Minds.
        </h1>
      </div>
      <viewfinder class="viewfinder" />
    </div>
  </div>
</template>

<script>
import { TimelineMax } from "gsap";
import viewfinder from "@/components/svg/Viewfinder";
export default {
  components: { viewfinder },
  data() {
    return {
      start: 100,
      end: 10
    };
  },
  mounted() {},
  methods: {
    active({ percent, rect }) {
      let dist = rect.height - this.$refs.text.offsetHeight - 100;
      this.$refs.text.style.transform = `translateY(${dist * percent}px)`;
    },
    on() {
      document.getElementsByTagName("html")[0].classList.add("intro-theme");
    },
    off() {
      document.getElementsByTagName("html")[0].classList.remove("intro-theme");
    }
  }
};
</script>

<style lang="css">

.intro-theme{
  background: #212327;
}

#intro{
  min-height: 100vh;
  padding-top: 0px;
  padding-bottom: 0px;

}

#intro .content{
  position: relative;
}

#intro .text{
  position: absolute;
  top: 0px;
  left: 0px;
}

#intro .viewfinder{
  opacity: .03
}
</style>
