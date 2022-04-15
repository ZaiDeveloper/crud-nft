export default function ({ req, store, $axios, redirect }) {
  console.log(2);
  if (process.client) {
    console.log(1);
    store.dispatch("contract/setContract");
  }
}
