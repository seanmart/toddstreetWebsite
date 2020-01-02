<template>
  <div class="box" :class="classes" :style="styles" @click="click">
    <div class="card-content" v-if="card"><slot /></div>
    <div class="ratio-content" v-else-if="ratio"><slot /></div>
    <slot v-else />
  </div>
</template>
<script>
export default {
  props: {
    card: Boolean,
    ratio: Boolean,
    textbox: Boolean,
    col6: Boolean,
    col5: Boolean,
    col4: Boolean,
    col3: Boolean,
    col2: Boolean,
    col1: Boolean,
    image: String,
    to: String,
    grow: Boolean
  },
  computed: {
    classes() {
      return {
        col6: this.col6,
        col5: this.col5,
        col4: this.col4,
        col3: this.col3,
        col2: this.col2,
        col1: this.col1,
        textbox: this.textbox,
        image: this.image ? true : false,
        card: this.card,
        ratio: this.ratio,
        grow: this.grow
      }
    },
    styles() {
      let styles = {}
      if (this.image) styles.backgroundImage = `url(${this.image})`
      return styles
    }
  },
  methods: {
    click() {
      if (this.to) this.$router.push(this.to)
    }
  }
}
</script>
<style lang="css" scoped>
.card{
  padding: 10px;
}

.card-content {
  border-radius: 3px;
  overflow: hidden;
  background: white;
  min-height: 100%;
  display: flex;
  flex-direction:column;
  box-shadow: 0px 3px 3px -2px rgba(0,0,0,.2)
}

.to{
  cursor: pointer;
}

.col6{
  flex-basis: 16.666%;
}

.col5 {
  flex-basis: 20%;
}

.col4 {
  flex-basis: 25%;
}

.col3 {
  flex-basis: 33.333%;
}

.col2 {
  flex-basis: 50%;
}

.col1 {
  flex-basis: 100%;
}

.image {
  width: 100%;
  background-size: cover;
  background-position: top center;
}

.card .textbox{
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 25px;
}

.card .textbox .text{
  flex: 0 0 auto;
}

.card .textbox .link{
  margin-top: auto;
}

.ratio{
  position: relative;
  padding-top: 56.25%
}

.ratio.col2{
  padding-top: calc(56.25%/2)
}

.ratio.col3{
  padding-top: calc(56.25%/3)
}

.ratio.col4{
  padding-top: calc(56.25%/4)
}

.ratio.col5{
  padding-top: calc(56.25%/5)
}

.ratio-content{
  position: absolute;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
}

.grow{
  flex-grow: 1
}

@media screen and (max-width: 1000px){
  .col6{
    flex-basis: 25%
  }
}

@media screen and (max-width: 850px) {
  .col6,
  .col5 {
    flex-basis: 33.333%;
  }

  .ratio.col5{
    padding-top: calc(56.25%/3)
  }

  .col4 {
    flex-basis: 50%;
  }

  .ratio.col4{
    padding-top: calc(56.25%/2)
  }

  .col3,
  .col2 {
    flex-basis: 100%;
  }

  .ratio.col3,
  .ratio.col2{
    padding-top: 56.25%
  }

}

@media screen and (max-width: 850px) and (min-width: 601px){
  .card-content{
    flex-direction: row;
  }

  .card .ratio{
    flex: 0 0 35%;
    padding-top: 30%
  }
}


@media screen and (max-width:750px){
  .card{
    padding-left: 0px;
    padding-right: 0px;
  }
}

@media screen and (max-width: 600px) {
  .col3,
  .col4 {
    flex-basis: 100%;
  }

  .ratio.col5,
  .ratio.col4,
  .ratio.col3,
  .ratio.col2,
  .ratio.col1{
    padding-top: 100%
  }

  .col6,
  .col5 {
    flex-basis: 50%;
  }


}
</style>
