import React from "react";
import {
  AbsoluteFill,
  Sequence,
  Audio,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Easing,
} from "remotion";

// Slide Components
import { TitleSlide } from "./slides/TitleSlide";
import { StatsSlide } from "./slides/StatsSlide";
import { FirstPromptSlide } from "./slides/FirstPromptSlide";
import { IterationSlide } from "./slides/IterationSlide";
import { DifficultiesSlide } from "./slides/DifficultiesSlide";
import { FeaturesSlide } from "./slides/FeaturesSlide";
import { PublishSlide } from "./slides/PublishSlide";
import { LessonsSlide } from "./slides/LessonsSlide";
import { OutroSlide } from "./slides/OutroSlide";

// Audio configuration - set to true once voiceover is generated
const ENABLE_VOICEOVER = true;

// Frame calculations (30fps)
const FPS = 30;
const SECONDS = (s: number) => s * FPS;

// Gap between audio tracks (in seconds)
const AUDIO_GAP = 0.5;

// Actual audio durations (from ffprobe) + gap
const AUDIO_DURATIONS = {
  title: 9.0,
  stats: 8.7,
  firstPrompt: 31.2,
  iteration: 38.6,
  difficulties: 30.9,
  features: 42.0,
  publish: 14.6,
  lessons: 16.0,
  outro: 5.9,
};

// Calculate audio start times (back-to-back with gaps)
const AUDIO_STARTS = {
  title: 0,
  stats: AUDIO_DURATIONS.title + AUDIO_GAP,
  firstPrompt: AUDIO_DURATIONS.title + AUDIO_GAP + AUDIO_DURATIONS.stats + AUDIO_GAP,
  iteration: 0, // calculated below
  difficulties: 0,
  features: 0,
  publish: 0,
  lessons: 0,
  outro: 0,
};

// Calculate cumulative starts
let cumulative = AUDIO_STARTS.firstPrompt + AUDIO_DURATIONS.firstPrompt + AUDIO_GAP;
AUDIO_STARTS.iteration = cumulative;
cumulative += AUDIO_DURATIONS.iteration + AUDIO_GAP;
AUDIO_STARTS.difficulties = cumulative;
cumulative += AUDIO_DURATIONS.difficulties + AUDIO_GAP;
AUDIO_STARTS.features = cumulative;
cumulative += AUDIO_DURATIONS.features + AUDIO_GAP;
AUDIO_STARTS.publish = cumulative;
cumulative += AUDIO_DURATIONS.publish + AUDIO_GAP;
AUDIO_STARTS.lessons = cumulative;
cumulative += AUDIO_DURATIONS.lessons + AUDIO_GAP;
AUDIO_STARTS.outro = cumulative;

// Slide timings (in seconds) - aligned with audio
const SLIDES = {
  title: { start: AUDIO_STARTS.title, duration: AUDIO_DURATIONS.title + AUDIO_GAP },
  stats: { start: AUDIO_STARTS.stats, duration: AUDIO_DURATIONS.stats + AUDIO_GAP },
  firstPrompt: { start: AUDIO_STARTS.firstPrompt, duration: AUDIO_DURATIONS.firstPrompt + AUDIO_GAP },
  iteration: { start: AUDIO_STARTS.iteration, duration: AUDIO_DURATIONS.iteration + AUDIO_GAP },
  difficulties: { start: AUDIO_STARTS.difficulties, duration: AUDIO_DURATIONS.difficulties + AUDIO_GAP },
  features: { start: AUDIO_STARTS.features, duration: AUDIO_DURATIONS.features + AUDIO_GAP },
  publish: { start: AUDIO_STARTS.publish, duration: AUDIO_DURATIONS.publish + AUDIO_GAP },
  lessons: { start: AUDIO_STARTS.lessons, duration: AUDIO_DURATIONS.lessons + AUDIO_GAP },
  outro: { start: AUDIO_STARTS.outro, duration: AUDIO_DURATIONS.outro + 2 }, // Extra time for outro
};

export const MarkviewPresentation: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0a0a0a",
        fontFamily: "'JetBrains Mono', 'SF Mono', monospace",
      }}
    >
      {/* Title Slide: 0:00 - 0:15 */}
      <Sequence from={SECONDS(SLIDES.title.start)} durationInFrames={SECONDS(SLIDES.title.duration)}>
        <TitleSlide />
      </Sequence>

      {/* Stats Slide: 0:15 - 0:30 */}
      <Sequence from={SECONDS(SLIDES.stats.start)} durationInFrames={SECONDS(SLIDES.stats.duration)}>
        <StatsSlide />
      </Sequence>

      {/* First Prompt Slide: 0:30 - 1:15 */}
      <Sequence from={SECONDS(SLIDES.firstPrompt.start)} durationInFrames={SECONDS(SLIDES.firstPrompt.duration)}>
        <FirstPromptSlide />
      </Sequence>

      {/* Iteration Slide: 1:15 - 2:15 */}
      <Sequence from={SECONDS(SLIDES.iteration.start)} durationInFrames={SECONDS(SLIDES.iteration.duration)}>
        <IterationSlide />
      </Sequence>

      {/* Difficulties Slide: 2:15 - 3:00 */}
      <Sequence from={SECONDS(SLIDES.difficulties.start)} durationInFrames={SECONDS(SLIDES.difficulties.duration)}>
        <DifficultiesSlide />
      </Sequence>

      {/* Features Slide: 3:00 - 4:00 */}
      <Sequence from={SECONDS(SLIDES.features.start)} durationInFrames={SECONDS(SLIDES.features.duration)}>
        <FeaturesSlide />
      </Sequence>

      {/* Publish Slide: 4:00 - 4:30 */}
      <Sequence from={SECONDS(SLIDES.publish.start)} durationInFrames={SECONDS(SLIDES.publish.duration)}>
        <PublishSlide />
      </Sequence>

      {/* Lessons Slide: 4:30 - 4:55 */}
      <Sequence from={SECONDS(SLIDES.lessons.start)} durationInFrames={SECONDS(SLIDES.lessons.duration)}>
        <LessonsSlide />
      </Sequence>

      {/* Outro Slide: 4:55 - 5:00 */}
      <Sequence from={SECONDS(SLIDES.outro.start)} durationInFrames={SECONDS(SLIDES.outro.duration)}>
        <OutroSlide />
      </Sequence>

      {/* Voiceover Audio Tracks - sequenced back-to-back */}
      {ENABLE_VOICEOVER && (
        <>
          <Sequence from={SECONDS(AUDIO_STARTS.title)}>
            <Audio src={staticFile("audio/title.mp3")} />
          </Sequence>
          <Sequence from={SECONDS(AUDIO_STARTS.stats)}>
            <Audio src={staticFile("audio/stats.mp3")} />
          </Sequence>
          <Sequence from={SECONDS(AUDIO_STARTS.firstPrompt)}>
            <Audio src={staticFile("audio/firstPrompt.mp3")} />
          </Sequence>
          <Sequence from={SECONDS(AUDIO_STARTS.iteration)}>
            <Audio src={staticFile("audio/iteration.mp3")} />
          </Sequence>
          <Sequence from={SECONDS(AUDIO_STARTS.difficulties)}>
            <Audio src={staticFile("audio/difficulties.mp3")} />
          </Sequence>
          <Sequence from={SECONDS(AUDIO_STARTS.features)}>
            <Audio src={staticFile("audio/features.mp3")} />
          </Sequence>
          <Sequence from={SECONDS(AUDIO_STARTS.publish)}>
            <Audio src={staticFile("audio/publish.mp3")} />
          </Sequence>
          <Sequence from={SECONDS(AUDIO_STARTS.lessons)}>
            <Audio src={staticFile("audio/lessons.mp3")} />
          </Sequence>
          <Sequence from={SECONDS(AUDIO_STARTS.outro)}>
            <Audio src={staticFile("audio/outro.mp3")} />
          </Sequence>
        </>
      )}
    </AbsoluteFill>
  );
};

