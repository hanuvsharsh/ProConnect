import admin from "firebase-admin";

const serviceAccountJSON = Buffer.from(
  process.env.FIREBASE_KEY_BASE64!,
  "base64"
).toString("utf-8");

const serviceAccount = JSON.parse(serviceAccountJSON);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
export { admin };

