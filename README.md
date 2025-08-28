# AnchorPoint - Military Spouse Community Platform

A React-based web application that helps U.S. military spouses connect, share local knowledge, and rebuild community after Permanent Change of Station (PCS) moves.

## 🚀 Features

### Phase 3: Page Development
- **Landing Page** (src/App.jsx) - Hero section with search functionality, value propositions, and responsive design
- **About Page** (src/pages/About.jsx) - Mission statement, target audience information, and contact details

### Phase 5: Polish & Optimization
- **Accessibility Implementation**
  - Proper color contrast ratios meeting WCAG 2.1 AA standards
  - Focus states for all interactive elements
  - Semantic HTML structure throughout
  - ARIA labels for screen readers
- **SEO Optimization**
  - Comprehensive meta tags in HTML head
  - Proper heading hierarchy (H1-H3)
  - Open Graph and Twitter Card meta tags
  - Crawlable content structure
- **Responsive Design**
  - Mobile-first approach with breakpoints at 640px, 768px, 1024px, 1280px, and 1536px
  - Proper spacing and typography scaling
  - Touch-friendly interactive elements

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

## 🛠️ Technical Stack

### Frontend
- **React** - UI library with hooks and functional components
- **Vite** - Fast build tool and development server
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **PostCSS** - CSS processing

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

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/anchorpoint.git
cd anchorpoint
```

2. Install dependencies:
```bash
npm install
```

4. Start the development server:
```bash
npm run dev
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🌐 API Integration

The application integrates with the Perplexica API for AI-powered search functionality via the functionality in ./worker

## 📱 Responsive Design

The application is fully responsive with:
- Mobile-first approach
- Breakpoints at 640px, 768px, 1024px, 1280px, and 1536px
- Flexible grid layouts
- Touch-friendly interactive elements
- Optimized typography scaling

## ♿ Accessibility Features

- WCAG 2.1 AA compliant color contrast ratios
- Semantic HTML structure
- Keyboard navigation support
- ARIA labels and roles
- Focus indicators for all interactive elements
- Screen reader friendly content

## 🔍 Search Functionality

### Features
- Real-time search with debouncing
- Loading states with visual feedback
- Error handling with retry logic
- Formatted search results with metadata
- Source attribution and relevance scoring

### Search Flow
1. User enters query in search bar
3. API request is made to Perplexica
4. Loading state is displayed
5. Results are formatted and displayed
6. User can interact with results

## 🎯 Future Enhancements

### Phase 2 Features (Planned)
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

## 📞 Contact

- Email: hello@anchorpoint.com
- Community: Join our Facebook group
- Support: 24/7 Military Family Support

---

Built with ❤️ for the military community
