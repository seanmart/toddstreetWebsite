<template lang="html">
  <section id="home">
    <div class="landing" :style="{ height: windowHeight }">
      <div
        class="cityscape"
        ref="bg"
        :style="[img('bg'), { height: windowHeight }]"
      />
      <div class="viewfinder is-max-width" :style="img('vf')" />
    </div>

    <div class="is-white shadow is-max-width" ref="content" id="content">
      <Intro>
        <h1 class="is-padding-bottom title">
          <i class="text-red">What</i> We Believe
        </h1>
        <p class="big grey">
          True engagement is what transforms an audience into something bigger,
          motivating them to think, feel and act. The catalyst to accomplish
          enduring results.
        </p>
        <p class="big grey">
          As a Marketing Communications Agency, we create compelling content and
          design innovative solutions to engage audiences authentically across
          live and virtual platforms.
        </p>
      </Intro>

      <Projects :data="projects">
        <nuxt-link to="/projects" class="view-projects is-black text-white">
          <p class="big">View All Work</p>
        </nuxt-link>
      </Projects>

      <h1 class="is-padding-top title"><i class="text-blue">Who</i> We Are</h1>
      <Staff :data="[leaders, employees]" />
    </div>

    <div class="is-padding">
      <div class="is-max-width">
        <h1 class=" title is-max-width">
          <i class="text-yellow">How</i> We Care
        </h1>
        <p class="big is-padding-top grey ">
          Our unified commitment to apply our talents to benefit charitable
          organizations for social good broadens our experience, insight,
          creativity and awareness with the work we do for our clients. We
          believe we’re all better for it.
        </p>
        <Cares :data="cares" class="is-padding-top" />
      </div>
    </div>

    <div class="is-white shadow is-max-width">
      <h1 class="is-padding-top title">
        <i class="text-red">Who</i> We Work With
      </h1>
      <Clients class="is-padding" />
    </div>

    <div class="is-padding">
      <div class="is-max-width">
        <h1 class="title"><i class="text-blue">Our</i> Stats</h1>
        <Stats class="is-padding-top" />
      </div>
    </div>
  </section>
</template>

<script>
import Grid from "@/components/Grid";
import Projects from "@/components/Projects";
import Cares from "@/components/Cares";
import Staff from "@/components/Staff";
import Clients from "@/components/Clients";
import Stats from "@/components/Stats";
import Link from "@/components/Button";
import Intro from "@/components/Intro";
export default {
  components: {
    Grid,
    Projects,
    Cares,
    Staff,
    Clients,
    Stats,
    Link,
    Intro
  },
  mounted() {
    if (
      typeof window.orientation !== "undefined" ||
      navigator.userAgent.indexOf("IEMobile") !== -1
    ) {
      this.windowHeight = `${window.innerHeight}px`;
    }
    window.addEventListener("scroll", this.handleScroll);
    this.handleScroll();
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  data() {
    return {
      windowHeight: "100vh",
      projects: this.$store.getters.projectsOverview,
      cares: this.$store.getters.caresOverview,
      employees: this.$store.getters.staffWorkers,
      leaders: this.$store.getters.staffLeaders
    };
  },
  methods: {
    handleScroll() {
      const bg = this.$refs.bg;
      const ct = this.$refs.content.getBoundingClientRect().top;
      const wh = window.innerHeight;
      let o = ct / wh;
      bg.style.opacity = o > 0 ? o : 0;
    },
    img(id) {
      switch (id) {
        case "bg":
          return { backgroundImage: "url(/uploads/cityscape.jpg)" };
        case "vf":
          return { backgroundImage: "url(/uploads/viewfinder_website.png)" };
      }
    }
  }
};
</script>

<style lang="css" scoped>

.landing{
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}

.cityscape{
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  background-size: cover;
  background-position: bottom center;
  z-index: -1;
}

.viewfinder{
  flex: 0 0 auto;
  height: 70vh;
  width: 60vw;
  max-width: 700px;
  margin: 0px auto;
  background-size: contain;
  background-position: bottom center;
  background-repeat: no-repeat;
}


.view-projects{
  flex: 1 1 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100px;
}

.view-projects p{
  margin: 0px;
}
</style>
