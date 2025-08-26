# AnchorPoint Architecture Plan

## Overview

This document outlines the technical architecture for the AnchorPoint MVP, a React-based web application that helps U.S. military spouses connect, share local knowledge, and rebuild community after PCS moves. The application integrates with a Perplexica backend to provide AI-powered search functionality.

## Project Goals

### MVP Scope
- React + Tailwind frontend with query interface
- Integration with Perplexica API for search functionality
- Styled UI following the AnchorPoint design system
- Loading and error states
- Deployment to static hosting

### Out of Scope (Future Iterations)
- Authentication / accounts
- Database integration
- User submissions or moderation tools
- Multi-module monolith architecture

## Technical Stack

### Frontend
- **React** - UI library for building components
- **Vite** - Build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **PostCSS** - CSS processing

### Backend Integration
- **Perplexica API** - AI-powered search engine
- **RESTful API** - Communication protocol

### Development Tools
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Git** - Version control

## Folder Structure

```
anchorpoint/
├── public/
│   ├── favicon.ico
│   ├── robots.txt
│   └── index.html
├── src/
│   ├── components/
│   │   ├── ui/
│   │   │   ├── Button.jsx
│   │   │   ├── Input.jsx
│   │   │   ├── Card.jsx
│   │   │   └── LoadingSpinner.jsx
│   │   ├── layout/
│   │   │   ├── Header.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── HeroSection.jsx
│   │   └── features/
│   │       ├── SearchBar.jsx
│   │       ├── ResultsList.jsx
│   │       └── ResultItem.jsx
│   ├── hooks/
│   │   └── usePerplexicaQuery.js
│   ├── styles/
│   │   └── globals.css
│   ├── utils/
│   │   └── api.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── .env.local
├── .gitignore
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── vite.config.js
```

## Component Architecture

### Layout Components

#### Header.jsx
- **Purpose**: Site navigation and branding
- **Features**:
  - Logo and site identity
  - Red accent border at bottom (per design system)
  - Responsive design for mobile and desktop
- **Styling**: White background with red accent border

#### Footer.jsx
- **Purpose**: Site information and links
- **Features**:
  - Copyright information
  - Secondary navigation links
  - Blue accent border at top (per design system)
- **Styling**: Light gray background with blue accent border

#### HeroSection.jsx
- **Purpose**: Landing page introduction and call-to-action
- **Content**:
  - Headline: "Moving shouldn't mean starting over."
  - Subheadline: "AnchorPoint helps military spouses find local knowledge and community after PCS moves."
  - Primary CTA: "Try a Search"
  - Value propositions:
    - Base-specific insights from peers
    - Trusted local resources
    - Shared wisdom from families who've been there
  - Secondary CTA: "Join the Community" (non-functional for MVP)
- **Styling**: Full-width section with appropriate spacing

### UI Components

#### Button.jsx
- **Purpose**: Reusable button component
- **Variants**:
  - Primary: Blue background with white text
  - Secondary: Red background with white text
  - Tertiary: White background with blue text with border
- **Features**:
  - Hover states with lighter color variants
  - Focus indicators with blue outline
  - 6px border radius
  - Proper contrast ratios for accessibility

#### Input.jsx
- **Purpose**: Form input field
- **Features**:
  - Styled search input field
  - Focus states with blue outline
  - Proper contrast ratios
  - Placeholder text for search

#### Card.jsx
- **Purpose**: Content container
- **Features**:
  - White/Gray 100 background
  - Gray 200 border
  - 8px border radius
  - Subtle shadow for depth
  - 4px top border accent in primary colors
- **Usage**: For search results and other content containers

#### LoadingSpinner.jsx
- **Purpose**: Loading state indicator
- **Features**:
  - Animated spinner
  - Accessible with ARIA attributes
  - Consistent sizing and styling

### Feature Components

#### SearchBar.jsx
- **Purpose**: Main search interface
- **Features**:
  - Input field for user queries
  - Submit button
  - Form validation
  - Integration with usePerplexicaQuery hook
  - Loading state during API call
  - Error message display
- **Styling**: Centered with appropriate spacing

#### ResultsList.jsx
- **Purpose**: Container for search results
- **Features**:
  - Grid layout for results
  - Loading state display
  - Error state handling
  - Empty state messaging
  - Responsive design
- **Styling**: Grid layout with proper spacing

#### ResultItem.jsx
- **Purpose**: Individual search result display
- **Features**:
  - Title display
  - Result snippet
  - Source information
  - Metadata display
  - Clickable for future expansion
- **Styling**: Card-based layout with consistent styling

## Hooks Architecture

### usePerplexicaQuery.js
- **Purpose**: API communication with Perplexica backend
- **Features**:
  - Accepts query string and optional configuration
  - Constructs proper request body according to API spec
  - Handles POST requests to /api/search endpoint
  - Manages loading, error, and success states
  - Processes both standard and streaming responses
  - Returns message and sources data
  - Implements retry logic for failed requests
  - Handles API rate limiting if needed

**Request Configuration Options:**
- `focusMode`: "webSearch" (default for MVP)
- `optimizationMode`: "speed" or "balanced" (default: "speed")
- `systemInstructions`: Custom instructions for military spouse context
- `stream`: false (default for MVP)
- `chatModel`: Default GPT model
- `embeddingModel`: Default embedding model

**Response Data Structure:**
- `message`: The search result text
- `sources`: Array of source objects with pageContent and metadata
- `loading`: Boolean state
- `error`: Error object if request fails

## API Integration

### Environment Variables
```env
# .env.local
VITE_PERPLEXICA_API_URL=http://localhost:3000/api/search
VITE_PERPLEXICA_API_KEY=your-api-key-here
```

### api.js Utilities
- **buildRequestBody(query, options)**: Constructs API request payload
- **handleApiError(response)**: Standardized error handling
- **formatSources(sources)**: Processes source data for display
- **sanitizeQuery(query)**: Input sanitization

### API Request Structure
```javascript
const requestBody = {
  chatModel: { provider: "openai", name: "gpt-4o-mini" },
  embeddingModel: { provider: "openai", name: "text-embedding-3-large" },
  optimizationMode: "speed",
  focusMode: "webSearch",
  query: userQuery,
  systemInstructions: "Focus on providing helpful information for military spouses about PCS moves, local resources, and community support.",
  stream: false
};
```

### Response Handling
- Parse JSON response for standard requests
- Handle streaming responses for future real-time updates
- Extract message and sources for display
- Format sources for better readability

### Error Handling
- Network errors (offline, API unreachable)
- API errors (400, 500 status codes)
- Timeout handling
- Retry mechanism for transient failures

## Design System Implementation

### Color Palette
- **Primary Red**: `#B22234`
- **Primary Blue**: `#3C3B6E`
- **Primary White**: `#FFFFFF`
- **Light Red**: `#D94F4F`
- **Light Blue**: `#5A5A99`
- **Dark Blue**: `#2C2B4E`
- **Neutral Grayscale**: Gray 50-900 scale

### Typography
- **Font Family**: System stack with fallbacks
- **Font Sizes**: 12px-48px scale
- **Headings**: H1-H3 with proper hierarchy

### Spacing System
- **8px Grid**: XXS (4px) to XXL (64px)
- **Consistent Padding/Margin**: Using spacing scale

### Component Styling
- **Buttons**: 6px border radius, hover states
- **Cards**: 8px border radius, subtle shadows
- **Inputs**: Focus states with blue outline
- **Navigation**: Accent borders as specified

## Accessibility Considerations

### Color Contrast
- All text/background combinations meet WCAG 2.1 AA standards
- Minimum 4.5:1 contrast ratio for normal text
- Minimum 3:1 contrast ratio for large text

### Focus States
- All interactive elements have visible focus indicators
- Focus ring: 2px solid blue with 2px offset
- Keyboard navigation support

### Screen Reader Support
- Semantic HTML structure
- ARIA labels for interactive elements
- Proper heading hierarchy
- Alt text for images

### Loading States
- Loading indicators announced to screen readers
- Proper ARIA live regions for dynamic content

## Security Considerations

### Environment Variables
- Sensitive data in .env.local (not committed)
- VITE_ prefix for client-side environment variables
- No hardcoded API keys in source code


## Deployment Strategy

### Static Hosting
- Build optimized static assets
- Serve from CDN for better performance
- Cache static assets effectively

### Environment Configuration
- Separate environment files for development/staging/production
- Proper API endpoint configuration
- Optimized build settings for production

### Monitoring
- Basic error tracking
- Performance monitoring
- Uptime monitoring for critical features

## Future Enhancements

### Phase 2 Features
- User authentication system
- User profiles and preferences
- Search history and saved searches
- Community features (forums, groups)

### Technical Improvements
- Advanced search filters
- Real-time search with streaming
- Personalized search results
- Advanced analytics

### UI/UX Enhancements
- Dark mode support
- Advanced search interface
- Result filtering and sorting
- Mobile app development

## Development Workflow

### Local Development
```bash
npm install          # Install dependencies
npm run dev         # Start development server
npm run build       # Build for production
npm run preview     # Preview production build
```

### Code Quality
- ESLint for code linting
- Prettier for code formatting
- Pre-commit hooks for quality checks
- Regular code reviews



## Conclusion

This architecture plan provides a solid foundation for the AnchorPoint MVP, focusing on core functionality while maintaining flexibility for future enhancements. The design system ensures a consistent, accessible user experience, while the component-based architecture promotes reusability and maintainability.

The integration with the Perplexica API enables powerful search capabilities tailored specifically for military spouses, helping them find relevant information and build community connections during PCS moves.
