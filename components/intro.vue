<template lang="html">
  <div id="intro">
    <div class="content-container inset">
      <div class="content max">
        <div class="span">
          <h1 v-for="(item, i) in title" :key="i" ref="title">
            {{ item }}
          </h1>
        </div>
        <div class="split">
          <div class="line" ref="line" />
          <p ref="desc">{{ description }}</p>
        </div>
      </div>
    </div>
    <div ref="bg" v-if="image">
      <background :image="image" id="intro-background" />
    </div>
  </div>
</template>

<script>
import background from "@/components/background";
import { TweenMax, TimelineMax } from "gsap";
export default {
  components: { background },
  props: { props: Object },
  mounted() {
    this.init();
    setTimeout(() => this.animate(),this.delay)
  },
  data() {
    return {
      delay: 700
    };
  },
  computed: {
    title() {
      if (!this.props.title) return [];
      if (typeof this.props.title === "string") return [this.props.title];
      return this.props.title;
    },
    description() {
      if (!this.props.description) return "";
      return this.props.description;
    },
    image() {
      if (!this.props.image) return null;
      if (process.browser)(new Image()).src = this.props.image
      return this.props.image;
    }
  },
  methods: {
    init() {
      TweenMax.set(this.$refs.title, { xPercent: -10, opacity: 0 });
      TweenMax.set(this.$refs.line, { scaleX: 0 });
      TweenMax.set(this.$refs.desc, { yPercent: 25, opacity: 0 });
      this.image &&
        TweenMax.fromTo(this.$refs.bg, 1, { scale: 1.2 }, { scale: 1 });
    },
    animate() {
        let tl = new TimelineMax();
        tl.staggerTo(
          this.$refs.title,
          0.5,
          { xPercent: 0, opacity: 1 },
          0.15,
          0
        );
        tl.to(this.$refs.line, 0.5, { scaleX: 1, ease: Power1.easeOut }, 0.2);
        tl.to(this.$refs.desc, 0.7, { yPercent: 0, opacity: 1 }, 0.1);
    }
  }
};
</script>

<style lang="css">
#intro{
  overflow: hidden;
  color: white;
  position: relative;
}

#intro,
#intro-background{
  height: 100vh;
  width: 100%;
}

#intro-background{
  opacity: .25;
}

#intro .content-container{
  position: absolute;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  z-index: 1;
}

#intro .content{
  width: 100%;
  max-width: 1000px;
}

#intro .span{
  margin-bottom: 50px;
}

.mobile #intro .text{
  margin: 0px;
}

#intro h1{
  line-height: 93%;
  font-size: 8vw;
  font-weight: 300;
  letter-spacing: -2px;
  white-space: nowrap;
}

.mobile #intro h1{
  line-height: 100%;
  letter-spacing: -1px
}

#intro .split{
  display: flex;
  flex-direction: row;
}

.mobile #intro .split{
  display: block;
}

#intro .line{
  flex: 0 1 50%;
  height: 2px;
  background: white;
  transform-origin: left;
}

.mobile #intro .line{
  margin: 40px 0px;
  max-width: 20%;
}

#intro  p{
  padding-left: 50px;
  flex: 0 0 auto;
  max-width: 500px;
  font-size: 16px;
  line-height: 26px;
  margin-top: -7px;
}

.mobile #intro p{
  font-size: 14px;
  line-height: 24px;
  padding: 0px;
}

@media screen and (min-width: 1300px){
  #intro h1{
    font-size: 104px;
  }
}

@media screen and (max-width: 600px){
  #intro h1{
    font-size: 10vw;
    font-weight: 400;
  }
}
</style>
