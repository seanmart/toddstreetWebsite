<template>
  <h1 v-if="title" class="text" :class="classes"><slot /></h1>
  <h3 v-else-if="subtitle" class="text" :class="classes"><slot /></h3>
  <p v-else="body" class="text" :class="classes"><slot /></p>
</template>

<script>
export default {
  props: {
    title: Boolean,
    subtitle: Boolean,
    body: Boolean,
    big: Boolean,
    medium: Boolean,
    small: Boolean,
    black: Boolean,
    white: Boolean,
    grey: Boolean,
    thick: Boolean,
    thin: Boolean,
    link: Boolean,
    center: Boolean,
    width: Boolean
  },
  computed: {
    classes() {
      return {
        big: this.big,
        medium: this.medium,
        small: this.small,
        thick: this.thick,
        thin: this.thin,
        black: this.black,
        white: this.white,
        grey: this.grey,
        link: this.link,
        center: this.center,
        width: this.width
      }
    }
  }
}
</script>

<style lang="css">

.text.width{
    display: block;
    max-width: 1200px;
    margin: auto;
}

.text.center{
  text-align: center;
}

.text.white{
  color: white
}

.text.black{
  color: black
}

.text.grey{
  color: #999
}

h1, h3, p{
  font-weight: 500;
}

p{
  font-family: "Roboto Slab", serif;
}

.text.thick{
  font-weight: 900;
}

.text.thin{
  font-weight: 400;
}

.text.link{
  padding: 10px 15px;
  color: white;
  background: black;
  text-transform: uppercase;
  letter-spacing: .1em;
  margin: 10px 0px;
}

h1.big{
  font-size: calc(2em + 1vw);
  margin-bottom: 50px;
}
h1.medium{
  font-size: calc(1.5em + .5vw);
  margin: 5px 0px 10px;
}
h1.small{
  font-size: calc(.8em + .5vw);
  margin: 10px 0px;
}
h3.big{
  font-size: calc(2em + .5vw);
}
h3.medium{
  font-size: calc(1em + .5vw);
}
h3.small{
  font-size: calc(.5em + .5vw);
}
p.big{
  font-size: calc(1em + .8vw);
  margin: 10px 0px;
}
p.medium{
  font-size: calc(1em + .5vw);
}
p.small{
  font-size: calc(.7em + .3vw);
}

p.small.link{
  font-size: calc(.5em + .2vw);
}
</style>
