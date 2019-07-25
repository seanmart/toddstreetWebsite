import Vue from "vue";
Vue.directive("scroll", {
  bind: (el, binding) => {
    let triggered = false;
    let offset = 0;
    let props = binding.value;
    let w = window;

    // triggers
    let start = props.start || 50;
    let end = props.end || 50;

    el.handleScroll = () => {
      // variables
      let rect = el.getBoundingClientRect();
      let ts = w.innerHeight / (100 / start);
      let te = w.innerHeight / (100 / end);
      let percent = 0;

      // update
      offset = ts - rect.top;

      if (rect.top < ts && rect.bottom > te) {
        !triggered && props.on && props.on();
        triggered = true;

        percent = offset / (el.offsetTop + el.offsetHeight - te);
        props.active && props.active({ rect, offset, percent });

        return;
      }

      if (triggered) {
        triggered = false;
        props.off && props.off();
      }
    };
  },
  unbind: el => {
    window.removeEventListener("scroll", el.handleScroll);
  },
  inserted: el => {
    window.addEventListener("scroll", el.handleScroll);
    el.handleScroll();
  }
});
