
import React, { useState } from 'react';
import Header from './components/Header';
import HomePage from './components/HomePage';
import DemoPage from './components/DemoPage';
import PricingPage from './components/PricingPage';
import TeamPage from './components/TeamPage';
import PitchDeckPage from './components/PitchDeckPage';
import type { Page } from './types';

const App: React.FC = () => {
  const [activePage, setActivePage] = useState<Page>('home');

  const renderPage = () => {
    switch (activePage) {
      case 'home':
        return <HomePage setActivePage={setActivePage} />;
      case 'demo':
        return <DemoPage />;
      case 'pricing':
        return <PricingPage />;
      case 'team':
        return <TeamPage />;
      case 'pitch':
        return <PitchDeckPage onClose={() => setActivePage('home')} />;
      default:
        return <HomePage setActivePage={setActivePage} />;
    }
  };

  return (
    <div className="bg-brand-bg text-brand-dark">
      <Header activePage={activePage} setActivePage={setActivePage} />
      <main>
        {renderPage()}
      </main>
      <footer className="bg-white border-t border-gray-100">
        <div className="container mx-auto px-6 py-8 text-center text-brand-gray">
          <p>&copy; {new Date().getFullYear()} FreshPal. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
