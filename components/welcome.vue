<template lang="html">
  <div id="welcome" :class="{ hide }">
    <div class="content" ref="content">
      <brackets animated>
        <h1>{{ content.text }}</h1>
      </brackets>
    </div>
  </div>
</template>

<script>
import brackets from "./brackets";
import content from "@/content/welcome";
export default {
  components: { brackets },
  data() {
    return {
      hide: false,
      content: content
    };
  },
  watch: {
    $route() {
      this.hide = true;
    }
  }
};
</script>

<style lang="css" scoped>
#welcome{
  border-bottom: 1px solid #333;
  height:100vh;
}

#welcome.hide{
  display: none;
}

.content{
  height:100vh;
  width: 100vw;
  background: black;
  display: flex;
  justify-content: center;
  align-items: center;
}

h1{
  font-size: 4vw;
  font-weight: 900;
  flex: 0 0 auto;
}
</style>
