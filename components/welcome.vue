<template lang="html">
  <div id="welcome" :class="{ hide }">
    <div class="content" ref="content">
      <brackets v-if="triggerBrackets" :time="2">
        <h1>{{ content.text }}</h1>
      </brackets>
    </div>
  </div>
</template>

<script>
import brackets from "./brackets";
import content from "@/content/text/welcome";
export default {
  components: { brackets },
  data() {
    return {
      hide: false,
      triggerBrackets: false,
      content: content
    };
  },
  watch: {
    $route() {
      this.hide = true;
    }
  },
  mounted() {
    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )
    ) {
      this.$refs.content.style.height =
        window.outerHeight - (window.outerHeight - window.innerHeight) + "px";
    }

    setTimeout(() => (this.triggerBrackets = true), 500);
  }
};
</script>

<style lang="css" scoped>
#welcome{
  border-bottom: 1px solid #333;
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

#welcome h1{
  font-size: 4vw;
  font-weight: 900;
  flex: 0 0 auto;
}

@media screen and (max-width: 750px){
  #welcome h1{
    font-size: 30px;
  }
}
</style>
