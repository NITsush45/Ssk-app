import pool from "@/lib/db";
import { adminAuth } from "@/lib/firebase-admin";

export async function POST(req) {
  try {
    // Extract the token from the Authorization header
    const authHeader = req.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return new Response(
        JSON.stringify({ success: false, message: "Missing or invalid authorization token" }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }

    const idToken = authHeader.split(" ")[1];
    if (!idToken || typeof idToken !== "string") {
      return new Response(
        JSON.stringify({ success: false, message: "Invalid token format" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Verify the token with Firebase Admin SDK
    const decodedToken = await adminAuth.verifyIdToken(idToken);
    const firebaseUid = decodedToken.uid;

    // Fetch the user from the database
    const client = await pool.connect();
    try {
      const result = await client.query(
        `SELECT * FROM users WHERE firebase_uid = $1`,
        [firebaseUid]
      );

      if (result.rowCount === 0) {
        return new Response(
          JSON.stringify({ success: false, message: "User not found in database" }),
          { status: 404, headers: { "Content-Type": "application/json" } }
        );
      }

      // Update last login timestamp
      await client.query(
        `UPDATE users SET last_login = NOW() WHERE firebase_uid = $1`,
        [firebaseUid]
      );

      return new Response(
        JSON.stringify({ success: true, user: result.rows[0] }),
        { status: 200, headers: { "Content-Type": "application/json", "Cache-Control": "no-store" } }
      );
    } finally {
      client.release();
    }
  } catch (error) {
    console.error("Login error:", error);
    return new Response(
      JSON.stringify({ success: false, message: error.message.includes("Firebase ID token") ? "Invalid authentication" : error.message }),
      { status: 401, headers: { "Content-Type": "application/json" } }
    );
  }
}
