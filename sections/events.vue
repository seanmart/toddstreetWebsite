<template lang="html">
  <section id="events" data-scroll-section>
    <div class="content">

      <div
      class="item text title"
      data-scroll
      data-scroll-call="eventsTitle">
        <textReveal :play="showTitle">
          <h1 v-for="(line, i) in data.title" :key="i">{{line}}</h1>
        </textReveal>
      </div>

      <div data-scroll class="item text description">
        <p>{{data.description}}</p>
        <button data-scroll data-scroll-speed="1">{{data.cta.label}}</button>
      </div>

      <parallax-image
      :image="data.images.image1"
      class="item image events-1"
      data-scroll
      data-scroll-speed="5"/>

      <parallax-image
      :image="data.images.image2"
      class="item image events-2"
      data-scroll
      data-scroll-speed="3"/>

      <parallax-image
      :image="data.images.image3"
      class="item image events-3"
      data-scroll
      data-scroll-speed="1"/>

      <parallax-image
      :image="data.images.image4"
      class="item image events-4"
      data-scroll
      data-scroll-speed="8"/>

      <parallax-image
      :image="data.images.image5"
      class="item image events-5"
      data-scroll
      data-scroll-speed="3"/>

    </div>
  </section>
</template>

<script>
import parallaxImage from '@/components/parallaxImage'
import textReveal from '@/components/textReveal'
export default {
  components:{parallaxImage,textReveal},
  props: ['data'],
  data(){
    return{
      showTitle: false
    }
  },
  mounted(){
    this.$loco.on('call',(fn)=>{
      if (fn === 'eventsTitle') this.showTitle = true
    })
  }
}
</script>

<style lang="scss">

#events{

  padding: 0px;

  .image{
    width: 100vw;
    height: 100vw;
    margin-bottom: 5vw;
    opacity: 0;
    transform: translateY(50px);
    transition: opacity .5s, transform .5s;
    max-height: 500px;
  }

  .image.is-inview{
    opacity: 1;
    transform: translateY(0px);
  }

  .text{
    @include padding;
  }

  .title{
    position: relative;
    z-index: 1;
    color: white;
    @include big-title;
    padding-top: 20vw;
  }

  .description{
    padding-bottom: 20vw;
    position: relative;
    z-index: 1;
    color: white;
    @include medium-text;
  }

  button{
    background: $ruby;
    color: white;
    padding: 2vw 3vw;
    @include small-title;
    font-weight: 600;
    letter-spacing: .05vw;
    margin: 8vw 0px;
  }

}

.has-scroll-smooth{
  #events{

    margin-top: 25vw;

    .content{
      position: relative;
      height: 240vw;
    }

    .text{
      padding: 0px;
    }

    .item{
      position: absolute;
    }

    .image{
      transition: none;
      opacity: 1;
      transform: none;
    }

    .title{
      top: 40vw;
      width: auto;
      right: 10vw;
      height: 40vw;
      margin: 0px;
    }

    .description{
      top: 210vw;
      width: 60vw;
      height: auto;
      left: 25vw;
      margin: 0px;
    }

    .events-1{
      top: 0px;
      right: 0px;
      width: 35vw;
      height: 30vw;
    }

    .events-2{
      top: 10vw;
      left: 0px;
      width: 55vw;
      height: 80vw;
    }

    .events-3{
      top: 100vw;
      left: 10vw;
      width: 65vw;
      height: 50vw;
    }

    .events-4{
      top: 165vw;
      right: 5vw;
      width: 30vw;
      height: 40vw;
    }

    .events-5{
      top: 175vw;
      left: 10vw;
      width: 40vw;
      height: 40vw;
    }

    @media (max-width: $mobile){
      .content{
        height: 280vw;
      }
    }

  }
}
</style>
