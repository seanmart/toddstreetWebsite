<template lang="html">
  <div class="side-posts">
    <template v-for="(post, i) in posts">
      <nuxt-link :to="post.to" class="side-post" :key="i">
        <p v-if="date" class="date">{{getDate(post.date)}}</p>
        <h3 class="header--sm title">{{post.title}}</h3>
        <fancyLink :to="post.to">Check It Out</fancyLink>
      </nuxt-link>
    </template>
  </div>
</template>

<script>
import fancyLink from '@/components/fancyLink'
export default {
  components:{fancyLink},
  props:{
    date: {type: Boolean, default: false},
    posts:{type: Array, default:()=>([])}
  },
  methods:{
    getDate(date){
      return new Date(date).toLocaleDateString("en-US").split('/').join('.')
    }
  }
}
</script>

<style lang="scss">
.side-posts{
  display: flex;
  flex-direction: column;
  align-items: stretch;

  .side-post{
    padding: 40px 0px;
    border-top: 2px solid $lightBlue;
    min-height: 200px;
    display: flex;
    flex-direction: column;
    justify-content: center;

    &:last-child{
      border-bottom: 2px solid $lightBlue;
    }

    .date{
      font-size: 12px;
      flex: 0 0 auto;
      margin-bottom: 10px;
    }

    .title{
      flex: 0 0 auto;
      margin-bottom: 20px;
    }

    .fancy-link{
      flex: 0 0 auto;
    }
  }
}
</style>
