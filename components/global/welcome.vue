<template lang="html">
  <div class="welcome" :class="{ hide }" ref="welcome">
    <div class="frame" ref="frame">
      <h1 ref="title">{{ title }}</h1>
    </div>
  </div>
</template>

<script>
import { TimelineMax } from "gsap";
import text from "@/content/data/welcome";
import welcomeVideo from "@/components/global/video";
export default {
  components: { welcomeVideo },
  data() {
    return {
      hide: false,
      triggerBrackets: false,
      title: text.title
    };
  },
  watch: {
    $route() {
      this.hide = true;
    }
  },
  mounted() {
    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )
    ) {
      this.$refs.welcome.style.height =
        window.outerHeight - (window.outerHeight - window.innerHeight) + "px";
    }

    this.animation();
  },
  methods: {
    animation() {
      let tl = new TimelineMax({ delay: 0.5 });
      let frame = this.$refs.frame;
      let title = this.$refs.title;

      tl.set(frame, {
        y: 200,
        width: 0
      });

      tl.to(frame, 1, {
        width: title.clientWidth,
        padding: 40,
        opacity: 1,
        ease: Expo.easeOut,
        y: 0
      });

      tl.set(frame, { width: "" });
    }
  }
};
</script>

<style lang="css" scoped>
.welcome{
  border-bottom: 1px solid #333;
  height:calc(100vh + 1px);
  width: 100%;
  background: black;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.welcome-video{
  position: absolute;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
}

.welcome.hide{
  display: none;
}

.frame{
  opacity: 0;
  border: 1px solid white;
  padding: 40px 0px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: content-box;
}

.welcome h1{
  font-size: 40px;
  font-weight: 900;
  white-space: nowrap;
}

@media screen and (max-width: 600px){
  .welcome h1{
    font-size: 30px
  }
}

@media screen and (max-width: 450px){
  .welcome h1{
    font-size: 23px
  }
}
</style>
