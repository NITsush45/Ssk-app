import admin from "firebase-admin";
import dotenv from "dotenv";

dotenv.config();

const getFirebaseAdmin = () => {
  if (typeof window !== "undefined") {
    throw new Error("Firebase Admin cannot be initialized on the client side");
  }

  if (admin.apps.length > 0) {
    return admin;
  }

  try {
    const credentialsJson = process.env.FIREBASE_ADMIN_CREDENTIALS;
    if (!credentialsJson) {
      throw new Error("FIREBASE_ADMIN_CREDENTIALS environment variable is not set");
    }

    const credentials = JSON.parse(credentialsJson);
    const { project_id, client_email, private_key } = credentials;

    if (!project_id || !client_email || !private_key) {
      throw new Error("Invalid Firebase Admin credentials - missing required fields");
    }

    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: project_id,
        clientEmail: client_email,
        privateKey: private_key.replace(/\\n/g, "\n"),
      }),
      databaseURL: `https://${project_id}.firebaseio.com`,
    });

    console.log("🔥 Firebase Admin initialized successfully");
  } catch (error) {
    console.error("❌ Firebase Admin initialization failed:", error);
    throw new Error("Failed to initialize Firebase Admin");
  }

  return admin;
};

const firebaseAdmin = getFirebaseAdmin();
const adminAuth = firebaseAdmin.auth();
const adminFirestore = firebaseAdmin.firestore();

export { firebaseAdmin, adminAuth, adminFirestore };
