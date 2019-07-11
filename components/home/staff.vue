<template lang="html">
  <div class="max">
    <tabs :labels="departments" @clicked="active = $event.index" />
    <div
      class="department"
      v-for="(d, i) in departments"
      :class="{ active: active === i }"
      :key="i"
    >
      <div class="employee" v-for="(e, x) in content[d]" :key="x">
        <div class="image" :style="{ backgroundImage: `url(${e.image})` }" />
        <div class="text">
          <h3>{{ e.title }}</h3>
          <p>{{ e.role }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import tabs from "@/components/global/tabs";
export default {
  components: { tabs },
  props: {
    content: Object
  },
  data() {
    return {
      active: 0
    };
  },
  computed: {
    departments() {
      return Object.keys(this.content);
    },
    employees() {
      return this.content[this.departments[this.active]];
    }
  }
};
</script>

<style lang="css">
.department{
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  display: none
}

.department.active{
  display: flex;
}

.employee{
  flex: 0 0 50%;
  padding: 10px;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
}

.employee .image{
  flex: 0 0 auto;
  height: 120px;
  width: 120px;
  margin-right: 20px;
  background-size: cover;
}

.employee .text{
  flex: 1 1 auto;
}

.employee h3{
  font-size: 16px;
  font-weight: 900
}

.employee p{
  font-size: 14px;
  font-weight: 300
}

@media screen and (max-width: 850px){
  .employee .image{
    height: 100px;
    width: 100px;
  }
}

@media screen and (max-width: 700px){
  .employees{
    flex-direction: column;
  }
}
</style>
