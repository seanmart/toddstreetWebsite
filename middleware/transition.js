export default async function({ store }) {
  if (!process.browser) return;
  return new Promise(resolve => {
    if (store.state.menu) {
      store.dispatch("animation/menu", false);
    }
    store.dispatch("animation/transitionOn").then(() => resolve());
  });
}
