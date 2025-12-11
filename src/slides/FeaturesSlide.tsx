import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  interpolate,
  spring,
  useVideoConfig,
} from "remotion";

const features = [
  { icon: "📄", name: "Markdown → Presentation", color: "#00d4aa" },
  { icon: "🖥️", name: "Terminal-style UI", color: "#a855f7" },
  { icon: "⌨️", name: "Full Keyboard Navigation", color: "#3b82f6" },
  { icon: "🎨", name: "Dark/Light/Blue Themes", color: "#f97316" },
  { icon: "✨", name: "VS Code Syntax Highlighting", color: "#00d4aa" },
  { icon: "📊", name: "Grid View Overview", color: "#a855f7" },
  { icon: "📁", name: "Drag & Drop Files/Folders/ZIPs", color: "#3b82f6" },
  { icon: "🖼️", name: "Image Support", color: "#f97316" },
  { icon: "📑", name: "PDF Export", color: "#00d4aa" },
  { icon: "🤖", name: "AI-Powered Creation", color: "#a855f7" },
  { icon: "🔒", name: "100% Client-side (Privacy)", color: "#3b82f6" },
  { icon: "📡", name: "Works Offline", color: "#f97316" },
];

const FeatureItem: React.FC<{
  icon: string;
  name: string;
  color: string;
  index: number;
}> = ({ icon, name, color, index }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const delay = index * 8;
  const slideIn = spring({
    frame: frame - delay,
    fps,
    config: { damping: 15, stiffness: 100 },
  });

  const checkOpacity = interpolate(frame - delay - 15, [0, 10], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  return (
    <div
      style={{
        transform: `translateX(${interpolate(slideIn, [0, 1], [-50, 0])}px)`,
        opacity: Math.max(0, slideIn),
        display: "flex",
        alignItems: "center",
        gap: 20,
        padding: "18px 25px",
        background: "rgba(255, 255, 255, 0.02)",
        borderRadius: 12,
        border: `1px solid ${color}22`,
      }}
    >
      <span style={{ fontSize: 32 }}>{icon}</span>
      <span style={{ fontSize: 22, color: "#e5e5e5", flex: 1 }}>{name}</span>
      <span
        style={{
          fontSize: 28,
          color: color,
          opacity: checkOpacity,
        }}
      >
        ✓
      </span>
    </div>
  );
};

export const FeaturesSlide: React.FC = () => {
  const frame = useCurrentFrame();

  const titleOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Privacy highlight
  const privacyHighlight = interpolate(frame, [600, 700], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(180deg, #0a0a0a 0%, #0d1117 100%)",
        display: "flex",
        flexDirection: "column",
        padding: 80,
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: 50 }}>
        <h2
          style={{
            fontSize: 56,
            color: "#fff",
            fontWeight: 700,
            opacity: titleOpacity,
            margin: 0,
          }}
        >
          Major Features Delivered
        </h2>
        <p
          style={{
            fontSize: 28,
            color: "#666",
            marginTop: 15,
            opacity: titleOpacity,
          }}
        >
          Each one built through natural language prompts
        </p>
      </div>

      {/* Features Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 15,
          flex: 1,
        }}
      >
        {features.map((feature, index) => (
          <FeatureItem key={index} {...feature} index={index} />
        ))}
      </div>

      {/* Privacy Architecture Highlight */}
      <div
        style={{
          marginTop: 40,
          opacity: privacyHighlight,
          background: "linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(168, 85, 247, 0.1) 100%)",
          borderRadius: 16,
          border: "1px solid rgba(59, 130, 246, 0.3)",
          padding: 30,
        }}
      >
        <h4 style={{ fontSize: 24, color: "#3b82f6", margin: 0, marginBottom: 10 }}>
          🏗️ Major Architecture Shift
        </h4>
        <p style={{ fontSize: 20, color: "#a0a0a0", margin: 0 }}>
          One detailed prompt transformed the entire backend to run{" "}
          <span style={{ color: "#a855f7", fontWeight: 600 }}>100% client-side</span>.
          Your data never leaves your browser.
        </p>
      </div>
    </AbsoluteFill>
  );
};

