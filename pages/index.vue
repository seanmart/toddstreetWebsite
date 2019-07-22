<template lang="html">
  <div id="home">
    <div id="intro" class="inset">
      <intro :text="data.intro" />
    </div>

    <div id="projects">
      <projects :content="projects" />
    </div>

    <div id="staff" class="inset">
      <intro :text="data.staff" />
      <staff :content="staff" />
    </div>

    <div id="cares" class="inset">
      <intro :text="data.care" />
      <cares :content="cares" class="space" />
      <btn big caps black class="center">view more</btn>
    </div>

    <div id="clients" class="inset">
      <intro :text="data.clients" />
      <clients :content="clients" />
    </div>
  </div>
</template>

<script>
import data from "@/content/data/about";
import intro from "@/components/global/intro";
import projects from "@/components/home/projects";
import staff from "@/components/home/staff";
import cares from "@/components/global/cares";
import btn from "@/components/global/button";
import viewfinder from "@/components/svg/Viewfinder";
import clients from "@/components/home/clients";
export default {
  components: {
    intro,
    projects,
    staff,
    cares,
    clients,
    btn,
    viewfinder
  },
  data() {
    return {
      nav: {
        label: "about",
        path: "/",
        nav: 1
      },
      data: data,
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
      return this.$store.getters.allStaff;
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
    },
    clients() {
      let data = this.$store.getters.clients;
      let staff = {};
      this.data.clients.categories.forEach(i => (staff[i.label] = data[i.id]));
      return staff;
    }
  }
};
</script>
<style lang="css">


#intro{
  color: black;
  background: white;
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
