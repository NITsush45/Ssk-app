import pool from "@/lib/db";
import { adminAuth } from "@/lib/firebase-admin";

export async function POST(req) {
  try {
    const { name, email, phone, password, organization, photo } =
      await req.json();

    // Enhanced validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      throw new Error("Invalid email format");
    }
    if (!password || password.length < 8) {
      throw new Error("Password must be at least 8 characters");
    }

    // Create Firebase user
    const userRecord = await adminAuth.createUser({
      email,
      password,
      displayName: name,
      disabled: false,
    });

    const firebaseUid = userRecord.uid;

    // Database insertion
    const client = await pool.connect();
    try {
      await client.query(
        `INSERT INTO users 
   (firebase_uid, name, email, phone, organization, photo) 
   VALUES ($1, $2, $3, $4, $5, $6)`,
        [
          firebaseUid,
          name,
          email,
          phone || null,
          organization || null,
          photo || null,
        ]
      );
    } catch (dbError) {
      await adminAuth.deleteUser(firebaseUid);
      throw new Error(`Database error: ${dbError.message}`);
    } finally {
      client.release();
    }

    // Generate custom token
    const customToken = await adminAuth.createCustomToken(firebaseUid);

    return new Response(
      JSON.stringify({
        success: true,
        token: customToken,
        uid: firebaseUid,
      }),
      {
        status: 201,
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-store",
        },
      }
    );
  } catch (error) {
    console.error("Signup error:", error);
    const statusCode = error.code === "auth/email-already-exists" ? 409 : 400;
    return new Response(
      JSON.stringify({
        success: false,
        message: error.message.replace(/firebase-admin.*/gi, ""),
      }),
      {
        status: statusCode,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
