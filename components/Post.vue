<template>
  <box card col3 :to="link">
    <box :image="image" ratio />
    <box textbox>
      <t title small thick>{{ title }}</t>
      <t body small grey before after>{{ shorten(body) }}...</t>
      <t body small link>check it out</t>
    </box>
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
<style lang="css" scoped></style>
