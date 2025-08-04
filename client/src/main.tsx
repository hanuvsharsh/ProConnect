import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

createRoot(document.getElementById("root")!).render(<App />);

import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
import { app } from "@/lib/firebase"; // your Firebase config

const db = getFirestore(app);

// Write test
async function writeTestUser() {
  try {
    await setDoc(doc(db, "users", "demo123"), {
      name: "Demo User",
      email: "demo@example.com",
    });
    console.log("✅ Test user written to Firestore");
  } catch (err) {
    console.error("❌ Write failed:", err);
  }
}

// Read test
async function readTestUser() {
  try {
    const snap = await getDoc(doc(db, "users", "demo123"));
    if (snap.exists()) {
      console.log("✅ Read success:", snap.data());
    } else {
      console.log("⚠️ User not found");
    }
  } catch (err) {
    console.error("❌ Read failed:", err);
  }
}

writeTestUser().then(() => readTestUser());

