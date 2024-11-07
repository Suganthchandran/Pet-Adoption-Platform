// server/firebase.js
const admin = require('firebase-admin');
const serviceAccount = require('./pet-adoption-platform-ca0c3-firebase-adminsdk-65lpy-0cefd51275.json'); // Path to Firebase service account key

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;
