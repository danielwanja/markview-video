import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  interpolate,
  spring,
  useVideoConfig,
} from "remotion";

export const OutroSlide: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const mainScale = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 100 },
  });

  const glowPulse = Math.sin(frame * 0.1) * 0.2 + 0.8;

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #0a0a0a 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Animated glow */}
      <div
        style={{
          position: "absolute",
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(0, 212, 170, 0.2) 0%, transparent 70%)",
          opacity: glowPulse,
          filter: "blur(60px)",
        }}
      />

      {/* Main Content */}
      <div
        style={{
          transform: `scale(${Math.max(0, mainScale)})`,
          textAlign: "center",
        }}
      >
        {/* Logo */}
        <h1
          style={{
            fontSize: 100,
            fontWeight: 800,
            color: "#00d4aa",
            margin: 0,
            textShadow: "0 0 60px rgba(0, 212, 170, 0.5)",
          }}
        >
          markview.app
        </h1>

        {/* Call to action */}
        <p
          style={{
            fontSize: 36,
            color: "#888",
            marginTop: 30,
            marginBottom: 40,
          }}
        >
          Try it yourself
        </p>

        {/* Stats row */}
        <div
          style={{
            display: "flex",
            gap: 50,
            justifyContent: "center",
            alignItems: "center",
            marginTop: 20,
          }}
        >
          <div style={{ textAlign: "center" }}>
            <span style={{ fontSize: 48, fontWeight: 700, color: "#00d4aa" }}>108</span>
            <p style={{ fontSize: 18, color: "#666", margin: 0 }}>prompts</p>
          </div>
          <div style={{ width: 2, height: 60, background: "#333" }} />
          <div style={{ textAlign: "center" }}>
            <span style={{ fontSize: 48, fontWeight: 700, color: "#a855f7" }}>75</span>
            <p style={{ fontSize: 18, color: "#666", margin: 0 }}>versions</p>
          </div>
          <div style={{ width: 2, height: 60, background: "#333" }} />
          <div style={{ textAlign: "center" }}>
            <span style={{ fontSize: 48, fontWeight: 700, color: "#3b82f6" }}>1</span>
            <p style={{ fontSize: 18, color: "#666", margin: 0 }}>live app</p>
          </div>
        </div>

        {/* Built with Bolt */}
        <div
          style={{
            marginTop: 60,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 15,
            opacity: 0.7,
          }}
        >
          <span style={{ fontSize: 24, color: "#666" }}>Built with</span>
          <span style={{ fontSize: 30, fontWeight: 800, fontStyle: "italic", color: "#fff" }}>
            bolt
          </span>
          <span style={{ fontSize: 24, color: "#666" }}>.new</span>
        </div>
      </div>
    </AbsoluteFill>
  );
};

