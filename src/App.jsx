import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HeroSection from './components/layout/HeroSection';
import About from './pages/About';
import ResultsList from './components/features/ResultsList';
import usePerplexicaQuery from './hooks/usePerplexicaQuery';

function App() {
  const { results, loading, error, executeQuery, clearResults } = usePerplexicaQuery();
  
  const handleSearch = (query) => {
    executeQuery(query);
  };
  
  const handleResultClick = (result) => {
    if (result.type === 'clear') {
      clearResults();
    } else if (result.action === 'view-full') {
      // Handle viewing full result (could open a modal or navigate to detail page)
      console.log('View full result:', result);
    } else {
      // Handle regular result click (could open in new tab)
      if (result.url && result.url !== '#') {
        window.open(result.url, '_blank', 'noopener,noreferrer');
      }
    }
  };

  return (
    <>
          <Router>
          <Header />
      <div className="min-h-screen flex flex-col mx-auto max-w-7xl">
            
            <main className="flex-grow">
            {/* Hero Section */}
            <HeroSection onSearch={handleSearch} />
            
            {/* Search Results Section */}
            {results && (
              <section className="py-16 bg-white">
                <div className="container">
                  <ResultsList 
                    results={results.sources || []}
                    loading={loading}
                    error={error}
                    query={results.query}
                    onResultClick={handleResultClick}
                  />
                </div>
              </section>
            )}
            
            {/* Default content when no search is performed */}
            {!results && (
              <div className="py-16 bg-white">
                <div className="container">
                  <div className="text-center">
                    <h2 className="heading-2 text-gray-800 mb-8">Ready to find your community?</h2>
                    <p className="body-large text-gray-600 mb-8">
                      Join thousands of military spouses who are already sharing knowledge and supporting each other through PCS moves.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <button 
                        className="btn btn-primary"
                        onClick={() => document.getElementById('search-bar')?.focus()}
                      >
                        Start Searching
                      </button>
                      <button 
                        className="btn btn-tertiary"
                        onClick={() => {
                          // Navigate to about page
                          window.location.href = '/about';
                        }}
                      >
                        Learn More
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            </main>
            
      </div>
      <Footer />

        {/* Routes for different pages */}
        <Routes>
          <Route path="/about" element={<About />} />
          {/* Additional routes can be added here */}
        </Routes>
      </Router>
    </>
  );
}

export default App;
