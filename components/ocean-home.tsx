"use client";

import { useTheme } from "@/app/context/ThemeContext";
import dynamic from "next/dynamic";

const OceanCanvas = dynamic(() => import("./ocean-canvas"), { ssr: false });

export default function OceanHome({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <>
      <OceanCanvas isDark={isDark} />
      <div className="relative" style={{ zIndex: 1 }}>
        {children}
      </div>
    </>
  );
}
