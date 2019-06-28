<template lang="html">
  <div class="description max" :class="{ centered: !text }">
    <h1 v-if="title">{{ title }}</h1>
    <div class="text" v-if="text">
      <p v-for="p in text.split('\n')">{{ p }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    text: String
  }
};
</script>

<style lang="css" scoped>

.description{
  display: flex;
  justify-content: center;
  align-items: flex-start;
}

h1{
  margin-top: -1vw;
  flex: 0 1 auto;
  font-size: calc(1em + 5vw);
  letter-spacing: -1px;
  text-align: right;
  font-weight: 900;
  line-height: 95%;
  white-space: pre-wrap;
}

.centered{justify-content: center; align-items: center;}
.centered h1{text-align: center;margin: 0px}

.text{
  flex: 1 1 50%;
  margin-left: 50px;
}

p{
  margin: 20px 0px;
  font-size: calc(.9em + .6vw)
}

p:first-child{
  margin-top: 0px;
}

p:last-child{
  margin-bottom: 0px;
}

@media screen and (max-width:700px){
  .description{
    flex-direction: column;
  }
  h1{
    text-align: left;
    font-size: 51px;
    white-space: normal;
    flex: 0 0 auto;
    margin: 0px;
  }

  p{
    font-size: 18.6px
  }

  .text{
    flex: 0 0 auto;
    margin: 40px 0px 0px
  }

  .centered{align-items: flex-start;}
  .centered h1{text-align: left;}
}

@media screen and (min-width: 1200px){
  h1{font-size: 76px}
  p{font-size: 21.6px}
}
</style>
