<template lang="html">
  <section id="capabilities" data-nav-container="[65,120]">

    <div class="section space" :class="item.type" v-for="item,a in data" :data-nav="item.type" :key="a" :style="">

      <p v-html="item.subhead" class="subhead h3" v-enter:fadeup="{offset:'5vh'}"/>
      <split-text :text="item.head" class="head space-b" textClass="h1 contain" v-enter:splitTextUp="{offset: '7vw'}"/>

      <div class="db-container space-b">
        <div class="reel-button">
          <circle-button class="h4 caps" v-speed="2.2">view the reel</circle-button>
        </div>
        <div class="description">
          <p v-html="item.description" class="p4" v-enter:fadeup="{offset:'10vh'}"/>
        </div>
      </div>

      <div class="case-studies">
        <div class="case-study" v-for="cs,b in item.caseStudies" :key="b">
          <div class="content">

            <div class="background-container" v-bg="cs.color" v-enter:slideup="{offset: '5vh'}">
              <div v-if="cs.background" class="background" v-image="cs.background" v-speed="'20%'" />
            </div>

            <div class="image-container" v-enter:slideup="{offset: '15vh'}">
              <img v-if="cs.image" class="image" :src="cs.image" v-transform="{yPercent:-15, scale: 1.05, transformOrigin: 'top'}"/>
            </div>

          </div>
          <div class="info">
            <h1 class="h4 thin title " v-html="cs.title" v-enter:fadeup="{offset:'5vh'}"/>
            <div class="dot" v-enter:zoomout="{offset:'10vh', duration: 1}"/>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<script>
export default {
  props:['data']
}
</script>

<style lang="scss">
  #capabilities{

    .communications{
      @include texture;
    }
    .section{
      position: relative;
    }
    .subhead{
      margin-bottom: 50px;
      color: $lightBlue;
      font-weight: 500;
    }
    .head{
      max-width: 1000px;
      span{
        font-weight: 300;
        letter-spacing: -2px;
      }
    }

    .db-container{
      position: relative;
      display: flex;
      flex-direction: row;
    }

    .reel-button{
      flex: 1 1 auto;
      text-align: center;
      padding-right: 50px;

      .circle-button{
        display: inline-block;
        width: 100%;
        max-width: 250px;
        min-width: 200px;
        background: white;
        border: 2px solid black;
      }
    }

    .description{
      flex: 1 1 auto;
      p{
        max-width: 700px;
      }
    }

    .case-study{
      margin-bottom: $space-vd / 2;

      &:nth-child(8n + 1){
        width: 40%;
        margin-bottom: 0px;
      }
      &:nth-child(8n + 2){
        width: 50%;
        margin-left: 50%;
        margin-top: -10vw;
      }
      &:nth-child(8n + 3){
        width: 50%;
        margin-left: 25%;
      }
      &:nth-child(8n + 4){
        width: 75%;
      }
      &:nth-child(8n + 5){
        width: 40%;
        margin-left: 60%;
        margin-bottom: 0px;
      }
      &:nth-child(8n + 6){
        width: 50%;
        margin-top: -10vw;
      }
      &:nth-child(8n + 7){
        width: 50%;
        margin-left: 25%;
      }
      &:nth-child(8n + 8){
        width: 75%;
        margin-left: 25%;
      }
      &:last-child{
        margin-bottom: 0px;
      }
    }

    .content{
      padding-bottom: 56.25%;
      position: relative;
      width: 100%;
    }

    .image-container,
    .background-container{
      position: absolute;
      top: 0px;
      left: 0px;
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .background-container{
      overflow: hidden;
    }

    .image-container{
      z-index: 1;
    }

    .info{
      padding-top: 20px;
      display: flex;
      flex-direction: row;
    }

    .dot{
      height: 25px;
      width: 25px;
      border-radius: 50%;
      background: $blue;
      margin-left: auto;
    }

    .background{
      position: absolute;
      bottom: 0px;
      width: 100%;
      height: 130%;
      background-size: cover;
      background-position: center center;
    }

    .image{
      flex: 0 0 auto;
      max-width: 80%;
      max-height: 100%;
    }

    @media (max-width: $mobile){

      .subhead{
        margin-bottom: 20px;
      }

      .db-container{
        flex-direction: column-reverse;
      }

      .description{
        flex: 0 0 auto;
      }

      .reel-button{
        padding: 50px 0px 0px;
        .circle-button{
          transform: none !important;
        }
      }

      .case-study{
        width: 100% !important;
        margin: 0px 0px $space-vm !important;
      }

      .content{
        padding-bottom: 130%;
      }
    }

    @media (min-width: $desktop){
      .head{
        max-width: 70vw;
      }

      .description{
        p{
          max-width: 50vw;
        }
      }
    }

  }
</style>
