<template lang="html">
  <div id="home">
    <div class="intro inset">
      <description :title="content.intro.title" :text="content.intro.text" />
    </div>

    <div class="offers inset">
      <div class="max">
        <description
          :title="content.offers.title"
          :text="content.offers.text"
        />

        <tabs
          :list="content.offers.lists"
          @clicked="activeOffer = $event.index"
        />

        <datatable :data="content.offers.lists[activeOffer].items" vertical>
          <template v-slot:default="x">
            <h1>{{ x.props }}</h1>
          </template>
        </datatable>
      </div>
    </div>
  </div>
</template>

<script>
import content from "@/content/about";
import description from "@/components/description";
import tabs from "@/components/tabs";
import datatable from "@/components/table";
export default {
  components: { description, tabs, datatable },
  data() {
    return {
      nav: {
        label: "about",
        path: "/",
        nav: 1
      },
      content: content,
      activeOffer: 0
    };
  }
};
</script>

<style lang="css" scoped>

#home .intro{
  background: white;
  color: black;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.offers h1{
  padding: 5px;
}
</style>
