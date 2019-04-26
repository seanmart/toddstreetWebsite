<template lang="html">
  <div class="staff is-padding">
    <h1 class="is-padding-bottom"><i class="blue">Who</i> We Are</h1>
    <div class="staff-section">
      <template v-for="(e, i) in leaders">
        <div class="employee">
          <div class="image" :style="img(e.image)" />
          <div class="info">
            <h4>{{ e.title }}</h4>
            <span class="small">{{ e.role }}</span>
          </div>
        </div>
      </template>
    </div>
    <div class="staff-section">
      <template v-for="(e, i) in workers">
        <div class="employee">
          <div class="image" :style="img(e.image)" />
          <div class="info">
            <h4>{{ e.title }}</h4>
            <span class="small">{{ e.role }}</span>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { filter, orderBy } from "lodash";
export default {
  computed: {
    workers() {
      return this.$store.getters.staffWorkers;
    },
    leaders() {
      return this.$store.getters.staffLeaders;
    }
  },
  methods: {
    img(img) {
      return { backgroundImage: `url(${img})` };
    }
  }
};
</script>

<style lang="css" scoped>


.staff-section{
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.staff-section:last-of-type{
  margin-bottom: -50px;
}

.employee{
  flex: 0 0 20%;
  padding-bottom: 50px;
}

.employee .image{
  box-shadow: 0px 20px 20px -20px rgba(0,0,0,.5);
  height: 150px;
  width: 150px;
  margin: 0px auto;
  background-size: cover;
  border-radius: 100%;
}

.employee h4{
  font-weight: 600;
  text-align: center;
  margin-top: 20px;
  color: #555;
}

.employee span{
  display: block;
  text-align: center;
  margin: 5px 5%;
  color: #999;
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

@media screen and (max-width:700px){
  .employee{
    flex: 0 0 50%
  }
}
</style>
