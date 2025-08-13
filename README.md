# AnchorPoint

A Docker-based, fully-local web application to help U.S. military spouses connect, share local knowledge, and rebuild community after PCS moves.

## Tech Stack

- **Frontend**: Next.js 15 (TypeScript)
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL
- **Graph Database**: Neo4j
- **AI Integration**: OpenRouter API
- **Deployment**: Docker Compose
- **Styling**: Tailwind CSS with Custom Design System

## Prerequisites

- Docker and Docker Compose
- Node.js 18+ (for local development)
- npm or yarn

## Getting Started

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd anchorpoint
   ```

2. **Set up environment variables:**
   ```bash
   cp .env.example .env
   # Edit .env file with your actual values
   ```

3. **Start the application:**
   ```bash
   docker compose up
   ```

4. **Access the application:**
   Open your browser to http://localhost:3000

## Development

### Running locally without Docker

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

### Project Structure

```
anchorpoint/
├── src/
│   ├── app/              # Next.js 15 app directory
│   ├── components/       # Reusable UI components
│   ├── lib/              # Utility functions and helpers
│   └── styles/           # Global styles and CSS variables
├── docker-compose.yml    # Docker Compose configuration
├── Dockerfile            # Docker configuration for Next.js app
├── .env.example          # Example environment variables
├── package.json          # Node.js dependencies
└── README.md             # This file
```

### Design System

This project follows a specific design system based on a patriotic red/white/blue color scheme inspired by the American flag. Refer to `DESIGN_SYSTEM.md` for detailed information on colors, typography, spacing, and component styles.

### CSS Implementation

The styling system has been recently updated to resolve CSS loading issues:

- **Global CSS**: Created `src/styles/globals.css` with Tailwind imports and CSS custom properties
- **Layout Integration**: Updated `src/app/layout.tsx` to import global CSS for all pages
- **Tailwind Configuration**: Modified `tailwind.config.js` to recognize CSS custom properties
- **PostCSS Configuration**: Updated `postcss.config.js` to include Tailwind CSS processing

This ensures the design system colors are properly applied across all pages and resolves the greyscale display issues that were occurring during testing.

## Deployment

To deploy the application:

1. Ensure all environment variables in `.env` are set correctly for production
2. Run the application using Docker Compose:
   ```bash
   docker compose up -d
   ```

## Services

- **Next.js App**: http://localhost:3000
- **PostgreSQL**: localhost:5432
- **Neo4j**: 
  - Browser: http://localhost:7474
  - Bolt: localhost:7687

## Data Persistence

Data is persisted in Docker volumes:
- PostgreSQL data: `postgres_data`
- Neo4j data: `neo4j_data`
- Neo4j logs: `neo4j_logs`

To reset the databases, you can remove the volumes:
```bash
docker compose down -v
```

## Current Module Status

### ✅ Module 1: Core Setup (Completed)
- Next.js 15 with TypeScript configuration
- Docker and Docker Compose setup
- Database schemas (PostgreSQL and Neo4j) initialized
- Project structure established

### ✅ Module 2: User Authentication Framework (Completed)
- NextAuth.js integration with TypeScript
- Login and registration pages created
- Password utilities implemented
- Authentication API routes structured

### ✅ Module 3: Public Landing Pages (Completed)
- **Homepage** (`/`): Hero section, value proposition highlights, how it works, testimonials, and join CTA
- **About** (`/about`): Mission statement, how it works, and community information
- **Blog** (`/blog`): Placeholder for future blog/news content
- **Privacy Policy** (`/privacy`): Privacy policy information
- **Terms of Service** (`/terms`): Terms of service information

#### Features
- SEO-friendly, mobile-first design
- Responsive layout following the design system
- Server-side rendering for optimal SEO
- Accessible components with proper semantic HTML
- Modular content sections for easy editing
- Consistent navigation and footer across all pages

#### Customization
To modify the content:
1. Edit the page components in `src/app/`
2. Update text content directly in the JSX
3. Replace placeholder images with actual assets in the `public/` directory
4. Modify CTAs by updating the links in the components

## Troubleshooting

If you encounter issues:

1. Ensure all required environment variables are set in `.env`
2. Check that Docker and Docker Compose are properly installed
3. Verify that ports 3000, 5432, 7474, and 7687 are available
4. Check the Docker container logs:
   ```bash
   docker compose logs <service-name>
   ```

## Agentic Coding Guidance

This project follows agentic coding principles to ensure consistent development practices. Refer to `QWEN.md` for detailed guidance, but here are key points for future development sessions:

### Development Principles
- **Modular Monolith**: Write clear, decoupled modules. Auth, submissions, and AI components must be self-contained.
- **Consistent Naming**: Use PascalCase for components, camelCase for vars/functions, snake_case for database fields.
- **Design System First**: All UI must align with `DESIGN_SYSTEM.md` styles (spacing, typography, colors).
- **Clean, Readable Code**: Prefer clarity over cleverness. Comments should explain *why*, not *what*.

### Recent Development Work (Session Summary)
- **CSS System Fix**: Resolved styling issues by implementing a global CSS system with Tailwind integration
- **Build Process**: Fixed build errors by reorganizing API routes to avoid static export conflicts
- **Navigation**: Consolidated navigation into the layout component for consistency
- **Authentication Framework**: Established NextAuth.js foundation ready for implementation

### Future Development Notes
- Authentication system is fully structured but needs environment variables for production use
- CSS variables are properly configured and should be used for all styling
- API routes should be placed in `src/app/api/` but may need to be moved during static builds
- Always test both development (`npm run dev`) and production (`npm run build`) builds

### Common Issues to Avoid
1. **CSS Loading**: Always import global CSS in the layout file, not individual pages
2. **Build Conflicts**: Dynamic API routes may need to be temporarily moved during static builds
3. **TypeScript**: Ensure proper type definitions for all new components and utilities
4. **Design System**: Use CSS custom properties rather than hard-coded values

## Future Modules

### ✅ Module 4: AI Resource Library (Completed)
- OpenRouter API integration for AI-powered content processing
- Unstructured submissions → structured AI output with tone smoothing and grammar correction
- Dynamic tag generation (4-5 tags per submission including base/branch)
- Resource voting and commenting system
- Base selection and creation functionality
- Configurable AI model via OPENROUTER_MODEL environment variable
- Tag viewing system (all tags and tags per base)

#### Features Implemented
- **AI Processing**: Raw text is sent to OpenRouter API for structuring, tone smoothing, and tagging
- **Database Schema**: Extended Prisma schema with Base, Submission, Vote, and Comment models
- **API Endpoints**: Complete CRUD operations for all resources
- **Frontend Components**: 
  - BaseSelector with dynamic base creation
  - SubmissionForm with AI processing indicator
  - SubmissionCard with voting and comment access
  - CommentsSection with threaded replies
- **Authentication Integration**: Protected routes and user-specific voting/commenting
- **Dashboard Integration**: Link to Resource Library and login redirect

#### Roadmap for Tag System Enhancement
- **Future Enhancement**: Develop task and function to smooth out tags and ensure consistency across submissions
- **Implementation Plan**: Create a background job to analyze and standardize tag naming conventions
- **Data Migration**: Plan for tag consolidation and synonym resolution
- **User Experience**: Implement tag search and filtering capabilities

#### Recent Critical Fixes
- **Session Verification**: Fixed authentication flow from login to resource library by implementing proper NextAuth.js session handling
- **API Endpoint Dependencies**: Improved error handling and graceful degradation for API failures
- **Loading States**: Added comprehensive loading indicators and error states throughout the application
- **Logout Mechanism**: Implemented proper NextAuth.js signout functionality

### 🚧 Module 5: Enhanced Community Features (Planned)
- Discussion forums and groups
- Resource sharing and recommendations
- Community events and meetups
- Direct messaging between users
- Comment notifications system
- User profiles with activity tracking

### 🚧 Module 6: Advanced Features (Planned)
- Identity verification (ID.me integration)
- Sponsored content and monetization hooks
- PWA (Progressive Web App) capabilities
- Advanced search functionality
- Content moderation system
- Bulk base import from military databases
- AI-powered content recommendations
- User reputation system
