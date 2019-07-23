<template lang="html">
  <div class="post">
    <div class="inner-post">
      <div class="image" :style="{ backgroundImage: `url(${image})` }" />
      <div class="text">
        <h1>{{ text.title }}</h1>
        <span>{{ text.description }}</span>
        <btn white small outline caps>check it out</btn>
      </div>
    </div>
  </div>
</template>
<script>
import btn from "@/components/global/button";
export default {
  components: { btn },
  props: {
    image: String,
    text: Object,
    link: String
  }
};
</script>

<style lang="css">

.post{
  flex: 0 0 33.333%;
}

.inner-post{
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 30px;
}

.post .image{
  flex: 0 0 auto;
  padding-top: 100%;
  background-size: cover;
  box-shadow: 0px 15px 0px -5px black;
}

.post .text{
    position: relative;
    padding: 30px 0px 60px;
    flex: 1 1 auto;
}

.post .button{
  position: absolute;
  bottom: 0px;
  left: 0px;
}

.post h1{
  font-size: 24px;
  margin-bottom: 20px;
  font-weight: 600
}

.post span{
  display: block;
  font-family: 'Roboto Slab', serif;
  font-size: 14px;
}

@media screen and (max-width: 1000px){
  .post{
    flex: 1 1 100%;
  }

  .post .button{
    position: relative;
    margin-top: 20px;
  }

  .inner-post{
    padding: 30px 0px;
  }

  .post .text{
    padding: 30px 0px 0px;
  }

}

@media screen and (max-width: 1000px) and (min-width: 601px){

  .inner-post{
    flex-direction: row
  }

  .post .image{
    padding: 0px;
    height: 200px;
    width: 200px;
  }

  .post .text{
    padding: 0px;
    padding-left: 30px;
  }

}
</style>
