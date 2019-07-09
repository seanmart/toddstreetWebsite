<template lang="html">
  <div id="home">
    <div class="intro inset">
      <description :title="content.intro.title" :text="content.intro.text" />
    </div>
    <div class="offers inset">
      <description :title="content.offers.title" :text="content.offers.text" />
      <offers :lists="offers" />
    </div>
    <projects :projects="projects" />
    <div class="employees inset"></div>
  </div>
</template>

<script>
import content from "@/content/text/about";
import description from "@/components/description";
import projects from "@/components/projects";
import offers from "@/components/offers";
export default {
  components: { description, offers, projects },
  data() {
    return {
      nav: {
        label: "about",
        path: "/",
        nav: 1
      },
      content: content
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
          image: i["cover-image"],
          text: { title: i["header"] }
        };
      });
    }
  }
};
</script>

<style lang="css">

#home .intro{
  background: white;
  color: black;
  display: flex;
  justify-content: center;
  align-items: center;
}

#home .intro p{
  color: #555
}
</style>
