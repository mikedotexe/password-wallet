import "regenerator-runtime/runtime";

import * as nearAPI from "near-api-js"
import getConfig from "./config"

// window.addEventListener( "load", function () {
//   function sendData() {
//     const XHR = new XMLHttpRequest();
//
//     // Bind the FormData object and the form element
//     const FD = new FormData( form );
//
//     // Define what happens on successful data submission
//     XHR.addEventListener( "load", function(event) {
//       alert( event.target.responseText );
//     } );
//
//     // Define what happens in case of error
//     XHR.addEventListener( "error", function( event ) {
//       console.log('aloha error event', event);
//       alert( 'Oops! Something went wrong.' );
//     } );
//
//     // Set up our request
//     XHR.open( "POST", "http://localhost:3191/new-account" );
//
//     // The data sent is what the user provided in the form
//     XHR.send( FD );
//   }
//
//   // Access the form element...
//   const form = document.getElementById( "login" );
//
//   // ...and take over its submit event.
//   form.addEventListener( "submit", function ( event ) {
//     event.preventDefault();
//
//     sendData();
//   } );
// } );

// Example POST method implementation:
async function postData(url = '', data = {}) {
  console.log('data', data);
  // Default options are marked with *
  const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'include', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });
  return response;
}



// Set up basic JS events
const plainUsername = document.getElementById('plain-username');
const publicKey = document.getElementById('public-key');
const username = document.getElementById('username');
const privateKey = document.getElementById('password');
const submitButton = document.getElementById('submit-new');
const loginForm = document.getElementById('login');

plainUsername.addEventListener('input', updatePlainUsername);
// publicKey.addEventListener('input', updatePublicKey);
// username.addEventListener('input', updateUsername);
privateKey.addEventListener('input', updatePrivateKey);
// submitButton.addEventListener('click', submitNew);
loginForm.addEventListener('submit', submitForm);

function updatePlainUsername(e) {
  username.value = `${e.target.value}:${derivePublicKey()}`;
}

// function updatePublicKey(e) {
//
// }

// function updateUsername(e) {
//
// }

function updatePrivateKey(e) {
  publicKey.innerText = derivePublicKey();
}

function derivePublicKey() {
  return nearAPI.KeyPair.fromString(privateKey.value).getPublicKey();
}

// function updateValue(e) {
//   log.textContent = e.target.value;
// }

function submitForm(e) {
  console.log('aloha submitForm e', e);
  e.preventDefault();

  fetch('https://zen-euler-424ea3.netlify.app/.netlify/functions/server/new-account', {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'include', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    // body: JSON.stringify({ "username": "42" }) // body data type must match "Content-Type" header
    body: JSON.stringify(new FormData(e.target)),
  }).then(res => {
    if (res.status === 200) {
      return Promise.resolve();
    } else {
      return Promise.reject('Sign-in failed');
    }
      // console.log(data); // JSON data parsed by `data.json()` call
    })
    .then(profile => {

      // Instantiate PasswordCredential with the form
      if (window.PasswordCredential) {
        console.log('aloha 0');
        var c = new PasswordCredential(e.target);
        return navigator.credentials.store(c);
      } else {
        console.log('aloha 1');
        return Promise.resolve(profile);
      }
    }).then(profile => {
      console.log('aloha profile', profile);

      // Successful sign-in
      if (profile) {
        console.log('profile', profile);
      }
      history.replaceState({submitted: true}, "New account added", "?submitted=true")
      // window.location.href = 'https://pww.mike.test/index.html';
  }).catch(error => {

    // Sign-in failed
    console.warn('Sign-in Failed', error);
  });
}

function submitNew(e) {
  // history.pushState({submitted: true}, "NEAR account added", "?submitted=true")
  history.replaceState({submitted: true}, "NEAR account added", "?submitted=true")
}

