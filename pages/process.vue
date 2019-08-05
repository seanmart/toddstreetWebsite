<template lang="html">
  <div id="process">
    <intro :title="[nav.label]" image="/uploads/DealerTrack_Cox-1836.jpg" />
  </div>
</template>

<script>
import intro from "@/components/intro";
export default {
  components: { intro },
  data() {
    return {
      nav: {
        label: "Process",
        position: 3
      }
    };
  }
};
</script>

<style lang="css">
#process{
  min-height: 200vh;
}
</style>
