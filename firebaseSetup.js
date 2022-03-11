const firebaseAdmin = require("firebase-admin");
const { v4: uuidv4 } = require("uuid");
const serviceAccount = require("./firebaseCredentials.json");
const admin = firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccount),
});
const db = admin.firestore();
exports.db = db;
