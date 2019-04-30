<template>
  <box third responsive class="post padded">
    <nuxt-link :to="link">
      <container flex column tablet mobile height>
        <div class="image" :style="{ backgroundImage: `url(${image})` }" />
        <container all fullwhite flex column startleft class="post-content">
          <t title small thick>{{ title }}</t>
          <t body small grey class="body">{{ shorten(body) }}</t>
          <t body small link class="link">check it out</t>
        </container>
      </container>
    </nuxt-link>
  </box>
</template>
<script>
export default {
  props: {
    title: String,
    body: String,
    image: String,
    link: String
  },
  methods: {
    shorten(s) {
      if (!s) return
      return s
        .split(' ')
        .slice(0, 15)
        .join(' ')
    }
  }
}
</script>
<style lang="css" scoped>

.image{
  flex: 0 0 300px;
  background-size: cover;
  background-position: center center;
}

.body{
  margin-bottom: 20px;
}

.post-content{
  flex: 1 1 auto;
}

.link{
  margin-top: auto;
}

@media screen and (max-width: 950px){
  .image{
    flex: 0 1 50%;
  }
}

@media screen and (max-width: 600px){
  .image{
    flex: 0 0 300px;
  }
}
</style>
