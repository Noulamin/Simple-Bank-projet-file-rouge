importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js');

firebase.initializeApp({
    messagingSenderId: "881631058788",
    apiKey: "AIzaSyCJr0ETHYw-3JQFmHTkvOGvjtNFDLFW4EE",
    authDomain: "simple-bank-f2b85.firebaseapp.com",
    projectId: "simple-bank-f2b85",
    storageBucket: "simple-bank-f2b85.appspot.com",
    messagingSenderId: "881631058788",
    appId: "1:881631058788:web:52a75769cef281fa753871"
  });

// const messaging = firebase.messaging();

// firebase.messaging().onMessage((payload) => {
//   console.log('Push notification received:', payload);
//   // // Display the notification in the browser
//   // const { title, body } = payload.notification;
//   // new Notification(title, { body });
// });

// firebase.onBackgroundMessage(messaging, (payload) => {
//   console.log('[firebase-messaging-sw.js] Received background message ', payload);
// })