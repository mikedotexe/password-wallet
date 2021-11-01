import "regenerator-runtime/runtime";

import * as nearAPI from "near-api-js"
import getConfig from "./config"


async function initPage() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  console.log('urlParams', urlParams);

  switch (urlParams.get('action')) {
    case 'transfer':
      if (urlParams.has('depositYocto')) {
        await transferYocto(urlParams.get('depositYocto'));
      } else {
        console.warn("Don't understand the URL params, friend.");
      }
      break;
    default:
      console.log("Don't understand the action, friend.");
  }

  // const nearConfig = getConfig(process.env.NODE_ENV || "development");
  // window.near = await nearAPI.connect(Object.assign({ deps: { keyStore: new nearAPI.keyStores.BrowserLocalStorageKeyStore() } }, nearConfig));

}

async function transferYocto(deposit) {
  console.log(`Going to Transfer ${deposit} yoctoNEAR.`);
}

async function nextThing() {

}

window.nearInitPromise = initPage()
  .then(nextThing)
  .catch(console.error);
