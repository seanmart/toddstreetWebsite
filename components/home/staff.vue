<template lang="html">
  <div class="max">
    <tabs :labels="departments" />
  </div>
</template>

<script>
import tabs from "@/components/global/tabs";
export default {
  components: { tabs },
  props: {
    content: Object
  },
  computed: {
    departments() {
      return Object.keys(this.content);
    }
  }
};
</script>

<style lang="css" scoped></style>
