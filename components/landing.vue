<template lang="html">
  <div id="landing" class="inset">
    <div class="max">
      <logo class="logo" />
    </div>
  </div>
</template>

<script>
import logo from "@/components/svg/Logo";
export default {
  components: { logo }
};
</script>

<style lang="css">
#landing{
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.logo{
  width: 50vh;
  fill: inherit
}
</style>
