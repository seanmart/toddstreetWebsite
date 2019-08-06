<template lang="html">
  <div id="articles">
    <intro :props="intro" />
  </div>
</template>

<script>
import data from "@/content/data/articles";
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
#articles{
  min-height: 200vh;
}
</style>
