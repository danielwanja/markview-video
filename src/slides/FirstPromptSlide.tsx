import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  interpolate,
  spring,
  useVideoConfig,
} from "remotion";

const FIRST_PROMPT = `create a georgious web app, named markview, 
that renders a markdown pdf, separate pages by ---, 
and allowing to use the left/right arrows to go to 
the next/previous page, and keys up/down pgup/pgdn 
to show page overflow if its below the fold. 
It used terminal fonts. Is specialized in showing 
beautifully code on the page. The code doesn't wrap. 
But the other presentation texst flows nicely and wraps. 
Make it simple and beautiful. The app should really 
look like a terminal (maybe like gemini-cli). 
If the user press w, the app goes in light mode, 
else in dark mode. The user can drop a markdown file 
to view the UI`;

export const FirstPromptSlide: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleY = spring({
    frame,
    fps,
    config: { damping: 15, stiffness: 80 },
  });

  // Typing effect for the prompt
  const charsToShow = Math.floor(interpolate(frame, [30, 600], [0, FIRST_PROMPT.length], {
    extrapolateRight: "clamp",
  }));

  const displayedText = FIRST_PROMPT.slice(0, charsToShow);

  const cursorOpacity = Math.sin(frame * 0.3) > 0 ? 1 : 0;

  const badgeOpacity = interpolate(frame, [650, 700], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(135deg, #0d0d0d 0%, #1a1a1a 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 80,
      }}
    >
      {/* Section Title */}
      <h2
        style={{
          fontSize: 48,
          color: "#00d4aa",
          fontWeight: 600,
          marginBottom: 50,
          transform: `translateY(${interpolate(titleY, [0, 1], [-50, 0])}px)`,
          opacity: titleY,
        }}
      >
        PROMPT #1 — The Vision
      </h2>

      {/* Terminal Window */}
      <div
        style={{
          width: "100%",
          maxWidth: 1400,
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
          <span style={{ marginLeft: 20, color: "#888", fontSize: 16 }}>bolt.new — prompt</span>
        </div>

        {/* Terminal Content */}
        <div style={{ padding: 40 }}>
          <pre
            style={{
              fontSize: 26,
              lineHeight: 1.6,
              color: "#e5e5e5",
              fontFamily: "'JetBrains Mono', monospace",
              whiteSpace: "pre-wrap",
              margin: 0,
            }}
          >
            <span style={{ color: "#00d4aa" }}>❯ </span>
            {displayedText}
            <span
              style={{
                opacity: cursorOpacity,
                background: "#00d4aa",
                marginLeft: 2,
              }}
            >
              {" "}
            </span>
          </pre>
        </div>
      </div>

      {/* Badge */}
      <div
        style={{
          marginTop: 50,
          opacity: badgeOpacity,
          display: "flex",
          alignItems: "center",
          gap: 15,
          background: "rgba(0, 212, 170, 0.1)",
          padding: "16px 30px",
          borderRadius: 12,
          border: "1px solid rgba(0, 212, 170, 0.3)",
        }}
      >
        <span style={{ fontSize: 28, color: "#00d4aa" }}>✓</span>
        <span style={{ fontSize: 24, color: "#00d4aa" }}>
          One prompt. The entire vision.
        </span>
      </div>
    </AbsoluteFill>
  );
};

