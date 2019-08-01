<template lang="html">
  <div id="about">
    <intro title="About" image="/uploads/hasselblad_cover.jpg" :delay="500" />
  </div>
</template>

<script>
import intro from "@/components/intro";
export default {
  components: { intro },
  data() {
    return {
      nav: {
        label: "About",
        position: 2
      }
    };
  }
};
</script>

<style lang="css">
#about{
  min-height: 200vh;
}
</style>
