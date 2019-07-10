<template lang="html">
  <div class="offers max">
    <tabs :labels="labels" @clicked="active = $event.index" />
    <div class="list">
      <ul v-for="(chunk, a) in list" :key="a">
        <li v-for="(item, b) in chunk" :key="b">
          <p>{{ item }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import tabs from "@/components/global/tabs";
import { chunk } from "lodash";
export default {
  components: { tabs },
  props: { content: Array },
  data() {
    return {
      active: 0
    };
  },
  computed: {
    list() {
      let list = this.content[this.active].list;
      return chunk(list, Math.ceil(list.length / 2));
    },
    labels() {
      return this.content.map(x => x.label);
    }
  }
};
</script>

<style lang="css" scoped>


.list{
  display: flex;
  flex-direction: row;
  transition: height .25s
}

.list ul{
  flex: 1 1 50%;
  padding: 0px;
}

.list li{
  list-style: none;
}

.list p{
  font-size: 25px;
  padding: 5px 0px;
  transition: font-size .25s
}

@media screen and (max-width:1180px){
  .list p{
    font-size: 22px;
  }
}

@media screen and (max-width:1000px){
  .list p{
    font-size: 19px;
  }
}

@media screen and (max-width:850px){
  .list{
    flex-direction: column;
  }

  .list p{
    font-size: 23px;
  }
}

@media screen and (max-width:600px){

  .list p{
    font-size: 18px;
  }
}
</style>
