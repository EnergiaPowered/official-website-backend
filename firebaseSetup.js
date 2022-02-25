const firebaseAdmin = require("firebase-admin");
const { v4: uuidv4 } = require("uuid");
const serviceAccount = require("./firebaseCredentials.json");
const admin = firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccount),
});
const storageRef = admin.storage().bucket(`gs://energiaapp-3eaa3.appspot.com`);

module.exports = async function uploadFile(path, filename) {
  // Upload the File
  const storage = await storageRef.upload(path, {
    public: true,
    destination: `/uploads/photos/${filename}`,
    metadata: {
      firebaseStorageDownloadTokens: uuidv4(),
    },
  });

  return storage[0].metadata.mediaLink;
};
