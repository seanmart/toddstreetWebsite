<template lang="html">
  <div class="side-post">
    <p v-if="showDate" class="side-post-date">{{getDate(data.date)}}</p>
    <h3 class="side-post-title header--sm">{{data.title}}</h3>
    <fancyLink/>
  </div>
</template>

<script>
export default {
  props:{
    data: {type: Object, default:()=>({})},
    showDate: Boolean
  }
}
</script>

<style lang="scss">
.side-post{
  padding: 40px 0px;
  border-top: 2px solid $lightBlue;
  min-height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  &.active{
    color: $blue;
  }

  .side-post-date{
    font-size: 12px;
    flex: 0 0 auto;
    margin-bottom: 10px;
  }

  .side-post-title{
    flex: 0 0 auto;
    margin-bottom: 20px;
  }

  .fancy-link{
    flex: 0 0 auto;
  }

  @media (max-width: $mobile){
    padding: 20px 0px;
    min-height: 150px;
  }
}
</style>
