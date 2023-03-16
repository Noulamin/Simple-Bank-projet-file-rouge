// Firebase Cloud Messaging Configuration File. 
// Read more at https://firebase.google.com/docs/cloud-messaging/js/client && https://firebase.google.com/docs/cloud-messaging/js/receive

import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

var firebaseConfig = {
  apiKey: "AIzaSyCJr0ETHYw-3JQFmHTkvOGvjtNFDLFW4EE",
  authDomain: "simple-bank-f2b85.firebaseapp.com",
  projectId: "simple-bank-f2b85",
  storageBucket: "simple-bank-f2b85.appspot.com",
  messagingSenderId: "881631058788",
  appId: "1:881631058788:web:52a75769cef281fa753871"
};

initializeApp(firebaseConfig);

const messaging = getMessaging();

export const requestForToken = () => {
  return getToken(messaging, { vapidKey: `BA0gsmo-elEkfm5BQwknV-5RhsShNJOJlUE4YcRuBLZHpM-2cQvy3xZJD-MCQo4I16SOW0alHNGB0m8R9qA35mI` })
    .then((currentToken) => {
      if (currentToken) {
        console.log('current token for client: ', currentToken);
        // Perform any other neccessary action with the token
      } else {
        // Show permission request UI
        console.log('No registration token available. Request permission to generate one.');
      }
    })
    .catch((err) => {
      console.log('An error occurred while retrieving token. ', err);
    });
};

// Handle incoming messages. Called when:
// - a message is received while the app has focus
// - the user clicks on an app notification created by a service worker `messaging.onBackgroundMessage` handler.
export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });


