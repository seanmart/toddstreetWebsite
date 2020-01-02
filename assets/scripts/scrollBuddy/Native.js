import Core from "./Core";

export default class extends Core {
  constructor(options = {}) {
    super(options);
  }
  init() {
    this.body.style.cssText.replace(";overflow: hidden; height: 100vh;", "");
    window.addEventListener("scroll", () => {
      if (!this.isTicking) {
        requestAnimationFrame(this.checkScroll)
        this.isTicking = true;
      }
      this.updateScroll();
    });
  }

  updateScroll() {
    this.instance.scroll.y = window.scrollY;
    this.instance.scroll.x = window.scrollX;
  }

  checkScroll() {
    this.checkSections()
    this.transformElements();
    this.updateScrollEvents()
    this.isTicking = false
  }

}
