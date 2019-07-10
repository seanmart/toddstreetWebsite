<template lang="html">
  <div id="home">
    <div id="intro" class="inset">
      <intro :title="text.intro.title" :body="text.intro.body" />
    </div>
    <div id="offers" class="inset">
      <intro :title="text.offers.title" />
      <offers :content="offers" />
    </div>
    <div id="projects">
      <projects :content="projects" />
    </div>
    <div id="staff" class="inset">
      <intro :title="text.staff.title" />
    </div>
    <div id="care" class="inset"></div>
    <div id="clients" class="inset"></div>
  </div>
</template>

<script>
import text from "@/content/text/about";
import intro from "@/components/global/intro";
import offers from "@/components/home/offers";
import projects from "@/components/home/projects";
export default {
  components: { intro, offers, projects },
  data() {
    return {
      nav: {
        label: "about",
        path: "/",
        nav: 1
      },
      text: text,
      offer: 0
    };
  },
  computed: {
    offers() {
      return this.$store.state.offers;
    },
    projects() {
      let po = this.$store.getters.projectsOverview;
      return po.map(i => {
        return {
          image: i.cover,
          text: { title: i.header, category: i.category },
          link: "/projects/" + i.permalink
        };
      });
    }
  }
};
</script>
<style lang="css">
#intro{
  color: black;
  background: white
}
</style>
