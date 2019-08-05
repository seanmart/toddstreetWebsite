<template lang="html">
  <div id="process">
    <intro :title="[nav.label]" image="/uploads/art_frieze_2.jpg" />
  </div>
</template>

<script>
import intro from "@/components/intro";
export default {
  components: { intro },
  data() {
    return {
      nav: {
        label: "Articles",
        position: 4
      }
    };
  }
};
</script>

<style lang="css">
#articles{
  min-height: 200vh;
}
</style>
