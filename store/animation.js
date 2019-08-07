import { TimelineMax, TweenLite } from "gsap";
let $cover, $sidebar, $logo, $topLinks, $sideLinks, $sideNav, $button;

export default {
  actions: {
    mobile({rootState, commit}, mobile){
      commit("mobile", mobile, {root: true});
      if (!rootState.transitioning){
        let tl = new TimelineMax();
        mobile && mobileOn(rootState,tl)
        !mobile && mobileOff(rootState,tl)
      }
    },
    scrolled({ rootState, commit }, scrolled) {
      commit("scrolled", scrolled, {root: true});
      if (!rootState.mobile){
        let tl = new TimelineMax();
        scrolled && scrolledOn(rootState,tl)
        !scrolled && scrolledOff(rootState,tl)
      }
    },
    menu({ rootState, commit }, menu) {
      commit("menu", menu, {root: true});
      return new Promise(resolve => {
        let tl = new TimelineMax({ onComplete: () => resolve() });
        menu && menuOpen(rootState, tl)
        !menu && menuClose(rootState, tl)
      });
    },
    transitionOn({rootState,commit}){
      return new Promise(resolve => {
        let tl = new TimelineMax();
        commit("transitioning", true, {root: true})
        tl.eventCallback("onComplete", ()=> resolve())
        rootState.mobile && transitionOutMobile(rootState, tl)
        !rootState.mobile && transitionOut(rootState, tl)
      });
    },
    transitionOff({rootState,commit}){
      return new Promise(resolve => {
        let tl = new TimelineMax();
        commit("scrolled", false, {root: true});
        rootState.mobile && transitionInMobile(rootState, tl)
        !rootState.mobile && transitionIn(rootState, tl)
        tl.eventCallback("onComplete", ()=> {
          commit("transitioning", false, {root: true})
          resolve()
        })
      });
    },
    init({ rootState, dispatch}) {
      $cover = document.getElementById("cover");
      $sidebar = document.getElementById("sidebar");
      $logo = document.getElementById("logo");
      $topLinks = document.getElementsByClassName("top-link");
      $button = document.getElementById("menu-button");
      $sideLinks = document.getElementsByClassName("side-link");
      $sideNav = document.getElementById("side-nav");

      let tl = new TimelineMax();
      hide(rootState,tl)
    },
  }
};

// grouped component animations -------------------------------------------

function transitionInMobile(state,tl){
  cover({ start: 0, load: false, tl });
  topbar({ start: 0.5, load: true, tl });
  logoMobile({ start: 0.75, load: true, tl });
  button({ start: 0.75, load: true, tl });
}

function transitionOutMobile(state,tl){
  logoMobile({ start: 0, load: false, tl });
  button({ start: 0, load: false, tl });
  topbar({ start: 0.25, load: false, tl });
  cover({ start: 1, load: true, tl });
}

function transitionIn(state,tl){
  cover({ start: 0, load: false, tl });
  sidebar({ start: 0.5, load: true, tl });
  logo({ start: 0.75, load: true, tl });
  state.scrolled && button({ start: 0.75, load: true, tl });
  topNav({ start: 0.75, load: true, tl });
}

function transitionOut(state,tl){
  topNav({ start: 0, load: false, tl });
  button({ start: 0, load: false, tl });
  logo({ start: 0, load: false, tl });
  sidebar({ start: 0.25, load: false, tl });
  cover({ start: 1, load: true, tl });
}

function mobileOn(state,tl){
  topNav({ start: 0, load: false, tl });
  button({ start: 0, load: false, tl });
  logo({ start: 0, load: false, tl });
  sidebar({ start: 0.25, load: false, tl });
  topbar({ start: 0.75, load: true, tl });
  button({ start: 1, load: true, tl });
  logoMobile({ start: 1, load: true, tl });
}

function mobileOff(state,tl){
  logoMobile({ start: 0, load: false, tl });
  button({ start: 0, load: false, tl });
  topbar({ start: 0.25, load: false, tl });
  sidebar({ start: 0.75, load: true, tl });
  logo({ start: 1, load: true, tl });
  button({ start: 1, load: state.scrolled, tl });
  topNav({ start: 1, load: !state.scrolled, tl });
}

function menuOpen(state,tl){
  sideNav({ start: 0, load: true, tl });
  sideLinks({ start: 0.3, load: true, tl });
}

function menuClose(state,tl){
  sideLinks({ start: 0, load: false, tl });
  sideNav({ start: 0.7, load: false, tl });
}

function scrolledOn(state,tl){
  if (state.mobile) return
  button({ start: 0, load: true, tl });
}

function scrolledOff(state,tl){
  button({ start: 0, load: false, tl });
}


// component animations ---------------------------------------------------

function hide(state, tl){
  tl.set($sideNav, { xPercent: -100 });
  tl.set($sideLinks, { xPercent: -100 });
  tl.set($sidebar, { xPercent: -100 });
  tl.set($logo, { xPercent: state.mobile ? 100 : -100 });
  tl.set($topLinks, { yPercent: -100 });
  tl.set($button, { xPercent: -100 });
}

function cover({ load, start, tl }) {
  tl.set($cover, { yPercent: load ? 100 : 0 }, 0);
  tl.to($cover, 0.5, { yPercent: load ? 0 : -100, ease: Power1.easeIn }, start);
}

function sidebar({ load, start, tl }) {
  tl.to($sidebar, 0.5, { xPercent: load ? 0 : -100 }, start);
}

function topbar({ load, start, tl }) {
  if (load) {
    tl.set($sidebar,{yPercent: -100,xPercent: 0,onStart: () => $sidebar.classList.add("mobile")},start);
    tl.to($sidebar, 0.5, { yPercent: 0 }, start);
  } else {
    tl.to($sidebar, 0.5, { yPercent: -100 }, start);
    tl.set($sidebar,{yPercent: 0,xPercent: -100,onComplete: () => $sidebar.classList.remove("mobile")},start + 0.5);
  }
}

function topNav({ load, start, tl }) {
  tl.staggerTo($topLinks,0.5,{yPercent: load ? 0 : -100,ease: load ? Power4.easeOut : Power4.easeIn},0.1,start);
}

function logo({ load, start, tl }) {
  load && tl.set($logo, { xPercent: -100 }, start);
  tl.to($logo, 0.35, { xPercent: load ? 0 : -100 }, start);
}

function logoMobile({ load, start, tl }) {
  load && tl.set($logo, { xPercent: 100 }, start);
  tl.to($logo, 0.35, { xPercent: load ? 0 : 100 }, start);
}

function button({ load, start, tl }) {
  tl.to($button, 0.35, { xPercent: load ? 0 : -100 }, start);
}

function sideNav({ load, start, tl }) {
  tl.to($sideNav, 0.5, { xPercent: load ? 0 : -100 }, start);
}

function sideLinks({ load, start, tl }) {
  tl.staggerTo($sideLinks,0.5,{xPercent: load ? 0 : -150,ease: load ? Power4.easeOut : Power4.easeIn},0.1,start);
}
