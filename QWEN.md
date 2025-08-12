# QWEN.md — Agentic Guidance for the AnchorPoint Project

##  Project Overview
**Project Name:** AnchorPoint  
A Docker-based, fully-local web application to help U.S. military spouses connect, share local knowledge, and rebuild community after PCS moves.  
**Core MVP Modules (in progress):**
- Module 1: Core Setup — Docker Compose with Next.js (TS), Postgres (Prisma), Neo4j, OpenRouter integration  
- Module 2: User Auth — Email/password sign-up & login, local session storage  
- Module 3: Public Landing (Module 4) — SEO-friendly splash pages with value prop and sign-up CTA  
- Module 4: AI Resource Library — Unstructured submissions → structured AI output (OpenRouter), voting, comments

## Style & Architecture Principles
- **Modular Monolith**: Write clear, decoupled modules. Auth, submissions, and AI components must be self-contained.
- **Consistent Naming**: Use PascalCase for components, camelCase for vars/functions, snake_case for database fields.
- **Design System First**: All UI must align with `DESIGN_SYSTEM.md` styles (spacing, typography, colors).
- **Clean, Readable Code**: Prefer clarity over cleverness. Comments should explain *why*, not *what*.

## Agentic Coding & Interaction Tips
- Always reference this file—does not override prompts but reinforces expected context and tone.
- If modifying config files (e.g., `docker-compose.yml`), always verify formatting and local volume paths.
- Follow the “Explore → Plan → Code → Commit” pattern:
  1. Describe or summarize existing code context
  2. Validate or refine design decisions
  3. Implement code, then test locally
  4. Document changes and update `README.md` or this file if needed  [oai_citation:0‡AI Agents News](https://aiagent.marktechpost.com/post/agentic-coding-6-best-practices-you-need-to-know?utm_source=chatgpt.com) [oai_citation:1‡Ben Houston's Website](https://benhouston3d.com/blog/agentic-coding-best-practices?utm_source=chatgpt.com)

## UX & Tone Guidance
- **Tone**: Empathetic, serious, reassuring (never corporate or flippant).  
- **Landing Page Copy**: Reference your GTM doc—highlight themes like “Base-specific knowledge,” “Peer support,” “Local resources,” and a senior collection of community wisdom.
- **Microcopy Principles**:
  - Onboarding: “Welcome—we’re glad you’re here. Let’s help you feel at home.”
  - Empty States: “Can’t find what you’re looking for? Try broadening your search—or ask the community.”
  - CTAs: “Join the Community” button — clear, action-oriented.

## Testing & Local Development
- **Docker Local Dev**: All services used (Next.js, Postgres, Neo4j) must spin up and function via `docker-compose up` without external dependencies.
- Keep `README.md` updated with stack, features implemented, instructions/commands new contributors can use: `npm run dev`, `docker-compose up`, etc.

## Future-Proofing
- Leave placeholders in code for:
  - Identity verification (e.g., ID.me integration later)
  - Sponsored content or Monetization hooks
- Make design decisions modular for future incorporation of PWA, search optimizations, or advanced matching.
