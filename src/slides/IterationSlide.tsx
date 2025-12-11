import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  interpolate,
  spring,
  useVideoConfig,
} from "remotion";

const PromptCard: React.FC<{
  title: string;
  prompt: string;
  response: string;
  delay: number;
  color: string;
}> = ({ title, prompt, response, delay, color }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const slideIn = spring({
    frame: frame - delay,
    fps,
    config: { damping: 15, stiffness: 80 },
  });

  return (
    <div
      style={{
        transform: `translateX(${interpolate(slideIn, [0, 1], [100, 0])}px)`,
        opacity: Math.max(0, slideIn),
        background: "rgba(255, 255, 255, 0.02)",
        borderRadius: 16,
        border: `1px solid ${color}44`,
        padding: 30,
        width: "100%",
        borderLeft: `4px solid ${color}`,
      }}
    >
      <h4 style={{ fontSize: 24, color: color, margin: 0, marginBottom: 15 }}>
        {title}
      </h4>
      <p
        style={{
          fontSize: 20,
          color: "#e5e5e5",
          margin: 0,
          marginBottom: 15,
          fontFamily: "'JetBrains Mono', monospace",
          background: "rgba(0, 0, 0, 0.3)",
          padding: 15,
          borderRadius: 8,
        }}
      >
        "{prompt}"
      </p>
      <p style={{ fontSize: 18, color: "#888", margin: 0 }}>
        → {response}
      </p>
    </div>
  );
};

export const IterationSlide: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Phase indicator
  const phaseIndex = Math.floor(interpolate(frame, [0, 1800], [0, 3], {
    extrapolateRight: "clamp",
  }));

  const phases = [
    {
      title: "Syntax Highlighting",
      cards: [
        {
          title: "The Request",
          prompt: "Create a code viewer that supports syntax highlighting with colors",
          response: "Added highlight.js with multi-language support",
          color: "#00d4aa",
        },
        {
          title: "The Refinement",
          prompt: "Make it look like VS Code dark theme. The green isn't very readable.",
          response: "Updated to VS Code Dark+ color palette",
          color: "#a855f7",
        },
      ],
    },
    {
      title: "Fixing Issues",
      cards: [
        {
          title: "The Bug",
          prompt: "There is still extra space between each line, like you're adding an extra line",
          response: "Fixed line-height and removed extra whitespace",
          color: "#f97316",
        },
        {
          title: "More Polish",
          prompt: "Include line numbers if displaying multi-line code blocks",
          response: "Added line numbers with proper alignment",
          color: "#3b82f6",
        },
      ],
    },
    {
      title: "Grid View Feature",
      cards: [
        {
          title: "Major Feature",
          prompt: "Display all pages in a grid layout with keyboard navigation",
          response: "Built thumbnail grid with arrow keys, Enter, and Escape",
          color: "#00d4aa",
        },
        {
          title: "State Management",
          prompt: "Remember the last highlighted position when reopening the grid",
          response: "Added persistent state for grid selection",
          color: "#a855f7",
        },
      ],
    },
  ];

  const currentPhase = phases[Math.min(phaseIndex, phases.length - 1)];

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
      <div style={{ marginBottom: 40 }}>
        <h2
          style={{
            fontSize: 48,
            color: "#fff",
            fontWeight: 600,
            opacity: titleOpacity,
            margin: 0,
          }}
        >
          The Iteration Phase
        </h2>
        <p
          style={{
            fontSize: 28,
            color: "#666",
            marginTop: 10,
            opacity: titleOpacity,
          }}
        >
          Refining through conversation
        </p>
      </div>

      {/* Phase Title */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 20,
          marginBottom: 30,
        }}
      >
        <span
          style={{
            fontSize: 20,
            color: "#00d4aa",
            background: "rgba(0, 212, 170, 0.1)",
            padding: "8px 16px",
            borderRadius: 8,
            border: "1px solid rgba(0, 212, 170, 0.3)",
          }}
        >
          Phase {phaseIndex + 1} of {phases.length}
        </span>
        <h3 style={{ fontSize: 36, color: "#fff", margin: 0 }}>
          {currentPhase.title}
        </h3>
      </div>

      {/* Cards */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 25,
          flex: 1,
        }}
      >
        {currentPhase.cards.map((card, index) => (
          <PromptCard
            key={`${phaseIndex}-${index}`}
            {...card}
            delay={30 + index * 45}
          />
        ))}
      </div>

      {/* Progress dots */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 15,
          marginTop: 30,
        }}
      >
        {phases.map((_, index) => (
          <div
            key={index}
            style={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              background: index <= phaseIndex ? "#00d4aa" : "#333",
              transition: "background 0.3s ease",
            }}
          />
        ))}
      </div>
    </AbsoluteFill>
  );
};

