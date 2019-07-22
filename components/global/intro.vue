<template lang="html">
  <div class="intro max" :class="{ ['no-body']: !body }">
    <h1>{{ title }}</h1>
    <div class="body" v-if="body">
      <p v-for="p in body.split('\n')">{{ p }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    text: Object
  },
  computed: {
    title() {
      if (!this.text) return "";
      return this.text.title ? this.text.title : "";
    },
    body() {
      if (!this.text) return "";
      return this.text.body ? this.text.body : "";
    }
  }
};
</script>

<style lang="css" scoped>
.intro{
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
}

.intro h1{
  margin-top: -15px;
  flex: 0 0 auto;
  padding-right: 50px;
  text-align: right;
  font-weight: 900;
  font-size: 70px;
  line-height: 67px;
  letter-spacing: -1px;
  white-space: pre-wrap;
}

.intro .body{
  flex: 1 1 auto;
  border-left: 3px solid;
  padding-left: 50px;
}

.intro p{
  font-family: 'Roboto Slab', serif;
  margin-bottom:17px;
  font-size: 17px;
  line-height: 24px;
  font-weight: 400;
}

.intro p:last-child{
  margin-bottom: 0px;
}

.intro.no-body{
  justify-content: flex-start;
}

@media screen and (max-width: 1000px){
  .intro h1{
    font-size: 60px;
    line-height: 57px;
  }

  .intro p{
    font-size: 18px;
    line-height: 25px;
  }
}

@media screen and (max-width: 850px){
  .intro{
    flex-direction: column;
  }

  .intro h1{
    white-space: normal;
    padding: 0px 0px 40px;
    text-align: left;
  }

  .intro h1.no-body{
    white-space: normal;
    padding: 0px;
    text-align: left;
    border: none;
  }

  .intro .body{
    border-left: none;
    padding-left: 0px;
  }
}

@media screen and (max-width: 550px){
  .intro h1{
    font-size: 40px;
    line-height: 37px;
  }

  .intro p{
    font-size: 16px;
    line-height: 23px;
  }

}
</style>
