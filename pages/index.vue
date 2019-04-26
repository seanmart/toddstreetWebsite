<template lang="html">
  <section>
    <div class="landing">
      <div class="cityscape" ref="bg" :style="img('bg')" />
      <div class="viewfinder" :style="img('vf')" />
    </div>
    <div class="content is-max-width" ref="content">
      <div class="intro is-padding">
        <h1 class="is-padding-bottom"><i class="red">What</i> We Believe</h1>
        <h5>
          True engagement is what transforms an audience into something bigger,
          motivating them to think, feel and act. The catalyst to accomplish
          enduring results.
        </h5>
        <h5>
          As a Marketing Communications Agency, we create compelling content and
          design innovative solutions to engage audiences authentically across
          live and virtual platforms.
        </h5>
      </div>
      <WorkOverview />
      <Staff />
      <CareOverview />
      <Clients />
      <Stats />
    </div>
  </section>
</template>

<script>
import Staff from "@/components/Staff";
import WorkOverview from "@/components/WorkOverview";
import CareOverview from "@/components/CareOverview";
import Clients from "@/components/Clients";
import Stats from "@/components/Stats";
export default {
  components: { Staff, WorkOverview, CareOverview, Clients, Stats },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
    this.handleScroll();
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
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
  height: 100vh;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}

.cityscape{
  position: fixed;
  top: 0px;
  left: 0px;
  bottom: 0px;
  right: 0px;
  background-size: cover;
  background-position: bottom center;
  z-index: -1;
}

.viewfinder{
  flex: 0 0 auto;
  height: 70%;
  width: 80vw;
  max-width: 700px;
  margin: 0px auto;
  background-size: contain;
  background-position: bottom center;
  background-repeat: no-repeat;
}
</style>
