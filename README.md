# AnchorPoint - Military Spouse Community Platform

A React-based web application designed to help U.S. military spouses connect, share local knowledge, and rebuild community after Permanent Change of Station (PCS) moves.

## 🎯 Project Intent

AnchorPoint addresses the unique challenges faced by military spouses who frequently relocate due to military assignments. The platform aims to:

- Provide a centralized hub for military spouses to find and share local information
- Facilitate community building among spouses in new locations
- Offer AI-powered search capabilities to quickly find relevant information about new duty stations
- Create a supportive network for military families during transitions

## 🌐 Current Features

### Core Application
- **Landing Page** (src/App.jsx) - Hero section with search functionality and value propositions
- **About Page** (src/pages/About.jsx) - Mission statement and contact information
- **Search Functionality** - AI-powered search using Perplexica API for finding relevant information

### Technical Implementation
- **Responsive Design** - Mobile-first approach with breakpoints at 640px, 768px, 1024px, 1280px, and 1536px
- **Accessibility** - WCAG 2.1 AA compliant with proper color contrast, semantic HTML, and ARIA labels
- **SEO Optimization** - Meta tags, proper heading hierarchy, and Open Graph integration

## 🛠️ Technical Stack

### Frontend
- **React** - UI library with hooks and functional components
- **Vite** - Fast build tool and development server
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **PostCSS** - CSS processing

### Search Integration
- **Perplexica API** - AI-powered search functionality via worker server

### Development Tools
- **ESLint** - Code linting with React rules
- **Prettier** - Code formatting
- **Git** - Version control

## 📁 Project Structure

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
│   ├── pages/
│   │   └── About.jsx
│   ├── styles/
│   │   └── globals.css
│   ├── utils/
│   │   ├── api.js
│   │   └── markedConfig.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── worker/
│   ├── server.js
│   ├── package.json
│   ├── public/
│   │   └── index.html
│   └── README.md
├── .env.local
├── .gitignore
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── vite.config.js
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/cdmerchant13/anchorpoint.git
cd anchorpoint
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🌐 Deployment Process

### Production Build
```bash
npm run build
```

This command:
1. Bundles the React application using Vite
2. Optimizes assets for production
3. Generates a static build in the `dist/` directory

### Local Preview
```bash
npm run preview
```

This command starts a local server to preview the production build.

### Worker Server Deployment
The search functionality uses a separate worker server that:
1. Must be deployed separately from the main application
2. Handles API requests to the Perplexica service
3. Processes search queries and returns formatted results

## 🎨 Design System

### Color Palette
- **Primary Red**: `#B22234` - Traditional flag red
- **Primary Blue**: `#3C3B6E` - Traditional flag blue
- **Primary White**: `#FFFFFF` - Clean white
- **Secondary Colors**: Light variants and grayscale scale

### Typography
- **Font Family**: System stack with fallbacks
- **Font Sizes**: 12px-48px responsive scale
- **Headings**: Proper hierarchy with clamp() for responsive sizing

### Component Library
- **Buttons**: Three variants (primary, secondary, tertiary) with hover states
- **Cards**: Consistent styling with subtle shadows and accent borders
- **Inputs**: Focus states with proper contrast
- **Loading States**: Accessible spinners with ARIA attributes

### Enhanced Content Styling
- **Prose Typography**: Tailwind Typography plugin integration for markdown content
- **API Response Styling**: Custom `.prose-lg-custom` class for enhanced search result presentation
- **Header Hierarchy**: Color-coded headers (H1: blue, H2: red, H3: dark blue) with bottom borders
- **Improved Spacing**: Consistent margins and padding for better readability
- **Responsive Typography**: Font sizes adjust for mobile devices
- **Interactive Elements**: Styled links, code blocks, and lists with proper hover states

## 🔍 Search Functionality

The application integrates with the Perplexica API through a worker server for AI-powered search:

### Features
- Real-time search with debouncing
- Loading states with visual feedback
- Error handling with retry logic
- Formatted search results with metadata
- Source attribution and relevance scoring

### Search Flow
1. User enters query in search bar
2. API request is made to Perplexica via worker server
3. Loading state is displayed
4. Results are formatted and displayed
5. User can interact with results

## ♿ Accessibility Features

- WCAG 2.1 AA compliant color contrast ratios
- Semantic HTML structure throughout
- Keyboard navigation support
- ARIA labels and roles for screen readers
- Focus indicators for all interactive elements
- Responsive design for all device sizes

## 📱 Responsive Design

The application is fully responsive with:
- Mobile-first approach
- Breakpoints at 640px, 768px, 1024px, 1280px, and 1536px
- Flexible grid layouts
- Touch-friendly interactive elements
- Optimized typography scaling

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Military spouse community for inspiration and feedback
- Perplexica team for the AI search API
- Vercel for the excellent development platform

---

Built with ❤️ for the military community
