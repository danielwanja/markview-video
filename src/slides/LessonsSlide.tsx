import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  interpolate,
  spring,
  useVideoConfig,
} from "remotion";

const lessons = [
  {
    number: "01",
    title: "Start with vision, iterate with specifics",
    description: "First prompt captures the dream, later prompts fix the details",
    color: "#00d4aa",
  },
  {
    number: "02",
    title: "Don't fear rollbacks",
    description: "Version history is your safety net",
    color: "#a855f7",
  },
  {
    number: "03",
    title: "Be conversational but precise",
    description: '"Nope, still doesn\'t work" — AI understands frustration',
    color: "#f97316",
  },
  {
    number: "04",
    title: "Leverage detailed prompts",
    description: 'Role-playing prompts ("You are a senior developer...") yield better results',
    color: "#3b82f6",
  },
  {
    number: "05",
    title: "Ship early, ship often",
    description: "Multiple publishes refined the product iteratively",
    color: "#00d4aa",
  },
];

const LessonCard: React.FC<{
  number: string;
  title: string;
  description: string;
  color: string;
  index: number;
}> = ({ number, title, description, color, index }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const delay = index * 25;
  const slideIn = spring({
    frame: frame - delay,
    fps,
    config: { damping: 15, stiffness: 80 },
  });

  return (
    <div
      style={{
        transform: `translateY(${interpolate(slideIn, [0, 1], [30, 0])}px)`,
        opacity: Math.max(0, slideIn),
        display: "flex",
        gap: 25,
        alignItems: "flex-start",
        padding: "20px 0",
        borderBottom: "1px solid #222",
      }}
    >
      <span
        style={{
          fontSize: 48,
          fontWeight: 800,
          color: color,
          fontFamily: "'JetBrains Mono', monospace",
          opacity: 0.8,
          minWidth: 80,
        }}
      >
        {number}
      </span>
      <div>
        <h3 style={{ fontSize: 28, color: "#fff", margin: 0, marginBottom: 8 }}>
          {title}
        </h3>
        <p style={{ fontSize: 20, color: "#888", margin: 0 }}>{description}</p>
      </div>
    </div>
  );
};

export const LessonsSlide: React.FC = () => {
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
            display: "flex",
            alignItems: "center",
            gap: 20,
          }}
        >
          <span>📚</span> Key Lessons Learned
        </h2>
      </div>

      {/* Lessons List */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 5,
        }}
      >
        {lessons.map((lesson, index) => (
          <LessonCard key={index} {...lesson} index={index} />
        ))}
      </div>
    </AbsoluteFill>
  );
};

