<template lang="html">
  <div class="max">
    <tabs :labels="labels" @clicked="active = $event.index" />
    <div class="list" :key="Date.now()">
      <ul
        v-for="(chunk, a) in list"
        :key="a"
        :style="{ animationDelay: `.${a * 2}s` }"
      >
        <li v-for="(item, b) in chunk" :key="b">
          <h1>{{ item }}</h1>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import tabs from "@/components/tabs";
import { chunk } from "lodash";
export default {
  components: { tabs },
  props: { lists: Array },
  data() {
    return {
      active: 0
    };
  },
  computed: {
    list() {
      let list = this.lists[this.active].list;
      return chunk(list, Math.ceil(list.length / 2));
    },
    labels() {
      return this.lists.map(x => x.label);
    }
  }
};
</script>

<style lang="css" scoped>

.list{
  display: flex;
  flex-direction: row;
}

.list ul{
  flex: 1 1 50%;
  padding: 0px;
}

.list li{
  list-style: none;
}

.list h1{
  font-size: 2vw;
  padding: 5px;
}

@media screen and (max-width: 700px){
  .list{
    flex-direction: column;
    justify-content: flex-start;
  }

  .list ul{
    flex: 0 0 auto;
    animation: none;
  }

  .list h1{
    font-size: 1em;
  }
}

@media screen and (min-width: 1200px){
  .list h1{
    font-size: 24px;
  }
}

@keyframes smooth-item{
  from{
    opacity: 0;
    transform: translateY(-50px);
  }
  to{
    opacity: 1;
    transform: translateY(0px);
  }
}
</style>
