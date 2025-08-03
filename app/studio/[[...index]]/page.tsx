"use client";

import { useEffect, useState } from "react";

export default function StudioPage() {
  const [StudioComponent, setStudioComponent] =
    useState<React.ComponentType | null>(null);

  useEffect(() => {
    // Only load everything on the client side
    const loadStudio = async () => {
      try {
        const [{ Studio }, config] = await Promise.all([
          import("sanity"),
          import("@/sanity.config"),
        ]);

        const StudioWithConfig = () => <Studio config={config.default} />;
        setStudioComponent(() => StudioWithConfig);
      } catch (error) {
        console.error("Failed to load Sanity Studio:", error);
      }
    };

    loadStudio();
  }, []);

  if (!StudioComponent) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          fontSize: "18px",
          fontFamily: "system-ui, sans-serif",
          background: "#f1f3f4",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div style={{ marginBottom: "10px" }}>🎨</div>
          Loading Sanity Studio...
        </div>
      </div>
    );
  }

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <StudioComponent />
    </div>
  );
}
