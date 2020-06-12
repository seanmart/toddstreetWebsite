<template lang="html">
  <section id="care" v-section>
    <div class="post">
      <div class="title">
        <section-title :title="post.title" :key="$route.params.id || 0" :animate="false"/>
      </div>
      <div class="image">
        <img v-if="post && post.image" :src="post.image" alt="">
      </div>
      <div class="body">
        <div v-if="post" class="body--sm" v-html="post.html"/>
      </div>
    </div>
    <div class="side-posts">
      <side-post
        v-for="post, i in posts"
        :class="{active: post.id == id}"
        :key="i"
        :data="post"
        @click.native="handleSelected(post.link)"
      />
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
    gsap.set('#care .section-title hr',{scaleY: 0})
    gsap.set('#care .section-title h1',{yPercent: 100})
    gsap.set('#care .side-post',{y: 100,opacity: 0})
    gsap.set('#care .image',{y:100,opacity: 0})
    gsap.set('#care .body',{y:100,opacity: 0})
  },
  watch:{
    ready(){
      this.show()
    },
    id(){
      setTimeout(()=>{
        this.show()
        this.$vb.init()
      },200)
    }
  },
  methods:{
    show(){
      let tl = gsap.timeline()
      tl.set('#care .section-title', {opacity: 1})
      tl.to('#care .section-title hr',1,{scaleY:1, ease: 'power4.out'},.25)
      tl.fromTo('#care .section-title h1',1,{yPercent: 100},{yPercent:0, ease: 'power4.out', stagger: .05},.5)
      tl.to('#care .side-post',1,{y:0, opacity: 1, ease: 'power4.out', stagger: .1},.5)
      tl.to('#care .image', 1,{y:0, opacity: 1,ease: 'power4.out'},.75)
      tl.to('#care .body', 1,{y:0, opacity: 1,ease: 'power4.out'},.75)
    },
    handleSelected(link){
      if (link.id == this.id) return
      let tl = gsap.timeline({onComplete:()=> this.$router.push(link)})
      tl.to(window,.75,{scrollTo: 0,ease: 'power2.out'},0)
      tl.to('#care .section-title hr',.5,{scaleY: 0},0)
      tl.to('#care .section-title h1',.5,{yPercent: 100},0)
      tl.to('#care .image',.5,{y:100,opacity: 0},0)
      tl.to('#care .body',.5,{y:100,opacity: 0},0)
      tl.set('#care .section-title',{opacity:0})
    }
  },
  computed:{
    ...mapState(['ready']),
    id(){
      return this.$route.query.id || this.posts[0].id
    },
    posts(){
      return [...this.$store.state.care].sort((a,b) => new Date(b.date) - new Date(a.date))
    },
    post(){
      return this.posts.filter(p => p.id == this.id)[0]
    },
  }
}
</script>

<style lang="scss">
  #care{
    display: flex;
    flex-direction: row;

    .title{
      margin-bottom: $desktop-section-space;
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
      .title{
        margin-bottom: $tablet-section-space
      }

      .side-posts{
        width: 200px;
      }
    }

    @media (max-width: $mobile){
      flex-direction: column;

      .title{
        margin-bottom: $mobile-section-space;
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
