<template lang="html">
  <div
    id="intro"
    class="inset"
    ref="intro"
    v-scroll="{ name, triggers, during }"
  >
    <div class="max content">
      <div class="text" ref="text">
        <p ref="hi">Hi, We're toddstreet.</p>
        <p>
          We're a Marketing Communications Agency Located in New York City. We
          Offer a wide range of Communications, Event, and Training Solutions.
          We aim to Engage Minds.
        </p>
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
      name: "intro-theme",
      triggers: { start: 100, end: 20 },
      top: 0
    };
  },
  mounted() {},
  methods: {
    during({ percent, position }) {
      let dist = position.height - this.$refs.text.clientHeight - 100;
      this.$refs.text.style.transform = `translateY(${dist * percent}px)`;
    }
  }
};
</script>

<style lang="css">

.intro-theme{
  background: #551a8b;
  color: white;
  fill: white;
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

#intro p{
  font-size: 40px;
  font-weight: 900;
  margin-bottom: 20px;
}

#intro .viewfinder{
  opacity: .03
}

@media screen and (max-width:800px){
  #intro p{
    font-size: 30px;
  }
}

@media screen and (max-width:600px){
  #intro p{
    font-size: 28px;
  }
}
</style>
