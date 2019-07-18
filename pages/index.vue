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

    <div id="cares" class="inset">
      <intro :text="text.care" />
      <cares :content="cares" class="space" />
      <btn big caps black class="center">view more</btn>
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
import cares from "@/components/global/cares";
import btn from "@/components/global/button";
export default {
  components: { intro, offers, projects, staff, cares, btn },
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
    },
    cares() {
      return this.$store.getters.caresOverview.map(care => {
        return {
          image: care.cover,
          text: {
            title: care.title,
            description:
              care.body
                .split(" ")
                .slice(0, 20)
                .join(" ") + "..."
          }
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

#cares{
  color: black;
  background: white;
}

.center{
  display: block;
  margin: 0px auto;
}
</style>
