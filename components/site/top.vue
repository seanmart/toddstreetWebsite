<template lang="html">
  <header>
    <div class="container top">
      <div class="content" v-scroll:section>
        <icons icon="logo" class="logo"/>
      </div>
    </div>
  </header>
</template>

<script>
import icons from '@/components/icons'
export default {
  components:{icons}
}
</script>

<style lang="scss">
  header{
    .top{
      position: absolute;
      top:0px;
      left:0px;
      right:0px;
      bottom:0px;

      .logo{
        width: 20vw;
      }
    }
  }
</style>
