"use client";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { auth } from "@/lib/firebase-config";
import { onAuthStateChanged, signOut } from "firebase/auth";

export default function AuthGuard({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      setUser(authUser);
      setLoading(false);

      const publicPaths = ["/signup", "/login"];
      const isPublicPath = publicPaths.includes(pathname);

      if (!authUser && !isPublicPath) {
        router.replace("/signup");
      } else if (authUser && isPublicPath) {
        router.replace("/");
      }
    });

    return () => unsubscribe();
  }, [pathname, router]);

  useEffect(() => {
    let logoutTimer;
    if (user) {
      logoutTimer = setTimeout(() => {
        signOut(auth).then(() => router.replace("/signup"));
      }, 600000); // 10 minutes
    }

    return () => {
      if (logoutTimer) clearTimeout(logoutTimer);
    };
  }, [user, router]);

  if (loading) {
    return <div>Loading authentication state...</div>;
  }

  return children;
}
