export default async function({ store }) {
  if (!process.browser) return;

  return new Promise((resolve, reject) => {
    store.dispatch("transitionStart").then(() => {
      store.commit("setAnimationHide", "intro");
      resolve();
    });
  });
}
