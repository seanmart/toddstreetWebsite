<template lang="html">
  <section id="intro" ref="section">

    <reveal :play="init" :delay=".2" top>
      <h1 ref="title" v-html="title"/>
    </reveal>

    <reveal :play="init" :delay=".3" top>
      <div class="description" ref="description">
        <p v-html="description"/>
        <div class="hover" ref="hover" :class="{active: img}">
          <img ref="hoverImg">
        </div>
      </div>
    </reveal>

  </section>
</template>

<script>
export default {
  props:{
    data: {type: Object, default: ()=>({})},
    init: {type: Boolean, default: false}
  },
  data(){
    return{
      els:[],
      x: 0,
      y: 0,
      img: null
    }
  },
  mounted(){
    this.$vb.addSection(this.$refs.section)
    this.$vb.addElement(this.$refs.title,{y:1.5, initial: false})
    this.$vb.addElement(this.$refs.description,{y: 1, initial: false, onMouseOver: this.handleHover})

    this.els = Array.from(this.$refs.description.getElementsByTagName('b'))

  },
  watch:{
    x(x){
      if (x) this.$refs.hover.style.left = `${x}px`
    },
    y(y){
      if (y) this.$refs.hover.style.top = `${y}px`
    },
    img(img){
      if (img) this.$refs.hoverImg.src = this.img
    }
  },
  computed:{
    title(){
      return this.data.title
    },
    description(){
      let description = this.data.description.text

      this.data.description.hover.forEach(h => {
        description = description.replace(h.text, `<b data-gif="${h.gif}">${h.text}</b>`)
      })

      return description
    }
  },
  methods:{
    handleHover(m){

      for (let i = 0; i < this.els.length; i++){

        let el = this.els[i]
        let {top, left, bottom, right} = el.getBoundingClientRect()

        if (m.mouse.x >= left && m.mouse.x <= right && m.mouse.y >= top && m.mouse.y <= bottom){
            this.x = m.x
            this.y = m.y
            this.img = el.getAttribute('data-gif')

            return
        }
      }

      this.x = null
      this.y = null
      this.img = null

    },
  }
}
</script>

<style lang="scss">
#intro{
  position: relative;
  padding-top: $v-space / 1.25;

  h1{
    text-transform: capitalize;
    line-height: 80%;
    font-size: 85px;
    font-weight: 900;
    color: #002E60;
    max-width: 800px;
  }

  .description{
    margin-top: $v-space / 2;
    position: relative;

    .hover{
      position: absolute;
      top: 0px;
      left: 0px;
      transform: translateY(-120%);

      img{
        max-width: 300px;
        max-height: 300px;
        transform: scale(0);
        opacity: 0;
        transition: opacity .25s, transform .25s;
      }

      &.active{
        img{
          transform: scale(1);
          opacity: 1;
        }
      }
    }

    p{
      font-size: 30px;
      font-weight: 300;
      line-height: 150%;
      max-width: 800px;

      b{
        color: #002E60;
        font-weight: 700;
        cursor: pointer;
        display: inline-block;
        transition: opacity .25s;
        &:hover{
          opacity: .5;
        }
      }
    }
  }

  @media (max-width: $tablet){

    padding-top: $v-space / 1.5;

    .description{
      p{
        font-size: 23px;
      }
    }
  }

  @media (max-width: $mobile){

    padding-top: $v-space / 2;

    h1{
      font-size: 15vw;
    }
    .description{
      margin-top: 8vh;

      p{
        font-size: 21px;
      }
    }
  }
}
</style>
