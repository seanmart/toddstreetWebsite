export default async function({ store }) {
  if (!process.browser) return;
  return new Promise(resolve => {
    store.dispatch("animation/transitionOn").then(() => resolve());
  });
}
