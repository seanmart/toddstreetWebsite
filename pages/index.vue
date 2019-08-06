<template lang="html">
  <div id="home">
    <intro :title="title" image="/uploads/bms-3.jpg" />
  </div>
</template>

<script>
import intro from "@/components/intro";
export default {
  components: { intro },
  data() {
    return {
      title: ["Events +", "Communications +", "Training"]
    };
  }
};
</script>

<style lang="css">

#home{
  min-height: 200vh;
}
</style>
