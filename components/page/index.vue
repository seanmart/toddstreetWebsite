<template lang="html">
  <main v-page>
    <navigation/>
    <div class="page">
      <slot/>
    </div>
  </main>
</template>

<script>
import navigation from './navigation'

let scroll = {
  y:0,
  ticking: false
}

export default {
  components:{navigation},
}
</script>

<style lang="scss">
  main{
    animation: hide-on .5s backwards;
    width: 100vw;
    overflow: hidden;
  }

  .page-enter-active, .page-leave-active {
    transition: .5s
  }
  .page-enter, .page-leave-active .page{
    opacity: 0;
  }

  @keyframes hide-on{
    0%{opacity: 0}
    99%{opacity: 0}
    100%{opacity: 1}
  }
</style>
