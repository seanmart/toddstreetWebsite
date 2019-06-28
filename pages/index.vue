<template lang="html">
  <div id="home">
    <div class="intro inset">
      <description :title="content.intro.title" :text="content.intro.text" />
    </div>
    <div class="inset">
      <div class="">
        <description
          :title="content.offers.title"
          :text="content.offers.text"
        />
        <offers :lists="content.offers.lists" />
      </div>
    </div>
  </div>
</template>

<script>
import content from "@/content/about";
import description from "@/components/description";
import offers from "@/components/offers";
export default {
  components: { description, offers },
  data() {
    return {
      nav: {
        label: "about",
        path: "/",
        nav: 1
      },
      content: content
    };
  }
};
</script>

<style lang="css" scoped>

#home .intro{
  background: white;
  color: black;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
