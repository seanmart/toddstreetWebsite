<template>
  <div class="home">
    <!--############# LANDING #################-->

    <block fullheight fullwidth class="landing">
      <div class="viewfinder" :style="viewfinder" />
      <block fullheight fullwidth :image="cityscape" class="cityscape" />
    </block>
    <block fullwidth class="page">
      <!--############# INTRO #################-->

      <block space class="intro">
        <container center>
          <t title big thick before after><i class="red">What</i> We Believe</t>
          <t body medium grey after>
            True engagement is what transforms an audience into something
            bigger, motivating them to think, feel and act. The catalyst to
            accomplish enduring results.
          </t>
          <t body medium grey>
            As a Marketing Communications Agency, we create compelling content
            and design innovative solutions to engage audiences authentically
            across live and virtual platforms.
          </t>
        </container>
      </block>

      <!--############# PROJECT OVERVIEW #################-->

      <block space>
        <container gallery fullwidth fullheight>
          <Project
            v-for="(project, i) in projects.data"
            :active="projects.active === i"
            :key="i"
            :type="project['work-category']"
            :title="project.header"
            :link="`/projects/${project.permalink}`"
            :image="project['cover-image']"
            @clicked="projects.active = projects.active === i ? null : i"
          />
          <Project empty link="/work">
            <t body big white>View More</t>
          </Project>
        </container>
      </block>

      <!--############# EMPLOYEES #################-->

      <block space extend>
        <t title big thick before after center>
          <i class="blue">Who</i> We Are
        </t>
        <container gallery>
          <Employee
            v-for="(leader, i) in employees.leaders"
            :key="`L${i}`"
            :image="leader.image"
            :name="leader.title"
            :role="leader.role"
          />
          <Employee
            v-for="(worker, i) in employees.workers"
            :key="`W${i}`"
            :image="worker.image"
            :name="worker.title"
            :role="worker.role"
          />
        </container>
      </block>

      <!--############# WE CARE #################-->

      <block extend>
        <t title big thick before center> <i class="yellow">How</i> We Care </t>
        <container>
          <t body medium grey>
            Our unified commitment to apply our talents to benefit charitable
            organizations for social good broadens our experience, insight,
            creativity and awareness with the work we do for our clients. We
            believe we’re all better for it.
          </t>
        </container>
        <container gallery cards>
          <Post
            v-for="(care, i) in cares"
            :key="i"
            :title="care.title"
            :image="care['cover-image']"
            :link="`/care/${care.id}`"
            :body="care.body"
          />
        </container>
      </block>

      <!--############# CLIENTS #################-->

      <block extend space>
        <t title big thick before after center>
          <i class="red">Who</i> We Work With
        </t>
        <container>
          <container gallery fullwidth fullheight class="clients">
            <box col6 v-for="(client, i) in clients" :key="i">
              <div class="client" v-html="client.html" :key="i" />
            </box>
          </container>
        </container>
      </block>
    </block>
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
      cityscape: '/uploads/cityscape.png',
      viewfinder: { backgroundImage: 'url(/uploads/viewfinder.png' },
      projects: {
        data: this.$store.getters.projectsOverview,
        active: null
      },
      employees: {
        leaders: this.$store.getters.staffLeaders,
        workers: this.$store.getters.staffWorkers
      },
      cares: this.$store.getters.caresOverview,
      clients: this.$store.getters.clients
    }
  }
}
</script>
<style lang="css">

.page{
  background: white;
}

.landing{
display: flex;
flex-direction: column;
justify-content: flex-end;
align-items: center;
}

.cityscape{
  position: fixed;
  top: 0px;
  left: 0px;
  z-index: -1
}

.viewfinder{
  flex: 0 0 auto;
  height: 70vh;
  width: 70vw;
  max-height: 700px;
  max-width: 700px;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center bottom;
}

.clients{
  border-bottom: 1px solid #eee;
  border-right: 1px solid #eee;
}

.client{
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  min-height: 150px;
  border-top: 1px solid #eee;
  border-left: 1px solid #eee;
}

.client p{
  text-align: center;
}
.client svg{
  width: 100px;
  max-height: 60px;
  fill: #999;
}
</style>
