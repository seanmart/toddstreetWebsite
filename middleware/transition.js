export default async function({ store }) {
  if (!process.browser) return;
  return store.dispatch("animation/transitionOn");
}
