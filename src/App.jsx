import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HeroSection from './components/layout/HeroSection';
import About from './pages/About';
import Resources from './pages/Resources';
import usePerplexicaQuery from './hooks/usePerplexicaQuery';

function App() {
  const { results, loading, error, executeQuery, clearResults } = usePerplexicaQuery();
  
  const handleSearch = (query) => {
    executeQuery(query);
  };

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-grow">
          <Routes>
            <Route path="/about" element={<About />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/" element={
              <>
                {/* Hero Section with integrated search and results */}
                <HeroSection 
                  onSearch={handleSearch}
                  results={results}
                  loading={loading}
                  error={error}
                />
              </>
            } />
          </Routes>
        </main>
        
        <Footer />
      </div>
    </Router>
  );
}

export default App;
