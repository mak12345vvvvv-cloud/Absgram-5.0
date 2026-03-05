// firebase-messaging-sw.js
importScripts('https://www.gstatic.com/firebasejs/9.22.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.22.0/firebase-messaging-compat.js');

const firebaseConfig = {
    apiKey: "AIzaSyBRNl0xA5ie8EGcZ4UIdP0e1IJuacoMarE",
    authDomain: "gocklain-bf553.firebaseapp.com",
    projectId: "gocklain-bf553",
    storageBucket: "gocklain-bf553.firebasestorage.app",
    messagingSenderId: "747181228665",
    appId: "1:747181228665:web:bd9dd2cd60b1cd5bb8caa8",
    measurementId: "G-1LBP6KFPL9"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    console.log('Получено фоновое сообщение:', payload);
    
    const notificationTitle = payload.notification.title || 'Новое сообщение';
    const notificationOptions = {
        body: payload.notification.body || '',
        icon: '/firebase-logo.png',
        badge: '/firebase-logo.png',
        data: payload.data
    };

    return self.registration.showNotification(notificationTitle, notificationOptions);
});