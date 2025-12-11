import { ElevenLabsClient } from "elevenlabs";
import * as fs from "fs";
import * as path from "path";
import * as dotenv from "dotenv";

// Load environment variables (support both .env and .env.local)
dotenv.config({ path: path.join(__dirname, "../.env.local") });
dotenv.config({ path: path.join(__dirname, "../.env") });

// Configuration
// const VOICE_ID = "pNInz6obpgDQGcFmaJgB"; // Adam - clear, professional male voice
// const VOICE_ID = "ErXwobaYiN019PkySvjV"; // Antoni (male, warm)
const VOICE_ID = "s3TPKV1kjDlVtZbl4Ksh"; // other Adam - engaging
// Alternative voices:
// "21m00Tcm4TlvDq8ikWAM" - Rachel (female)
// "ErXwobaYiN019PkySvjV" - Antoni (male, warm)

const OUTPUT_DIR = path.join(__dirname, "../public/audio");
const VOICEOVER_PATH = path.join(__dirname, "../../voiceover.md");

// Section timings in seconds (must match Remotion composition)
// Maps markdown header keywords to section names
const SECTION_MAP: Record<string, { name: string; start: number; duration: number }> = {
  "TITLE": { name: "title", start: 0, duration: 15 },
  "STATS": { name: "stats", start: 15, duration: 15 },
  "FIRST PROMPT": { name: "firstPrompt", start: 30, duration: 45 },
  "ITERATION": { name: "iteration", start: 75, duration: 60 },
  "DIFFICULTIES": { name: "difficulties", start: 135, duration: 45 },
  "FEATURES": { name: "features", start: 180, duration: 60 },
  "PUBLISH": { name: "publish", start: 240, duration: 30 },
  "LESSONS": { name: "lessons", start: 270, duration: 25 },
  "OUTRO": { name: "outro", start: 295, duration: 5 },
};

interface VoiceoverSection {
  name: string;
  text: string;
  start: number;
  duration: number;
}

function parseVoiceoverScript(content: string): VoiceoverSection[] {
  const sections: VoiceoverSection[] = [];
  const lines = content.split("\n");
  
  let currentSection: { keyword: string; lines: string[] } | null = null;
  
  for (const line of lines) {
    // Check for section header containing "SLIDE"
    if (line.startsWith("## ") && line.includes("SLIDE")) {
      // Save previous section
      if (currentSection) {
        processSection(currentSection, sections);
      }
      
      // Extract keyword (text between emoji and SLIDE)
      // e.g., "## 🎬 TITLE SLIDE (0:00 - 0:15)" -> "TITLE"
      // Use non-greedy match for emoji, then capture everything before SLIDE
      const match = line.match(/## .+? ([A-Z][A-Z\s]+) SLIDE/);
      if (match) {
        currentSection = { keyword: match[1].trim().toUpperCase(), lines: [] };
      }
    } else if (currentSection && line.startsWith(">")) {
      // Add narration line
      currentSection.lines.push(line);
    } else if (line.startsWith("## ") && !line.includes("SLIDE")) {
      // Non-slide section (like "Recording Notes") - stop processing
      if (currentSection) {
        processSection(currentSection, sections);
        currentSection = null;
      }
    }
  }
  
  // Process last section
  if (currentSection) {
    processSection(currentSection, sections);
  }
  
  // Sort by start time
  sections.sort((a, b) => a.start - b.start);
  
  return sections;
}

function processSection(
  sectionData: { keyword: string; lines: string[] },
  sections: VoiceoverSection[]
): void {
  const sectionConfig = SECTION_MAP[sectionData.keyword];
  
  if (!sectionConfig) {
    console.log(`  ⚠️ Unknown section: "${sectionData.keyword}"`);
    return;
  }
  
  // Extract narration text from lines starting with >
  const narrationLines: string[] = [];
  for (const line of sectionData.lines) {
    let text = line.slice(1).trim(); // Remove > prefix
    // Skip stage directions (text in italics/parentheses)
    if (text.startsWith("*") || text.startsWith("(")) continue;
    if (text) narrationLines.push(text);
  }
  
  const text = narrationLines.join(" ").replace(/\s+/g, " ").trim();
  
  if (text) {
    sections.push({
      name: sectionConfig.name,
      text,
      start: sectionConfig.start,
      duration: sectionConfig.duration,
    });
  }
}

async function generateAudio(
  client: ElevenLabsClient,
  text: string,
  outputPath: string
): Promise<void> {
  console.log(`  Generating audio for: "${text.slice(0, 50)}..."`);
  
  const audio = await client.textToSpeech.convert(VOICE_ID, {
    text,
    model_id: "eleven_multilingual_v2",
    voice_settings: {
      stability: 0.5,
      similarity_boost: 0.75,
      style: 0.3,
      use_speaker_boost: true,
    },
  });
  
  // Convert stream to buffer and save
  const chunks: Buffer[] = [];
  for await (const chunk of audio) {
    chunks.push(Buffer.from(chunk));
  }
  const buffer = Buffer.concat(chunks);
  
  fs.writeFileSync(outputPath, buffer);
  console.log(`  ✓ Saved: ${outputPath}`);
}

async function main() {
  console.log("🎙️ ElevenLabs Voiceover Generator\n");
  
  // Check for API key
  const apiKey = process.env.ELEVENLABS_API_KEY;
  if (!apiKey) {
    console.error("❌ Error: ELEVENLABS_API_KEY not found in environment");
    console.error("   Create a .env file with: ELEVENLABS_API_KEY=your_key_here");
    console.error("   Get your key at: https://elevenlabs.io/\n");
    process.exit(1);
  }
  
  // Initialize client
  const client = new ElevenLabsClient({ apiKey });
  
  // Ensure output directory exists
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }
  
  // Read and parse voiceover script
  console.log("📄 Reading voiceover script...");
  const voiceoverContent = fs.readFileSync(VOICEOVER_PATH, "utf-8");
  const sections = parseVoiceoverScript(voiceoverContent);
  
  console.log(`   Found ${sections.length} sections\n`);
  
  // Generate audio for each section
  console.log("🔊 Generating audio sections...\n");
  
  for (const section of sections) {
    console.log(`📍 Section: ${section.name} (${section.start}s - ${section.start + section.duration}s)`);
    
    const outputPath = path.join(OUTPUT_DIR, `${section.name}.mp3`);
    
    try {
      await generateAudio(client, section.text, outputPath);
    } catch (error) {
      console.error(`   ❌ Error generating ${section.name}:`, error);
    }
    
    console.log("");
  }
  
  // Generate metadata file for Remotion
  const metadata = {
    voice: VOICE_ID,
    generatedAt: new Date().toISOString(),
    sections: sections.map(s => ({
      name: s.name,
      file: `${s.name}.mp3`,
      startFrame: s.start * 30, // 30fps
      durationFrames: s.duration * 30,
    })),
  };
  
  fs.writeFileSync(
    path.join(OUTPUT_DIR, "metadata.json"),
    JSON.stringify(metadata, null, 2)
  );
  
  console.log("✅ Voiceover generation complete!");
  console.log(`   Audio files saved to: ${OUTPUT_DIR}`);
  console.log(`   Metadata saved to: ${OUTPUT_DIR}/metadata.json\n`);
  
  // Print character count for billing awareness
  const totalChars = sections.reduce((sum, s) => sum + s.text.length, 0);
  console.log(`📊 Total characters processed: ${totalChars}`);
  console.log(`   (ElevenLabs free tier: 10,000 chars/month)\n`);
}

main().catch(console.error);

