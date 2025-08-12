# AnchorPoint

A Docker-based, fully-local web application to help U.S. military spouses connect, share local knowledge, and rebuild community after PCS moves.

## Tech Stack

- **Frontend**: Next.js 15 (TypeScript)
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL
- **Graph Database**: Neo4j
- **AI Integration**: OpenRouter API
- **Deployment**: Docker Compose

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

## Module 4: Public Landing Pages

This module implements the public-facing landing pages for unauthenticated users, including:

### Pages
- **Homepage** (`/`): Hero section, value proposition highlights, how it works, testimonials, and join CTA
- **About** (`/about`): Mission statement, how it works, and community information
- **Blog** (`/blog`): Placeholder for future blog/news content
- **Privacy Policy** (`/privacy`): Privacy policy information
- **Terms of Service** (`/terms`): Terms of service information

### Features
- SEO-friendly, mobile-first design
- Responsive layout following the design system
- Server-side rendering for optimal SEO
- Accessible components with proper semantic HTML
- Modular content sections for easy editing
- Consistent navigation and footer across all pages

### Customization
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

## Future Modules

This foundation supports the following planned modules:
1. User Authentication (email/password)
2. Public Landing Pages (completed)
3. AI Resource Library (OpenRouter integration)
4. Community Features (discussions, resource sharing)