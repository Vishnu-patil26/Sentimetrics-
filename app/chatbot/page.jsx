'use client';

// ─────────────────────────────────────────────────────────────────────────────
// AI Chatbot — Sentimetrics
//
// This page embeds the Sentimetrics conversational AI advisor hosted on Zapier.
// The interface spans the full available viewport height beneath the site header.
//
// For collaborators wishing to build a native chatbot instead:
//  1. Configure an LLM API route under app/api/ (Gemini, OpenAI, or similar)
//  2. Maintain a conversation history array in useState
//  3. Extract user preferences from the dialogue and pass them to
//     getRecommendations() from '@/src/utils/engine.js' to surface top matches
//  4. Store your API key in .env.local (never commit it to version control)
// ─────────────────────────────────────────────────────────────────────────────

export default function Chatbot() {
  return (
    <iframe
      src="https://sentimetrics.zapier.app"
      title="Sentimetrics AI Phone Advisor"
      style={{
        display: 'block',
        width: '100%',
        height: 'calc(100vh - 64px)',
        border: 'none',
        background: 'transparent',
      }}
      allow="microphone; clipboard-write"
    />
  );
}
