<template>
  <section>
    <intro class="bg-lg">
      <h2>Hello we're toddstreet</h2>
      <p class="c-80">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
      </p>
    </intro>
      <gridContainer class="container departments" v-if="departments.length > 0">
        <template v-for="(department, index) in departments">
          <gridBox boxWidth="full" :index="index"><h2 class="c-60">{{department.name}}</h2></gridBox>
          <template v-for="(employee, index2) in department.employees">
            <gridBox boxWidth="third" class="employee" :index="index2">
              <div class="image" :style="{ backgroundImage: `url(${employee.poster})`}"/>
              <h4 class="c-100">{{employee.name}}</h4>
              <pre><span class="c-80">{{employee.role}}</span></pre>
            </gridBox>
          </template>
        </template>
      </gridContainer>
  </section>
</template>

<script>
import gridContainer from '@/components/grid/gridContainer'
import gridBox from '@/components/grid/gridBox'
import { filter, groupBy } from 'lodash'
export default {
  async asyncData() {
    const staff = await import('@/data/staff')
    const employees = groupBy(
      filter(staff.default.employees, { active: true }),
      'department'
    )
    const departments = staff.default.departments.map(dept => ({
      name: dept.name,
      employees: employees[dept.key] || []
    }))
    return { departments }
  },
  mounted() {
    this.$store.commit('nav/navColor')
  },
  components: {
    gridContainer,
    gridBox
  },
  data() {
    return {
      departments: []
    }
  }
}
</script>

<style>
.departments h2 {
  padding: 80px 0px;
  margin: 0px;
}

.departments .image {
  padding: 50%;
  margin-bottom: 20px;
  background-size: cover;
}

.departments pre {
  white-space: pre-line;
}

.employee {
  padding-bottom: 40px;
}

@media screen and (max-width: 850px) {
  .employee {
    text-align: center;
  }
}
</style>
