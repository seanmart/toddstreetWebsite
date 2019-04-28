<template lang="html">
  <section>
    <div class="landing fullheight">
      <div class="cityscape fullheight" ref="bg" :style="img('bg')" />
      <div class="viewfinder" :style="img('vf')" />
    </div>
    <div class="content is-max-width" ref="content">
      <div class="intro is-padding is-min-full-height">
        <h1 class="is-padding-bottom section">
          <i class="red">What</i> We Believe
        </h1>
        <span class="big">
          True engagement is what transforms an audience into something bigger,
          motivating them to think, feel and act. The catalyst to accomplish
          enduring results.
        </span>
        <span class="big">
          As a Marketing Communications Agency, we create compelling content and
          design innovative solutions to engage audiences authentically across
          live and virtual platforms.
        </span>
      </div>
      <WorkOverview />
      <Staff />
      <CareOverview />
      <Clients />
      <Stats />
    </div>
  </section>
</template>

<script>
import Staff from '@/components/Staff'
import WorkOverview from '@/components/WorkOverview'
import CareOverview from '@/components/CareOverview'
import Clients from '@/components/Clients'
import Stats from '@/components/Stats'
export default {
  components: { Staff, WorkOverview, CareOverview, Clients, Stats },
  mounted() {
    if (window.innerHeight < 600 && window.innerWidth < 800) {
      this.windowHeight = `${window.innerHeight}px`
    }
    window.addEventListener('scroll', this.handleScroll)
    this.handleScroll()
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  data() {
    return {
      windowHeight: '100vh'
    }
  },
  methods: {
    handleScroll() {
      const bg = this.$refs.bg
      const ct = this.$refs.content.getBoundingClientRect().top
      const wh = window.innerHeight
      let o = ct / wh
      bg.style.opacity = o > 0 ? o : 0
    },
    img(id) {
      switch (id) {
        case 'bg':
          return { backgroundImage: 'url(/uploads/cityscape.jpg)' }
        case 'vf':
          return { backgroundImage: 'url(/uploads/viewfinder_website.png)' }
      }
    }
  }
}
</script>

<style lang="css" scoped>

.landing{
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}

.cityscape{
  position: fixed;
  top: 0px;
  left: 0px;
  bottom: 0px;
  right: 0px;
  background-size: cover;
  background-position: bottom center;
  z-index: -1;
}

.viewfinder{
  flex: 0 0 auto;
  height: 70%;
  width: 65vw;
  max-width: 500px;
  margin: 0px auto;
  background-size: contain;
  background-position: bottom center;
  background-repeat: no-repeat;
}

.intro{
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}

span{
  color: #999;
  margin-bottom:20px;
}
</style>
