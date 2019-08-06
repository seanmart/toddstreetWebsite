<template lang="html">
  <div id="home">
    <intro :props="intro" />
  </div>
</template>

<script>
import data from "@/content/data/home";
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

#home{
  min-height: 200vh;
}
</style>
