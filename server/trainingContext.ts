import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let trainingDataCache: string | null = null;

/**
 * Load the comprehensive PUA training data
 * This is cached in memory after first load for performance
 */
export function getTrainingData(): string {
  if (trainingDataCache) {
    return trainingDataCache;
  }

  try {
    const filePath = path.join(__dirname, 'training_data.md');
    trainingDataCache = fs.readFileSync(filePath, 'utf-8');
    return trainingDataCache;
  } catch (error) {
    console.error('[Training Data] Failed to load training data:', error);
    return '';
  }
}

/**
 * Get a summarized version of the training data for context
 * This extracts key sections to fit within token limits
 */
export function getTrainingContext(): string {
  const fullData = getTrainingData();
  
  if (!fullData) {
    return 'You are an expert social dynamics coach trained in attraction principles, body language, conversation skills, and confidence building.';
  }

  // Extract key sections for context (first 15000 characters for efficiency)
  const contextData = fullData.substring(0, 15000);
  
  return `You are an expert social dynamics coach with comprehensive knowledge of attraction principles, social psychology, and interpersonal communication.

## Your Knowledge Base

${contextData}

## Your Approach

You provide:
1. **Ethical Guidance** - Focus on authentic connection, respect, and mutual interest
2. **Practical Advice** - Actionable tips based on proven social dynamics principles
3. **Confidence Building** - Help users develop genuine self-confidence and social skills
4. **Situation-Specific Coaching** - Tailored advice for different social contexts (daygame, nightgame, texting, etc.)
5. **Calibration Training** - Teach users to read social cues and adjust their approach

You avoid:
- Manipulative tactics that disrespect boundaries
- Objectifying language
- Encouraging dishonesty or deception
- One-size-fits-all advice without context

Your goal is to help users develop authentic social confidence and build genuine connections.`;
}

/**
 * Get specific training data sections by topic
 */
export function getTrainingSection(topic: 'fundamentals' | 'techniques' | 'body_language' | 'texting' | 'escalation'): string {
  const fullData = getTrainingData();
  
  const sections: Record<string, string> = {
    fundamentals: extractSection(fullData, '## 1. Foundational Concepts', '## 2.'),
    techniques: extractSection(fullData, '## 4. Techniques and Methodologies', '## 5.'),
    body_language: extractSection(fullData, 'Body Language', 'Vocal Tonality'),
    texting: extractSection(fullData, 'Text Game', 'Phone Game'),
    escalation: extractSection(fullData, 'Kino Escalation', 'LMR')
  };

  return sections[topic] || '';
}

function extractSection(text: string, startMarker: string, endMarker: string): string {
  const startIndex = text.indexOf(startMarker);
  if (startIndex === -1) return '';
  
  const endIndex = text.indexOf(endMarker, startIndex);
  if (endIndex === -1) {
    return text.substring(startIndex, startIndex + 5000); // Get 5000 chars if no end marker
  }
  
  return text.substring(startIndex, endIndex);
}

/**
 * Get IOI/IOD reference data from training
 */
export function getIndicatorReference(): string {
  const fullData = getTrainingData();
  return extractSection(fullData, 'IOI (Indicator of Interest)', 'Neg');
}

/**
 * Get opener examples from training data
 */
export function getOpenerExamples(): string {
  const fullData = getTrainingData();
  return extractSection(fullData, 'Opener', 'Wingman');
}
