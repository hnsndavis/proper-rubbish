import { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import BinCleaning from './components/BinCleaning';
import Process from './components/Process';
import Proof from './components/Proof';
import ServiceArea from './components/ServiceArea';
import Footer from './components/Footer';
import QuoteFlow from './components/QuoteFlow';

export default function App() {
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [quoteService, setQuoteService] = useState(null);

  const openQuote = (service) => {
    setQuoteService(typeof service === 'string' ? service : null);
    setQuoteOpen(true);
  };

  return (
    <>
      <Header onQuote={openQuote} />
      <main>
        <Hero onQuote={openQuote} />
        <Services onQuote={openQuote} />
        <BinCleaning onQuote={openQuote} />
        <Process />
        <Proof />
        <ServiceArea />
      </main>
      <Footer onQuote={openQuote} />
      <QuoteFlow
        open={quoteOpen}
        initialService={quoteService}
        onClose={() => setQuoteOpen(false)}
      />
    </>
  );
}
