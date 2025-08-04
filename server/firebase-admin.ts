// server/lib/firebase-admin.ts
import admin from "firebase-admin";
import serviceAccount from "/Users/harshvardhansingh/Downloads/ConnectSphere/server/config/serviceAccountKey.json";

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
  });
}

export { admin };
