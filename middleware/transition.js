export default async function({ store }) {
  if (!process.browser) return;
  await new Promise(resolve => {
    store.commit("showSidebar", false);
    store.commit("showNav", false);
    setTimeout(() => store.commit("showTransition", true), 500);
    setTimeout(() => resolve(), 1000);
  });
}
