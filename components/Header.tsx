
import React from 'react';
import type { Page } from '../types';

interface HeaderProps {
  activePage: Page;
  setActivePage: (page: Page) => void;
}

const ChefHatLogo: React.FC = () => (
    <div className="bg-brand-green p-1.5 rounded-full">
        <svg className="w-6 h-6" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <g>
                <path transform="translate(0.5, 0.5)" d="M 7 21 V 13.5 C 2 13.5, 2 7, 8 7 C 10 3, 14 3, 16 7 C 22 7, 22 13.5, 17 13.5 V 21 Z" fill="#3A7D44" fillOpacity="0.2"/>
                <path d="M 7 21 V 13.5 C 2 13.5, 2 7, 8 7 C 10 3, 14 3, 16 7 C 22 7, 22 13.5, 17 13.5 V 21 Z" fill="#EBF5EE"/>
            </g>
        </svg>
    </div>
);


const Header: React.FC<HeaderProps> = ({ activePage, setActivePage }) => {
  const navItems: { id: Page; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'demo', label: 'Try Demo' },
    { id: 'pricing', label: 'Pricing' },
    { id: 'team', label: 'Team' },
    { id: 'pitch', label: 'Pitch Deck' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 bg-brand-bg/80 backdrop-blur-sm z-50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActivePage('home')}>
            <ChefHatLogo />
            <span className="text-xl font-bold text-brand-dark">FreshPal</span>
        </div>
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActivePage(item.id)}
              className={`text-base font-medium transition-colors ${
                activePage === item.id ? 'text-brand-green' : 'text-brand-gray hover:text-brand-green'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>
        <button 
          onClick={() => setActivePage('demo')}
          className="bg-brand-green text-white px-5 py-2 rounded-lg font-semibold hover:bg-brand-green-light transition-all duration-300 transform hover:scale-105"
        >
          Get Started
        </button>
      </div>
    </header>
  );
};

export default Header;
