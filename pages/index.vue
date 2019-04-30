<template>
  <div class="home">
    <container cover flex column end center :style="cityscape">
      <box contain class="viewfinder" :style="viewfinder" />
    </container>
    <container flex center middle column allplus>
      <t title big thick>What We Believe</t>
      <t body big grey
        >True engagement is what transforms an audience into something bigger,
        motivating them to think, feel and act. The catalyst to accomplish
        enduring results.</t
      >
      <t body big grey
        >As a Marketing Communications Agency, we create compelling content and
        design innovative solutions to engage audiences authentically across
        live and virtual platforms.</t
      >
    </container>

    <container flex row black id="WORK-OVERVIEW">
      <Project
        v-for="(project, i) in projects.data"
        :key="i"
        :active="projects.active === i"
        :title="project.header"
        :image="project['cover-image']"
        :link="project.permalink"
        :type="project['work-category']"
        @clicked="projects.active = projects.active === i ? null : i"
      />
    </container>

    <container all topplus id="EMPLOYEES">
      <t title big thick center>Who We Are</t>

      <container flex row startleft>
        <Employee
          v-for="(e, i) in employees.leaders"
          :key="i"
          :name="e.title"
          :role="e.role"
          :image="e.image"
        />
      </container>
      <container flex row startleft>
        <Employee
          v-for="(e, i) in employees.workers"
          :key="i"
          :name="e.title"
          :role="e.role"
          :image="e.image"
        />
      </container>
    </container>

    <container all id="WE-CARE">
      <t title big thick center>How We Care</t>
      <t body medium grey class="padded">
        Our unified commitment to apply our talents to benefit charitable
        organizations for social good broadens our experience, insight,
        creativity and awareness with the work we do for our clients. We believe
        we’re all better for it.
      </t>
      <container flex row center tablet top>
        <Post
          v-for="(care, i) in cares"
          :key="i"
          :title="care.title"
          :image="care['cover-image']"
          :link="`/care/${care.id}`"
          :body="care.body"
        />
      </container>
    </container>
  </div>
</template>
<script>
import Post from '@/components/Post'
import Project from '@/components/Project'
import Employee from '@/components/Employee'
export default {
  components: { Project, Employee, Post },
  data() {
    return {
      cityscape: { backgroundImage: `url(/uploads/cityscape.jpg)` },
      viewfinder: { backgroundImage: `url(/uploads/viewfinder.png)` },
      projects: {
        data: this.$store.getters.projectsOverview,
        active: null
      },
      employees: {
        leaders: this.$store.getters.staffLeaders,
        workers: this.$store.getters.staffWorkers
      },
      cares: this.$store.getters.caresOverview
    }
  }
}
</script>
<style lang="css">

.viewfinder{
  height: 70vh;
  width: 70vw;
  max-height: 700px;
  max-width: 700px;
}
</style>
