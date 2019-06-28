<template lang="html">
  <div class="table" :class="{ vertical }">
    <div class="row" v-for="(row, r) in rows">
      <div
        class="column"
        v-for="(col, c) in row"
        :key="Date.now() + r + c"
        :style="{
          width: vertical ? '100%' : `${100 / columns}%`,
          animationDelay: `.${(r + 1) * columns - (columns - c)}s`
        }"
      >
        <slot v-bind:props="col" />
      </div>
    </div>
  </div>
</template>

<script>
import { chunk } from "lodash";
export default {
  props: {
    data: Array,
    columns: { type: Number, default: 3 },
    vertical: Boolean
  },
  computed: {
    rows() {
      return chunk(this.data, this.columns);
    }
  }
};
</script>

<style lang="css" scoped>
.table{
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
}

.table.vertical{
  flex-direction: row;
}

.row{
  flex: 1 1 auto;
  display: flex;
  flex-direction: row;
}

.table.vertical .row{
  flex-direction: column;
}

.column{
  flex: 1 1 auto;
  animation: fade 2s backwards
}

@media screen and (max-width: 900px){
  .table, .table.vertical{
    flex-direction: column;
  }

  .row, .table.vertical .row{
    flex-direction: column;
    align-items: center;
  }

  .column{
    width: auto !important
  }
}
</style>
