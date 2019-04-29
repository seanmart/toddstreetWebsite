<template lang="html">
  <div class="post-item">
    <div class="inner-post is-white shadow">
      <div
        class="image"
        :style="{ backgroundImage: `url(${data['cover-image']})` }"
      />
      <div class="info">
        <h3>{{ data.title }}</h3>
        <span class="small">{{ shorten(data.body) }}...</span>
        <Button :to="link" class="link">check it out</Button>
      </div>
    </div>
  </div>
</template>

<script>
import Button from "@/components/Button";
export default {
  props: ["data", "link"],
  components: { Button },
  methods: {
    img(img) {
      return { backgroundImage: `url(${img})` };
    },
    shorten(s) {
      return s
        .split(" ")
        .slice(0, 15)
        .join(" ");
    }
  }
};
</script>

<style lang="css" scoped>

.post-item{
  position: relative;
}

.inner-post{
  display: flex;
  flex-direction: column;
  align-items: stretch;
  height: 100%;
  border-radius: 3px;
  overflow: hidden;
}

.image{
  flex: 0 0 200px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.info{
  flex: 1 1 auto;
  position: relative;
  padding: 30px 30px 60px;
}

h3{
  margin-bottom: 10px;
  font-weight: 700;
  text-align: left;
}

span{
  margin-bottom: 30px;
  line-height: 1.4em;
  color: #999;
  display: block;
}

.link{
  position: absolute;
  bottom: 30px;
  left: 30px;
}
</style>
