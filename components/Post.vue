<template>
  <box card col3 :to="link">
    <box v-if="image" :image="image" ratio />
    <box textbox>
      <t title small thick>{{ title }}</t>
      <t v-if="subtitle" body small before after grey>{{ subtitle }}</t>
      <t v-if="body" body small grey before after>{{ shorten(body) }}...</t>
      <t v-if="link" body small link :style="{ background: linkColor }"
        >check it out</t
      >
    </box>
  </box>
</template>
<script>
export default {
  props: {
    title: String,
    subtitle: String,
    body: String,
    image: String,
    link: String,
    linkColor: { type: String, default: 'black' }
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
