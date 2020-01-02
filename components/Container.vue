<template>
  <div class="container" :class="classes" :style="styles">
    <slot />
  </div>
</template>
<script>
export default {
  props: {
    gallery: Boolean,
    cards: Boolean,
    bar: Boolean,
    menu: Boolean,
    image: String,
    black: Boolean,
    center: Boolean,
    fullwidth: Boolean,
    fullheight: Boolean
  },
  computed: {
    classes() {
      return {
        gallery: this.gallery,
        cards: this.cards,
        fullwidth: this.fullwidth,
        fullheight: this.fullheight,
        bar: this.bar,
        image: this.image,
        black: this.black,
        menu: this.menu,
        center: this.center
      }
    },
    styles() {
      let styles = {}
      if (this.image) styles.backgroundImage = `url(${this.image})`
      return styles
    }
  }
}
</script>
<style lang="css" scoped>

.container{
  padding: 50px;
}

.container.center{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.menu,
.gallery,
.bar {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.container.bar {
  flex-wrap: nowrap;
  align-items: center;
  padding-bottom: 0px;
  padding-top: 0px;
}

.cards {
  padding: 40px;
  align-items: stretch;
}

.container.fullwidth{
  padding-left: 0px;
  padding-right: 0px;
}

.container.fullheight{
  padding-top: 0px;
  padding-bottom: 0px;
}

.black{
  background: black
}

@media screen and (max-width:750px){
  .container{
    padding: 7vw
  }
}
</style>
