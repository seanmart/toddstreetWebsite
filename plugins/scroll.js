import Vue from "vue";
Vue.directive("scroll", {
  bind: (el, binding) => {
    el.html = document.getElementsByTagName("html")[0];
    el.triggered = false;
    el.offset = 0;

    if (binding.value.triggers) {
      el.sp = 100 / binding.value.triggers.start;
      el.ep = 100 / binding.value.triggers.end;
    } else {
      el.sp = 2;
      el.ep = 2;
    }

    el.handleScroll = () => {
      let rect = el.getBoundingClientRect();
      let startTrigger = window.innerHeight / el.sp;
      let endTrigger = window.innerHeight / el.ep;

      el.offset = startTrigger - rect.top;

      console.log(el.offset);

      if (binding.value.scroll) {
        binding.value.scroll({
          position: rect,
          offset: el.offset
        });
      }

      if (rect.top < startTrigger && rect.bottom > endTrigger) {
        // add class
        if (!el.triggered) {
          binding.value.name && el.html.classList.add(binding.value.name);
          binding.value.start && binding.value.start();
          el.triggered = true;
        }

        //send during
        if (binding.value.during) {
          binding.value.during({
            position: rect,
            offset: el.offset
          });
        }
        return;
      }

      // remove class
      if (el.triggered) {
        binding.value.name && el.html.classList.remove(binding.value.name);
        binding.value.end && binding.value.end();
        el.triggered = false;
      }
    };
  },
  unbind: el => {
    window.removeEventListener("scroll", el.handleScroll);
  },
  inserted: (el, binding) => {
    window.addEventListener("scroll", el.handleScroll);
    el.handleScroll();
  }
});
