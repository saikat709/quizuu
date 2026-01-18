export const QUIZ_PROMPT = (content: string) => `
You are an expert educator. Based on the following transcript/content, generate a comprehensive quiz.
The quiz should be returned as a JSON object with the following structure:
{
  "title": "Quiz Title",
  "questions": [
    {
      "question": "The question text",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "answer_inx": 0
    }
  ]
}

Ensure the questions are challenging and cover the most important concepts.
Return ONLY the JSON object.

Content:
\${content}
`;

export const NOTE_PROMPT = (content: string) => `
You are a professional note-taker. Transform the following transcript/content into well-structured, easy-to-read study notes.
Use Markdown formatting including:
- Clear headings and subheadings
- Bullet points for key facts
- Bold text for important terms
- A summary section at the end

Content:
\${content}
`;

export const TRANSCRIPTION_REFINEMENT_PROMPT = (transcript: string) => `
The following text is a raw transcript from a video/audio. Clean it up for readability:
1. Fix obvious spelling and grammar errors.
2. Separate into paragraphs based on topic shifts.
3. Remove filler words (uh, um, like).
4. Do NOT change any factual content.

Transcript:
\${transcript}
`;
