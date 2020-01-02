<template lang="html">
    <header class="spacer">
      <div class="container intro-content">
        <slot></slot>
      </div>
    </header>
</template>

<script>
export default {}
</script>

<style lang="css">

header{
  padding-top: 15rem !important;
}

.intro-content{
  animation: slide-on-left 1s forwards
}

@media screen and (max-width: 850px){
  header{
    padding-top: 35vw !important
  }
}


</style>
