<template lang="html">
  <div id="work-overview" class="inset" v-scroll="{ on, off, start, active }">
    <div class="max">
      <h1 class="title" :class="{ fixed }">Our Work</h1>
      <div class="work-items">
        <div
          class="work-item"
          v-for="(item, i) in work"
          :key="i"
          :style="{ backgroundImage: `url(${item.cover})` }"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      start: 20,
      fixed: false
    };
  },
  computed: {
    work() {
      return this.$store.getters.projectsOverview;
    }
  },
  methods: {
    on() {
      document.getElementsByTagName("html")[0].classList.add("care-theme");
    },
    off() {
      document.getElementsByTagName("html")[0].classList.remove("care-theme");
    },
    active({ rect }) {
      this.fixed = rect.top <= 0;
    }
  }
};
</script>

<style lang="css">
#work-overview{
  padding-top: 0px;
  padding-bottom: 0px;
  position: relative;
}

#work-overview h1{
  padding-top: 50px;
  position: absolute;
  top: 0px;
}

#work-overview .fixed{
  position: fixed;
}

#work-overview .work-items{
  padding-top: 50%;
  padding-left: 30%;
}

#work-overview .work-item{
  width: 100%;
  padding-top: 80%;
  margin: 20px 0px;
  background-size: cover;
}

.care-theme {
  background: #f3f3ee;
  color: black;
  fill: black;
  border-color: black;
}

@media screen and (max-width: 700px) {

  #work-overview .work-items{
    padding-left: 0px;
  }

  #work-overview .work-item{
    padding-top: 100%;
  }
}
</style>
