<template lang="html">
  <div class="menu is-padding" :class="{ active }">
    <div class="column">
      <h3>Links</h3>
      <nuxt-link
        v-for="(l, i) in nav"
        :key="i"
        :to="l.route"
        @click.native="$emit('clicked')"
      >
        {{ l.label }}
      </nuxt-link>
    </div>
    <div class="column">
      <h3>Information</h3>
      <span>{{ info.company }}</span>
      <span>{{ info.address.street }}</span>
      <span
        >{{ info.address.city }}, {{ info.address.state }},
        {{ info.address.zip }}</span
      >
    </div>
  </div>
</template>

<script>
export default {
  props: {
    active: Boolean
  },
  computed: {
    nav() {
      return this.$store.state.nav;
    },
    info() {
      return this.$store.state.information;
    }
  }
};
</script>

<style lang="css" scoped>
.menu{
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: stretch;
  flex-wrap: wrap;
  height: 100%;
  width: 100%;
}

.column{
  flex: 0 0 33.333%;
  opacity: 0;
  transition: opacity .5s;
  transition-delay: 0s
}

.active .column{
  transition-delay: .4s;
  opacity: 1
}

.column h3{
  color: #555;
  padding-bottom: 20px;
  font-size: calc(.8em + .5vw)
}

.column span::after{
  content:"\A";
  white-space: pre;
}

.column a{
  display: table;
  font-size: calc(1em + 1.2vw);
  margin-bottom: 10px;
  font-weight: normal;
  text-decoration: none;
  color: white;
  border-bottom: 1px solid rgba(0,0,0,0)
}

.column a::after{
  content: "\A";
  white-space: pre;
}

.column a:hover{
  border-bottom: 1px solid #555;
}

@media screen and (max-width: 700px){
  .column{
    flex: 1 0 100%;
    text-align: center;
  }

  .column a{
    width: 100%;
  }
}
</style>
