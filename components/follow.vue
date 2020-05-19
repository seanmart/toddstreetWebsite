<template lang="html">
  <div class="follow" ref="follow">
    <slot/>
    <div class="follow-button-container">
      <div class="follow-button" ref="button">
        <div class="inner-button" :class="{hide}">
          <slot name="button"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      lerpAmount: .2,
      hover: false,
      ticking: false,
      button:{x:0,y:0, height: 0, width: 0, top: 0, left: 0},
      mouse:{x:0,y:0},
      hide: false
    };
  },
  props:{
    appear: {type: Boolean, default: false}
  },
  mounted() {
    if (this.appear) {
      this.hide = true
      this.lerpAmount = .5
    }

    window.addEventListener('resize',this.getButton)
    
    this.$nextTick(()=>{
      this.$vb.addElement(this.$refs.follow,{...this.vb, onMouseOver: this.onMouseOver})
      this.getButton()
    })

  },
  destroyed(){
    window.removeEventListener('resize',this.getButton)
  },
  methods: {
    onMouseOver({entering, leaving, active, x, y}) {

      this.mouse.x = x - this.button.left - (this.button.width / 2)
      this.mouse.y = y - this.button.top - (this.button.height / 2)

      if (active){
        if (!this.ticking) this.handleAnimation()
      }

      if (entering){

        if (this.appear){
          this.button.x = this.mouse.x
          this.button.y = this.mouse.y
          this.hide = false
        } else {
          this.lerpAmount = .2
        }
      }

      if (leaving){
        if (this.appear){
          this.hide = true
        } else {
          this.lerpAmount = .025
          this.mouse.x = 0
          this.mouse.y = 0
          this.handleAnimation()
        }
      }

    },
    handleAnimation(){

      this.ticking = Math.abs(this.button.x - this.mouse.x) > .1 || Math.abs(this.button.y - this.mouse.y) > .1

      if (this.ticking){
        window.requestAnimationFrame(()=>{
          this.button.x = this.$vb.lerp(this.button.x, this.mouse.x,this.lerpAmount)
          this.button.y = this.$vb.lerp(this.button.y, this.mouse.y,this.lerpAmount)
          this.transform()
          this.handleAnimation()
        })
      }
    },
    transform(){
      if (!this.$refs.button) return
      this.$vb.transform(this.$refs.button,this.button.x,this.button.y)
    },
    getButton(){
      let buttonRect = this.$refs.button.getBoundingClientRect();
      let containerRect = this.$refs.follow.getBoundingClientRect();
      let transform = this.$vb.getTransform(this.$refs.button)

      this.button.height = buttonRect.height
      this.button.width = buttonRect.width,
      this.button.top = buttonRect.top - containerRect.top - transform.y,
      this.button.left = buttonRect.left - containerRect.left - transform.x

    }
  }
};
</script>

<style lang="scss">
.follow{
  position: relative;

  .follow-button-container{
    position: absolute;
    top: 0px;
    left:0px;
    right: 0px;
    bottom:0px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .follow-button {
    display: inline-block;

    .inner-button{
      display: inline-block;
      transition: transform .25s, opacity .25s;
      &.hide{
        transform: scale(0);
        opacity: 0;
      }
      &:active{
        transform: scale(.9)
      }
    }
  }
}

</style>
