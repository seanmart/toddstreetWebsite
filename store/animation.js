import { TimelineMax, TweenLite } from "gsap";
let tl, cover, sidebar, logo, topLinks, button;

export default {
  actions: {
    init({rootState}){
      cover = document.getElementById("cover");
      sidebar = document.getElementById("sidebar");
      logo = document.getElementById("logo");
      topLinks = document.getElementsByClassName("top-link");
      button = document.getElementById("menu-button");

      tl = new TimelineMax()
      tl.set(sidebar,{xPercent: -100})
      tl.set(logo,{xPercent: rootState.mobile ? 100 : -100})
      tl.set(topLinks,{yPercent: -100})
      tl.set(button, {xPercent: -100})
    },
    transition({ dispatch, rootState, commit }, action) {
      return new Promise(resolve => {
        tl = new TimelineMax({onComplete:() => resolve()});

        let mobile = rootState.mobile
        let scrolled = rootState.scrolled

        if (action === "in") {
          dispatch("cover", {start: 0, load: false });

          if (mobile){
            dispatch("topbar", {start: .5, load: true });
            dispatch("logoMobile", {start: .75, load: true });
            dispatch("button", {start: .75, load: true });
          } else{
            dispatch("sidebar", {start: .5, load: true });
            dispatch("logo", {start: .75, load: true });
            scrolled
            ? dispatch("button", {start: .75, load: true })
            : dispatch("navigation", {start: .75, load: true })
          }

          setTimeout(()=> commit("ready", true, {root: true}),700)

        } else {

          commit("ready", false,{root: true})

          if (mobile){
            dispatch("logoMobile", {start:0, load: false });
            dispatch("button", {start: 0, load: false });
            dispatch("topbar", {start: .25, load: false });
          } else{
            scrolled
            ? dispatch("button", {start: 0, load: false })
            : dispatch("navigation", {start: 0, load: false })
            dispatch("logo", {start: 0, load: false });
            dispatch("sidebar", {start: .25, load: false });
          }

          dispatch("cover", {start: 1, load: true });
        }
      });
    },
    mobile({dispatch, rootState}, isMobile){
      tl = new TimelineMax();

      let scrolled = rootState.scrolled

      if (isMobile){
        dispatch("navigation", {start: 0,load: false})
        dispatch("button",{start: 0, load: false})
        dispatch("logo",{start: 0, load: false})
        dispatch("sidebar", {start: .25, load: false})
        dispatch("topbar", {start: .75, load: true})
        dispatch("button",{start: 1, load: true})
        dispatch("logoMobile",{start: 1, load: true})
      } else{
        dispatch("logoMobile",{start: 0, load: false})
        dispatch("button",{start: 0, load: false})
        dispatch("topbar", {start: .25, load: false})
        dispatch("sidebar", {start: .75, load: true})
        dispatch("logo",{start: 1, load: true})
        dispatch("button",{start: 1, load: scrolled})
        dispatch("navigation", {start: 1,load: !scrolled})
      }
    },
    scrolled({dispatch, rootState}, scrolled){

      if (rootState.mobile) return

      tl = new TimelineMax()

      if (scrolled){
        dispatch("navigation", {start: 0,load: false})
        dispatch("button",{start: 0, load: true})
      } else{
        dispatch("navigation", {start: 0,load: true})
        dispatch("button",{start: 0, load: false})
      }
    },
    cover(context, { load, start }) {
      tl.set(cover, { yPercent: load ? 100 : 0 }, 0);
      tl.to(cover, .5, { yPercent: load ? 0 : -100, ease: Power1.easeIn }, start);
    },
    sidebar(context, { load, start }) {
      tl.to(sidebar, .5, { xPercent: load ? 0 : -100 }, start);
    },
    topbar(context,{load,start}){
      if (load){
        tl.set(sidebar,{yPercent:-100, xPercent: 0, onStart: ()=> sidebar.classList.add('mobile')},start)
        tl.to(sidebar, .5,{yPercent: 0},start)
      } else{
        tl.to(sidebar,.5,{yPercent: -100},start)
        tl.set(sidebar,{yPercent: 0,xPercent: -100, onComplete: ()=> sidebar.classList.remove('mobile')},start + .5)
      }
    },
    navigation(context, { load, start}) {
      tl.staggerTo(topLinks,.5,{ yPercent: load ? 0 : -100, ease: load ? Power4.easeOut : Power4.easeIn },0.1,start);
    },
    logo(context, {load, start}){
      load && tl.set(logo, {xPercent: -100}, start)
      tl.to(logo, 0.35, { xPercent: load ? 0 : -100 }, start);
    },
    logoMobile(context, {load, start}){
      load && tl.set(logo, {xPercent: 100}, start)
      tl.to(logo, 0.35, { xPercent: load ? 0 : 100 }, start);
    },
    button(context, {load, start}){
      tl.to(button, 0.35,{xPercent: load ? 0 : -100}, start)
    }
  }
};
