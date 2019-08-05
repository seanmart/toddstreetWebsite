<template lang="html">
  <div id="projects">
    <intro :title="[nav.label]" image="/uploads/plastics_cover.jpg" />
  </div>
</template>

<script>
import intro from "@/components/intro";
export default {
  components: { intro },
  data() {
    return {
      nav: {
        label: "Projects",
        position: 1
      }
    };
  }
};
</script>

<style lang="css" scoped></style>
