import { TimelineMax, TweenLite } from "gsap";
let tl, cover, sidebar, logo, topLinks, button;

export default {
  actions: {
    init(){
      cover = document.getElementById("cover");
      sidebar = document.getElementById("sidebar");
      logo = document.getElementById("logo");
      topLinks = document.getElementsByClassName("top-link");
      button = document.getElementById("menu-button");

      tl = new TimelineMax()
      tl.set(sidebar,{xPercent: -100})
      tl.set(logo,{xPercent: -100})
      tl.set(topLinks,{yPercent: -100})
      tl.set(button, {xPercent: 100})
    },
    transition({ dispatch, rootState, commit }, action) {
      return new Promise(resolve => {
        tl = new TimelineMax({onComplete:() => resolve()});
        let mobile = rootState.mobile

        if (action === "in") {
          dispatch("cover", {start: 0, load: false });
          dispatch(mobile ? "topbar" : "sidebar", {start: .5, load: true });
          dispatch(mobile ? "button" : "navigation", {start: .5, load: true });
          setTimeout(()=> commit("ready", true, {root: true}),700)
        } else {
          commit("ready", false,{root: true})
          dispatch(mobile ? "button" : "navigation", {start: 0, load: false });
          dispatch(mobile ? "topbar" : "sidebar", {start: 0.25, load: false});
          dispatch("cover", {start: 1, load: true });
        }
      });
    },
    mobile({dispatch}, action){
      tl = new TimelineMax();

      if (action === "in"){
        dispatch("sidebar", {start: 0, load: false})
        dispatch("navigation", {start: 0,load: false})
        dispatch("topbar", {start: .5, load: true})
        dispatch("button",{start: .5, load: true})
      } else{
        dispatch("topbar", {start: 0, load: false})
        dispatch("button",{start: 0, load: false})
        dispatch("sidebar", {start: .65, load: true})
        dispatch("navigation", {start: .5,load: true})
      }
    },
    cover(context, { load, start }) {
      tl.set(cover, { yPercent: load ? 100 : 0 }, 0);
      tl.to(cover, .5, { yPercent: load ? 0 : -100, ease: Power1.easeIn }, start);
    },
    sidebar(context, { load, start }) {
      tl.to(sidebar, .5, { xPercent: load ? 0 : -100 }, load ? start : start + 0.25);
      tl.to(logo, 0.25, { xPercent: load ? 0 : -100 }, load ? start + 0.25 : start);
    },
    topbar(context,{load,start}){
      if (load){
        tl.set(sidebar,{yPercent:-100, xPercent: 0, onStart: ()=> sidebar.classList.add('mobile')},start)
        tl.to(sidebar, .5,{yPercent: 0},start)
        tl.to(logo,.25,{xPercent: 0},start + .4)
      } else{
        tl.to(logo,.25,{xPercent: -100},start)
        tl.to(sidebar,.5,{yPercent: -100},start + .15)
        tl.set(sidebar,{yPercent: 0,xPercent: -100, onComplete: ()=> sidebar.classList.remove('mobile')},start + .65)
      }
    },
    navigation(context, { load, start}) {
      tl.staggerTo(topLinks,.5,{ yPercent: load ? 0 : -100 },0.15,start);
    },
    button(context, {load, start}){
      tl.to(button, .25,{xPercent: load ? 0 : 100}, load ? start + .4 : start)
    }
  }
};
