<template lang="html">
  <div id="projects">
    <intro :props="intro" />
  </div>
</template>

<script>
import data from "@/content/data/projects";
import intro from "@/components/intro";
export default {
  components: { intro },
  computed: {
    intro() {
      return {
        title: data.intro.title || data.meta.name,
        image: data.intro.image || null,
        description: data.intro.description || null
      };
    }
  }
};
</script>

<style lang="css">
#projects{
  min-height: 200vh;
}
</style>
