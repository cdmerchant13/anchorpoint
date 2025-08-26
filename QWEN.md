Project Overview

Project Name: AnchorPoint
Purpose: Perplexica-powered web application to help U.S. military spouses connect, share local knowledge, and rebuild community after PCS moves.

MVP Goal:
Build a working proof of concept of a stylized frontend with a query bar that:
	1.	Accepts user input.
	2.	Sends queries to a Perplexica backend instance (API passthrough only).
	3.	Displays results in styled UI using the provided DESIGN_SYSTEM.md.

This is a validation build to test functionality and market interest. No authentication, database, or profile features yet. Ensure copy and UX guidelines are maintained.

⸻

Scope

In scope for MVP:
	•	React + Tailwind frontend.
	•	Use DESIGN_SYSTEM.md for all components, spacing, and typography.
	•	Query bar + submit button.
	•	Results list styled per design system.
	•	Loading and error states.
	•	.env file to hold Perplexica API config.
	•	Deployment to static hosting (e.g., GitHub Pages, Cloudflare Pages).

Out of scope (future iterations):
	•	Authentication / accounts.
	•	Database integration.
	•	User submissions or moderation tools.
	•	Multi-module monolith architecture.

⸻

Style & Architecture Principles
	•	Clarity over cleverness: Write clean, readable React components.
	•	Naming conventions:
	•	Components → PascalCase
	•	Variables/functions → camelCase
	•	Env vars → UPPER_SNAKE_CASE
	•	Design system first: Always implement UI using tokens and styles from DESIGN_SYSTEM.md.
	•	Encapsulation: Encapsulate API logic in a reusable usePerplexicaQuery hook.


⸻

Marketing & SEO Guidance

Even in the MVP, the app must include a minimal but professional marketing surface to communicate value.

Landing Page Content Requirements:
	•	Hero Section:
	•	Headline: empathetic and direct (e.g. “Moving shouldn’t mean starting over.”)
	•	Subheadline: one sentence describing AnchorPoint’s purpose (“AnchorPoint helps military spouses find local knowledge and community after PCS moves.”)
	•	Primary CTA button: “Try a Search” → focuses on the query bar.
	•	Supporting Copy:
	•	A short paragraph or bullet points highlighting value props:
	•	Base-specific insights from peers
	•	Trusted local resources
	•	Shared wisdom from families who’ve been there
	•	Secondary CTA:
	•	“Join the Community” (future placeholder) — can link to a sign-up stub or simply be non-functional for now.

SEO Basics:
	•	Add <title> and <meta name="description"> tags with keywords like military spouse, PCS moves, community, local support.
	•	Use semantic HTML (<h1>, <h2>, <p>) for headings and content.
	•	Ensure text content is crawlable (no all-image hero sections).

Environment & API

Create a .env.local file in the project root. Example keys:

VITE_PERPLEXICA_API_URL=https://your-instance.example.com
VITE_PERPLEXICA_API_KEY=your-api-key-here

All queries to Perplexica should reference these variables. Do not hardcode API values in source code.

⸻

Development Flow

Follow the Explore → Plan → Code → Commit cycle:
	1.	Explore: Summarize existing code and design context.
	2.	Plan: Validate design decisions align with MVP + design system.
	3.	Code: Implement features incrementally, test locally.
	4.	Commit: Document changes and update GEMINI.md if expectations evolve.

Local dev commands:

npm install
npm run dev
npm run build


⸻

UX & Tone Guidance
	•	Tone: Empathetic, reassuring, human. Avoid corporate/marketing fluff.
	•	Microcopy principles:
	•	Onboarding: “Welcome—we’re glad you’re here. Let’s help you feel at home.”
	•	Empty states: “No results yet. Try another search.”
	•	CTA: “Search Again” or “Join the Community” (future).

⸻

Deployment Notes
	•	MVP should be deployable as a static React app.
	•	Default assumption: GitHub Pages or Cloudflare Pages.
	•	Backend Perplexica instance will be hosted separately (e.g., EC2). Frontend should call API via env vars.

⸻

This QWEN.md is the single source of truth for the agentic coder. Stick to MVP scope and avoid implementing future modules.