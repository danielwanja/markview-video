import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  interpolate,
  spring,
  useVideoConfig,
} from "remotion";

const DifficultyCard: React.FC<{
  icon: string;
  title: string;
  description: string;
  quote?: string;
  delay: number;
}> = ({ icon, title, description, quote, delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = spring({
    frame: frame - delay,
    fps,
    config: { damping: 12, stiffness: 80 },
  });

  const shake = interpolate(
    Math.sin((frame - delay) * 0.5),
    [-1, 1],
    [-2, 2]
  );

  return (
    <div
      style={{
        transform: `scale(${Math.max(0, scale)}) translateX(${frame - delay < 20 ? shake : 0}px)`,
        background: "rgba(249, 115, 22, 0.05)",
        borderRadius: 20,
        border: "1px solid rgba(249, 115, 22, 0.2)",
        padding: 35,
        flex: 1,
        minWidth: 380,
      }}
    >
      <div style={{ fontSize: 50, marginBottom: 20 }}>{icon}</div>
      <h3 style={{ fontSize: 28, color: "#f97316", margin: 0, marginBottom: 15 }}>
        {title}
      </h3>
      <p style={{ fontSize: 20, color: "#a0a0a0", margin: 0, lineHeight: 1.5 }}>
        {description}
      </p>
      {quote && (
        <div
          style={{
            marginTop: 20,
            padding: 15,
            background: "rgba(0, 0, 0, 0.3)",
            borderRadius: 10,
            borderLeft: "3px solid #f97316",
          }}
        >
          <p
            style={{
              fontSize: 18,
              color: "#e5e5e5",
              margin: 0,
              fontFamily: "'JetBrains Mono', monospace",
              fontStyle: "italic",
            }}
          >
            "{quote}"
          </p>
        </div>
      )}
    </div>
  );
};

export const DifficultiesSlide: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: "clamp",
  });

  const lessons = interpolate(frame, [800, 900], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(135deg, #0a0a0a 0%, #1a0a0a 50%, #0a0a0a 100%)",
        display: "flex",
        flexDirection: "column",
        padding: 80,
      }}
    >
      {/* Warning glow */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 1000,
          height: 600,
          background: "radial-gradient(ellipse, rgba(249, 115, 22, 0.08) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* Header */}
      <div style={{ marginBottom: 60 }}>
        <h2
          style={{
            fontSize: 56,
            color: "#f97316",
            fontWeight: 700,
            opacity: titleOpacity,
            margin: 0,
            display: "flex",
            alignItems: "center",
            gap: 20,
          }}
        >
          <span>⚠️</span> The Difficulties
        </h2>
        <p
          style={{
            fontSize: 28,
            color: "#888",
            marginTop: 15,
            opacity: titleOpacity,
          }}
        >
          Because it wasn't all smooth sailing
        </p>
      </div>

      {/* Difficulty Cards */}
      <div
        style={{
          display: "flex",
          gap: 30,
          marginBottom: 50,
          flexWrap: "wrap",
        }}
      >
        <DifficultyCard
          icon="❌"
          title="When It Just Didn't Work"
          description="Sometimes the AI needed multiple attempts to get things right."
          quote="Nope, still doesn't work"
          delay={30}
        />
        <DifficultyCard
          icon="🔄"
          title="The Rollbacks"
          description="3 times I had to restore to a previous version when changes broke existing features."
          delay={90}
        />
        <DifficultyCard
          icon="🐛"
          title="Persistent Bugs"
          description="Line spacing issues required multiple fix iterations before getting it right."
          delay={150}
        />
      </div>

      {/* Key Lesson */}
      <div
        style={{
          opacity: lessons,
          background: "rgba(0, 212, 170, 0.05)",
          borderRadius: 16,
          border: "1px solid rgba(0, 212, 170, 0.2)",
          padding: 30,
          marginTop: "auto",
        }}
      >
        <h4 style={{ fontSize: 24, color: "#00d4aa", margin: 0, marginBottom: 15 }}>
          💡 The Takeaway
        </h4>
        <p style={{ fontSize: 22, color: "#e5e5e5", margin: 0, lineHeight: 1.6 }}>
          Each failure taught Bolt more context. The AI learned from its mistakes.
          Version history is your friend — don't fear the rollback.
        </p>
      </div>
    </AbsoluteFill>
  );
};

