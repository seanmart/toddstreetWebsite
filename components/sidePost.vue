<template lang="html">
  <div class="side-post">
    <p v-if="showDate" class="date">{{getDate(data.date)}}</p>
    <h3 class="header--sm title">{{data.title}}</h3>
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
</style>
