<template lang="html">
  <div class="is-padding-top is-padding-sides">
    <Grid v-for="(list, i) in data" :key="i">
      <Employee
        v-for="(item, x) in list"
        :key="x"
        :data="item"
        class="employee"
      />
    </Grid>
  </div>
</template>

<script>
import Employee from "@/components/items/Employee";
import Grid from "@/components/Grid";
export default {
  components: { Employee, Grid },
  props: ["data"]
};
</script>

<style lang="css" scoped>
.employee{
  flex: 0 0 20%;
}

@media screen and (max-width:1200px){
  .employee{
    flex: 0 0 25%
  }
}

@media screen and (max-width:950px){
  .employee{
    flex: 0 0 33.333%
  }
}

@media screen and (max-width: 800px){
  .project{
    flex: 0 0 100%;
  }
}

@media screen and (max-width:700px){
  .employee{
    flex: 0 0 50%
  }
}
</style>
