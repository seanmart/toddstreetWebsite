import VirtualBuddy from "@/assets/virtualBuddy";
import Vue from "vue";

const vb = new VirtualBuddy()

Object.defineProperty(Vue.prototype, "$vb", {value: vb});

export default vb
