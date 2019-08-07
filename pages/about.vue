<template lang="html">
  <div id="about">
    <intro :props="intro" />
    <div class="white-section"/>
  </div>
</template>

<script>
import data from "@/content/data/about";
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
#about{
  min-height: 200vh;
}

.white-section{
  height: 100vh;
  background: white;
}
</style>
