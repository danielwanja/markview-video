import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  interpolate,
  spring,
  useVideoConfig,
} from "remotion";

export const TitleSlide: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Animations
  const titleY = spring({
    frame,
    fps,
    config: { damping: 15, stiffness: 80 },
  });

  const subtitleOpacity = interpolate(frame, [30, 60], [0, 1], {
    extrapolateRight: "clamp",
  });

  const boltLogoScale = spring({
    frame: frame - 60,
    fps,
    config: { damping: 12, stiffness: 100 },
  });

  const glowOpacity = interpolate(frame, [0, 90], [0, 0.6], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #0a0a0a 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      {/* Animated background glow */}
      <div
        style={{
          position: "absolute",
          width: 800,
          height: 800,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(0, 212, 170, 0.15) 0%, transparent 70%)",
          opacity: glowOpacity,
          filter: "blur(60px)",
        }}
      />

      {/* Main Title */}
      <div
        style={{
          transform: `translateY(${interpolate(titleY, [0, 1], [100, 0])}px)`,
          opacity: titleY,
          textAlign: "center",
        }}
      >
        <h1
          style={{
            fontSize: 140,
            fontWeight: 800,
            color: "#00d4aa",
            letterSpacing: "-0.03em",
            margin: 0,
            textShadow: "0 0 60px rgba(0, 212, 170, 0.5)",
          }}
        >
          markview.app
        </h1>
      </div>

      {/* Subtitle */}
      <div
        style={{
          opacity: subtitleOpacity,
          marginTop: 30,
        }}
      >
        <p
          style={{
            fontSize: 42,
            color: "#a0a0a0",
            fontWeight: 400,
            margin: 0,
          }}
        >
          Built entirely with AI prompts
        </p>
      </div>

      {/* Bolt.new badge */}
      <div
        style={{
          transform: `scale(${Math.max(0, boltLogoScale)})`,
          marginTop: 60,
          display: "flex",
          alignItems: "center",
          gap: 16,
          background: "rgba(255, 255, 255, 0.05)",
          padding: "16px 32px",
          borderRadius: 16,
          border: "1px solid rgba(255, 255, 255, 0.1)",
        }}
      >
        <span style={{ fontSize: 28, color: "#666" }}>Powered by</span>
        <span
          style={{
            fontSize: 36,
            fontWeight: 800,
            fontStyle: "italic",
            color: "#fff",
          }}
        >
          bolt
        </span>
        <span style={{ fontSize: 28, color: "#666" }}>.new</span>
      </div>

      {/* Bottom tagline */}
      <div
        style={{
          position: "absolute",
          bottom: 80,
          opacity: interpolate(frame, [90, 120], [0, 0.6], { extrapolateRight: "clamp" }),
        }}
      >
        <p style={{ fontSize: 24, color: "#555", letterSpacing: "0.2em" }}>
          THE 5-MINUTE JOURNEY
        </p>
      </div>
    </AbsoluteFill>
  );
};

