<template lang="html">
  <div id="home">
    <div id="intro" class="inset">
      <intro :text="text.intro" />
    </div>

    <div id="offers" class="inset">
      <intro :text="text.offers" />
      <offers :content="offers" />
    </div>

    <div id="projects">
      <projects :content="projects" />
    </div>

    <div id="staff" class="inset">
      <intro :text="text.staff" />
      <staff :content="staff" />
    </div>

    <div id="care" class="inset">
      <intro :text="text.care" />
    </div>

    <div id="clients" class="inset"></div>
  </div>
</template>

<script>
import text from "@/content/text/about";
import intro from "@/components/global/intro";
import offers from "@/components/home/offers";
import projects from "@/components/home/projects";
import staff from "@/components/home/staff";
export default {
  components: { intro, offers, projects, staff },
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
    },
    staff() {
      return this.$store.getters.groupedStaff;
    }
  }
};
</script>
<style lang="css">
#intro,#care{
  color: black;
  background: white
}
</style>
