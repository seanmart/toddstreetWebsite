<script lang="js">
import gallery from '@/components/gallery'
  export default {
    props: ["renderFunc", "staticRenderFuncs"],
    components:{gallery},
    render: function (createElement) {
    return this.templateRender ? this.templateRender() : createElement("div", "Rendering");
    },
    created: function () {
      this.templateRender = new Function(this.renderFunc)();
      this.$options.staticRenderFns = new Function(this.staticRenderFuncs)();
    }
  }
</script>
