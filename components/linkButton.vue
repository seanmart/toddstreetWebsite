<template lang="html">
  <nuxt-link :to="to" class="link-button">
      <h6 class="h caps" v-html="'take a look'"/>
    </ul>
  </nuxt-link>
</template>

<script>
export default {
  props:{
    to:{type: String, default: '/'}
  }
}
</script>

<style lang="scss">

.link-button{
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid $lightBlue;
  height: 32px;
  padding: 0px 10px;


  h6{
    flex: 0 0 auto;
    color: $lightBlue;
    font-size: 14px;
    font-weight: 500;
    margin-top: 1px;
  }

}

</style>
