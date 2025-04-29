"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function RedirectToSignup() {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("userToken");

    if (!isAuthenticated && pathname === "/") {
      router.replace("/signup"); // Redirect to /signup if user is not authenticated
    }
  }, [pathname, router]);

  return null;
}
