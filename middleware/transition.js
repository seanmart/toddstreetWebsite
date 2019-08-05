export default async function({ store }) {
  if (!process.browser) return;
  return new Promise(resolve => {
    store.commit('ready', false)
    store.dispatch("animation/transition", "out").then(() => resolve());
  });
}
