import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  interpolate,
  spring,
  useVideoConfig,
} from "remotion";

const StatBox: React.FC<{
  value: string;
  label: string;
  delay: number;
  color: string;
}> = ({ value, label, delay, color }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = spring({
    frame: frame - delay,
    fps,
    config: { damping: 12, stiffness: 100 },
  });

  const counterValue = interpolate(
    frame - delay,
    [0, 45],
    [0, parseInt(value) || 0],
    { extrapolateRight: "clamp" }
  );

  return (
    <div
      style={{
        transform: `scale(${Math.max(0, scale)})`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "40px 60px",
        background: "rgba(255, 255, 255, 0.03)",
        borderRadius: 24,
        border: `2px solid ${color}33`,
        minWidth: 280,
      }}
    >
      <span
        style={{
          fontSize: 120,
          fontWeight: 800,
          color: color,
          fontFamily: "'JetBrains Mono', monospace",
          textShadow: `0 0 40px ${color}66`,
        }}
      >
        {Math.round(counterValue)}
      </span>
      <span
        style={{
          fontSize: 28,
          color: "#888",
          textTransform: "uppercase",
          letterSpacing: "0.15em",
          marginTop: 10,
        }}
      >
        {label}
      </span>
    </div>
  );
};

export const StatsSlide: React.FC = () => {
  const frame = useCurrentFrame();

  const titleOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(180deg, #0a0a0a 0%, #111 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 60,
      }}
    >
      {/* Section Title */}
      <h2
        style={{
          fontSize: 56,
          color: "#fff",
          fontWeight: 600,
          opacity: titleOpacity,
          marginBottom: 20,
        }}
      >
        The Numbers
      </h2>

      {/* Stats Row */}
      <div
        style={{
          display: "flex",
          gap: 50,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <StatBox value="108" label="Prompts" delay={15} color="#00d4aa" />
        <StatBox value="75" label="Versions" delay={30} color="#a855f7" />
        <StatBox value="3" label="Rollbacks" delay={45} color="#f97316" />
        <StatBox value="1" label="Live App" delay={60} color="#3b82f6" />
      </div>

      {/* Subtitle */}
      <p
        style={{
          fontSize: 32,
          color: "#666",
          marginTop: 40,
          opacity: interpolate(frame, [90, 120], [0, 1], { extrapolateRight: "clamp" }),
        }}
      >
        All in a single Bolt.new session
      </p>
    </AbsoluteFill>
  );
};

