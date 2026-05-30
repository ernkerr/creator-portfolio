"use client";

import { useEffect } from "react";
import { logAscii } from "@/lib/ascii";

export function AsciiBoot() {
  useEffect(() => {
    logAscii();
  }, []);
  return null;
}
