import { Composition } from "remotion";
import { MarkviewPresentation } from "./Composition";

// ~3:25 at 30fps (tighter timing based on actual audio durations)
const FPS = 30;
const DURATION_SECONDS = 205; // ~3 min 25 sec

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="MarkviewPresentation"
        component={MarkviewPresentation}
        durationInFrames={FPS * DURATION_SECONDS}
        fps={FPS}
        width={1920}
        height={1080}
        defaultProps={{}}
      />
    </>
  );
};

