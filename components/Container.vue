<template>
  <div
    class="container"
    :class="{
      top,
      bottom,
      left,
      right,
      sides,
      all,
      fullblack,
      fullwhite,
      cover,
      allplus,
      topplus,
      topnav,
      height
    }"
    :style="containerStyle"
  >
    <div
      class="content"
      :class="{
        flex,
        row,
        column,
        middle,
        center,
        tablet,
        mobile,
        black,
        white,
        start,
        startleft,
        endright,
        end
      }"
      :style="contentStyle"
    >
      <slot />
    </div>
  </div>
</template>
<script>
export default {
  props: {
    all: Boolean,
    sides: Boolean,
    top: Boolean,
    bottom: Boolean,
    left: Boolean,
    right: Boolean,
    flex: Boolean,
    row: Boolean,
    column: Boolean,
    middle: Boolean,
    center: Boolean,
    tablet: Boolean,
    mobile: Boolean,
    fullblack: Boolean,
    fullwhite: Boolean,
    black: Boolean,
    white: Boolean,
    cover: Boolean,
    start: Boolean,
    end: Boolean,
    startleft: Boolean,
    endright: Boolean,
    allplus: Boolean,
    topplus: Boolean,
    topnav: Boolean,
    image: String,
    height: Boolean,
    negative: Number
  },
  computed: {
    containerStyle() {
      let styles = {}
      if (this.negative) styles.margin = `-${this.negative}px`
      if (this.image) styles.backgroundImage = `url(${this.image})`
      return styles
    },
    contentStyle() {
      let styles = {}
      return styles
    }
  }
}
</script>
<style lang="css">
.container{
  width: 100%;
  background-size: cover;
  background-position: center bottom;
}

.container.height{
  height: 100%;
}

.container.cover{
  height: 100vh
}

.container.all,
.container.top{
  padding-top: 50px;
}

.container.all,
.container.bottom{
  padding-bottom: 50px;
}

.container.all,
.container.sides,
.container.left{
  padding-left: 50px;
}

.container.all,
.container.sides,
.container.right{
  padding-right: 50px;
}

.container.allplus{
  padding: 100px;
}

.container.topplus{
  padding-top: 100px;
}

.container.topnav{
  padding-top: 160px;
}

.content{
  width: 100%;
  height: 100%;
  max-width: 1500px;
  margin: 0px auto;
}

.container.fullblack,
.content.black{
  background: #000;
}

.container.fullwhite,
.content.white{
  background: #fff;
}

.content.flex{
  display: flex;
}

.content.row{
  flex-direction: row;
  flex-wrap: wrap;
  align-items: stretch;
}

.content.column{
  flex-direction: column
}

.content.row.middle{
  align-items: center;
}

.content.column.middle{
  justify-content: center;
}

.content.row.center{
  justify-content: center;
}

.content.column.center{
  align-items: center;
}

.content.row.end{
 align-items: flex-end;
}

.content.column.end{
  justify-content: flex-end;
}

.content.row.start{
 align-items: flex-start;
}

.content.column.start{
  justify-content: flex-start;
}

.content.row.startleft{
  justify-content: flex-start;
}

.content.column.startleft{
  align-items: flex-start;
}

.content.row.endright{
  justify-content: flex-end;
}

.content.column.endright{
  align-items: flex-end;
}

@media screen and (max-width: 950px){
  .content.column.tablet{
    flex-direction: row
  }

  .content.row.tablet{
    flex-direction: column
  }
}

@media screen and (max-width: 600px){
  .content.column.mobile{
    flex-direction: row
  }

  .content.column.tablet.mobile{
    flex-direction: column
  }

  .content.row.mobile{
    flex-direction: column
  }

  .content.row.tablet.mobile{
    flex-direction: row
  }
}
</style>
