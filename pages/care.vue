<template lang="html">
  <section id="care" v-section>
    <div class="intro">
      <section-title :title="post.title" :key="$route.params.id || 0" :animate="false"/>
    </div>
    <div class="content">
      <div class="post">
        <img v-if="post.image" :src="post.image" alt="">
        <div class="body--sm" v-html="post.html"/>
      </div>
      <div class="side-posts">
        <side-post
          v-for="post, i in posts"
          :key="i"
          :data="post"
          @click.native="handleSelected(post.link)"
        />
      </div>
    </div>
  </section>
</template>

<script>
import sidePost from '@/components/sidePost'
import sectionTitle from '@/components/sectionTitle'
import {mapState} from 'vuex'
export default {
  components:{sidePost,sectionTitle},
  data:()=>({
    animation:null
  }),
  mounted(){
    gsap.set('#care',{opacity:0})
  },
  watch:{
    ready(){
      this.animate()
    },
    query(){
      gsap.set('#care',{opacity:0})
      setTimeout(()=>{
        this.animate()
        this.$vb.init()
      },500)
    }
  },
  methods:{
    animate(){
      let tl = gsap.timeline()
      gsap.to('#care',.5,{opacity:1, clearProps: 'all'},0)
      tl.from('#care .side-posts',.5,{y:100},0)
      tl.from('#care .section-title hr',1,{scaleY:0, ease: 'power4.out'},.25)
      tl.from('#care .section-title h1',1,{yPercent:100, ease: 'power4.out', stagger: .05},.5)
      tl.from('#care .post', 1,{y:100,opacity: 0,ease: 'power4.out'},.75)
    },
    handleSelected(link){
      let tl = gsap.timeline({onComplete:()=> this.$router.push(link)})
      tl.to('#care',.25,{opacity:0})
      tl.to(window,.5,{scrollTo:0,ease: 'power4.out'})
    }
  },
  computed:{
    ...mapState(['ready']),
    query(){
      return this.$route.query.id
    },
    postsAll(){
      return [...this.$store.state.care].sort((a,b) => new Date(b.date) - new Date(a.date))
    },
    posts(){
      return this.postsAll.filter(p => p.id !== this.post.id)
    },
    post(){
      return this.query
      ? this.postsAll.filter(p => p.id == this.query)[0]
      : this.postsAll[0]
    },
  }
}
</script>

<style lang="scss">
  #care{

    .section-title{
      margin-right: 300px;
      padding-right: $col;
      margin-bottom: $desktop-section-space;
    }

    .content{
      display: flex;
      flex-direction: row;
    }

    .post{
      flex: 1 1 auto;
      margin-right: $col;
      img{
        width: 100%;
        margin-bottom: 40px;
      }
      p{
        margin-bottom: 20px;
      }
      a{
        color: $lightBlue;
        font-weight: 500;
        text-decoration: underline;
      }
    }

    .side-posts{
      flex: 0 0 auto;
      width: 300px;
      .side-post{
        border-color: $blue
      }
    }

    @media (max-width: $tablet){
      .section-title{
        margin-right: 200px;
        margin-bottom: $tablet-section-space
      }

      .side-posts{
        width: 200px;
      }
    }

    @media (max-width: $mobile){
      .section-title{
        margin-right: 0px;
        margin-bottom: $mobile-section-space;
      }
      .content{
        flex-direction: column;
      }
      .post{
        margin-bottom: $mobile-section-space;
      }
      .side-posts{
        width: 100%;
      }
    }

  }
</style>
