import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import BinCleaning from './components/BinCleaning';
import Process from './components/Process';
import Proof from './components/Proof';
import ServiceArea from './components/ServiceArea';
import Footer from './components/Footer';
import QuoteFlow from './components/QuoteFlow';
import CityPage from './components/CityPage';
import { CITIES } from './data/cities';

function HomePage({ onQuote }) {
  return (
    <>
      <Header onQuote={onQuote} />
      <main>
        <Hero onQuote={onQuote} />
        <Services onQuote={onQuote} />
        <BinCleaning onQuote={onQuote} />
        <Process />
        <Proof />
        <ServiceArea />
      </main>
      <Footer onQuote={onQuote} />
    </>
  );
}

export default function App() {
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [quoteService, setQuoteService] = useState(null);

  const openQuote = (service) => {
    setQuoteService(typeof service === 'string' ? service : null);
    setQuoteOpen(true);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage onQuote={openQuote} />} />
        {CITIES.map((city) => (
          <Route
            key={city.slug}
            path={`/junk-removal-${city.slug}`}
            element={<CityPage city={city} onQuote={openQuote} />}
          />
        ))}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <QuoteFlow
        open={quoteOpen}
        initialService={quoteService}
        onClose={() => setQuoteOpen(false)}
      />
    </BrowserRouter>
  );
}
