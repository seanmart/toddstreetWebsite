<template lang="html">
  <section class=" avoid-nav">
    <div id="content">
      <Intro class="is-white shadow is-max-width">
        <h1 class="is-padding-bottom title">
          <i class="text-yellow">How</i> We Care
        </h1>
        <p class="big grey">
          Every day, I’m awed and inspired by the individual and collective
          talents of our team. Their passion, commitment and value that they
          bring to our business, and in turn our clients, demands nothing but my
          deepest respect.
        </p>
        <p class="big grey">
          From inception, I wanted toddstreet to be a company that delivered
          significant contributions in support of our clients businesses, while
          remaining cognizant of our teams’ personal interests, especially their
          philanthropic activities.
        </p>
        <p class="big grey">
          Our unified commitment to apply our talents and capacities to benefit
          charitable organizations for social good broadens our experience,
          insight, creativity and awareness with the work we do for our clients.
          We believe we’re all better for it.
        </p>

        <p class="big quoter">Todd Street</p>
      </Intro>
      <div class="is-padding">
        <div class="is-max-width">
          <Cares :data="cares" />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Cares from "@/components/Cares";
import Intro from "@/components/Intro";
export default {
  components: { Cares, Intro },
  computed: {
    cares() {
      return this.$store.getters.cares;
    }
  }
};
</script>

<style lang="css" scoped>
.quoter{
  display: block;
  font-weight: 600;
  margin-top: 40px;
}
</style>
