import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  interpolate,
  spring,
  useVideoConfig,
} from "remotion";

export const PublishSlide: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const terminalScale = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 80 },
  });

  // Typing "Publish this application."
  const command = "Publish this application.";
  const charsToShow = Math.floor(interpolate(frame, [30, 120], [0, command.length], {
    extrapolateRight: "clamp",
  }));
  const displayedCommand = command.slice(0, charsToShow);

  // Response appears after command is typed
  const responseOpacity = interpolate(frame, [150, 180], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Success animation
  const successScale = spring({
    frame: frame - 200,
    fps,
    config: { damping: 10, stiffness: 100 },
  });

  const confettiOpacity = interpolate(frame, [250, 350], [1, 0], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  const cursorOpacity = Math.sin(frame * 0.3) > 0 ? 1 : 0;

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(135deg, #0a0a0a 0%, #0a1a0a 50%, #0a0a0a 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 80,
      }}
    >
      {/* Success glow */}
      <div
        style={{
          position: "absolute",
          width: 800,
          height: 800,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(0, 212, 170, 0.15) 0%, transparent 70%)",
          opacity: responseOpacity,
          filter: "blur(80px)",
        }}
      />

      {/* Confetti particles */}
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            width: 12,
            height: 12,
            borderRadius: i % 2 === 0 ? "50%" : 0,
            background: ["#00d4aa", "#a855f7", "#f97316", "#3b82f6"][i % 4],
            left: `${10 + (i * 4) % 80}%`,
            top: `${20 + Math.sin(i) * 30}%`,
            transform: `translateY(${frame - 250}px) rotate(${frame * 3 + i * 30}deg)`,
            opacity: confettiOpacity * (i % 3 === 0 ? 1 : 0.6),
          }}
        />
      ))}

      {/* Header */}
      <h2
        style={{
          fontSize: 48,
          color: "#00d4aa",
          fontWeight: 600,
          marginBottom: 50,
          opacity: interpolate(terminalScale, [0, 1], [0, 1]),
        }}
      >
        The Publish Moment
      </h2>

      {/* Terminal */}
      <div
        style={{
          transform: `scale(${Math.max(0, terminalScale)})`,
          width: "100%",
          maxWidth: 1000,
          background: "#1e1e1e",
          borderRadius: 16,
          border: "1px solid #333",
          overflow: "hidden",
          boxShadow: "0 20px 60px rgba(0, 0, 0, 0.5)",
        }}
      >
        {/* Terminal Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: "14px 20px",
            background: "#2d2d2d",
            borderBottom: "1px solid #333",
          }}
        >
          <div style={{ width: 14, height: 14, borderRadius: "50%", background: "#ff5f57" }} />
          <div style={{ width: 14, height: 14, borderRadius: "50%", background: "#febc2e" }} />
          <div style={{ width: 14, height: 14, borderRadius: "50%", background: "#28c840" }} />
        </div>

        {/* Terminal Content */}
        <div style={{ padding: 40 }}>
          {/* Command */}
          <div style={{ marginBottom: 30 }}>
            <span style={{ color: "#00d4aa", fontSize: 28 }}>❯ </span>
            <span
              style={{
                fontSize: 28,
                color: "#e5e5e5",
                fontFamily: "'JetBrains Mono', monospace",
              }}
            >
              {displayedCommand}
              {charsToShow < command.length && (
                <span style={{ opacity: cursorOpacity, background: "#00d4aa" }}> </span>
              )}
            </span>
          </div>

          {/* Response */}
          <div style={{ opacity: responseOpacity }}>
            <p style={{ fontSize: 24, color: "#888", margin: 0, marginBottom: 15 }}>
              Your site has been successfully published!
            </p>
            <p style={{ fontSize: 28, color: "#e5e5e5", margin: 0 }}>
              You can view it at:{" "}
              <span
                style={{
                  color: "#00d4aa",
                  textDecoration: "underline",
                  fontWeight: 600,
                }}
              >
                https://markview.app
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Success badge */}
      <div
        style={{
          transform: `scale(${Math.max(0, successScale)})`,
          marginTop: 50,
          display: "flex",
          alignItems: "center",
          gap: 20,
          background: "rgba(0, 212, 170, 0.1)",
          padding: "20px 40px",
          borderRadius: 16,
          border: "2px solid rgba(0, 212, 170, 0.4)",
        }}
      >
        <span style={{ fontSize: 50 }}>🚀</span>
        <div>
          <p style={{ fontSize: 28, color: "#00d4aa", margin: 0, fontWeight: 700 }}>
            Version 75 • LIVE
          </p>
          <p style={{ fontSize: 20, color: "#888", margin: 0, marginTop: 5 }}>
            One line to production
          </p>
        </div>
      </div>
    </AbsoluteFill>
  );
};

