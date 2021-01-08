<template lang="html">
  <main class="space-nav space-h">
    {{project.title}}
  </main>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['projectsByID']),
    project(){
      let key = this.$route.params.slug
      if (!key) return null
      return this.projectsByID[key]
    }
  }

}
</script>

<style lang="css">
</style>
