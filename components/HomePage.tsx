import React from 'react';
import type { Page } from '../types';

const SparkIcon: React.FC = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-80">
        <path d="M12 2L9.9 7.2L4.5 8.3L8.7 12.2L7.5 17.5L12 14.8L16.5 17.5L15.3 12.2L19.5 8.3L14.1 7.2L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);


const AIBadge: React.FC = () => (
    <div className="inline-flex items-center gap-2 bg-brand-surface text-brand-green text-sm font-semibold px-4 py-2 rounded-full border border-brand-stroke">
        <SparkIcon />
        Your AI Sous Chef
    </div>
);

const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; description: string }> = ({ icon, title, description }) => (
    <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm text-center flex flex-col items-center transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
        <div className="bg-brand-surface p-4 rounded-full mb-6 inline-block">
            {icon}
        </div>
        <h3 className="text-xl font-bold text-brand-dark mb-2">{title}</h3>
        <p className="text-brand-gray text-base">{description}</p>
    </div>
);

const ChefHatIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <g>
            <path transform="translate(0.5, 0.5)" d="M 7 21 V 13.5 C 2 13.5, 2 7, 8 7 C 10 3, 14 3, 16 7 C 22 7, 22 13.5, 17 13.5 V 21 Z" fill="#2D332F" fillOpacity="0.2"/>
            <path d="M 7 21 V 13.5 C 2 13.5, 2 7, 8 7 C 10 3, 14 3, 16 7 C 22 7, 22 13.5, 17 13.5 V 21 Z" fill="#3A7D44"/>
        </g>
    </svg>
);
const ShoppingIcon = () => (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 3H5L5.645 5.78C5.83393 6.64333 6.20894 7.43324 6.73205 8.08205C7.25516 8.73086 7.90793 9.21831 8.63 9.5M8.63 9.5H18L21 6L8.63 9.5Z" stroke="#3A7D44" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M8 21C8.55228 21 9 20.5523 9 20C9 19.4477 8.55228 19 8 19C7.44772 19 7 19.4477 7 20C7 20.5523 7.44772 21 8 21Z" stroke="#3A7D44" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M18 21C18.5523 21 19 20.5523 19 20C19 19.4477 18.5523 19 18 19C17.4477 19 17 19.4477 17 20C17 20.5523 17.4477 21 18 21Z" stroke="#3A7D44" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M6 14H18L17 10.5" stroke="#3A7D44" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>);
const WasteIcon = () => (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#3A7D44" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M12 6V12L16 14" stroke="#3A7D44" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>);

const HomePage: React.FC<{ setActivePage: (page: Page) => void; }> = ({ setActivePage }) => {
  return (
    <div className="pt-24 md:pt-32">
      <section className="text-center py-20">
        <div className="container mx-auto px-6">
          <AIBadge />
          <h1 className="text-4xl md:text-6xl font-extrabold text-brand-dark mt-4 leading-tight">
            Turn Your Pantry Into<br/>
            <span className="text-brand-green">Delicious Meals</span>
          </h1>
          <p className="text-lg text-brand-gray max-w-2xl mx-auto mt-6">
            FreshPal uses AI to transform your leftover ingredients into personalized recipes. Cook smarter, waste less, and discover new favorites.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4">
            <button 
              onClick={() => setActivePage('demo')}
              className="bg-brand-green text-white text-lg px-8 py-4 rounded-xl font-bold hover:bg-brand-green-light transition-all duration-300 transform hover:scale-105 w-full sm:w-auto"
            >
              Try Demo Free
            </button>
            <button 
              onClick={() => setActivePage('pricing')}
              className="bg-white text-brand-green text-lg px-8 py-4 rounded-xl font-bold border-2 border-brand-stroke hover:bg-brand-surface transition-all duration-300 transform hover:scale-105 w-full sm:w-auto"
            >
              View Pricing
            </button>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold text-brand-dark">Everything You Need to Cook Smart</h2>
                <p className="text-lg text-brand-gray mt-4">From ingredient input to step-by-step cooking, FreshPal guides you through every step.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8 mt-12">
                <FeatureCard 
                    icon={<ChefHatIcon />}
                    title="AI Recipe Generation" 
                    description="Enter your ingredients and get personalized recipes instantly with AI-powered suggestions." 
                />
                <FeatureCard 
                    icon={<ShoppingIcon />}
                    title="Smart Shopping"
                    description="Find ingredients at nearby stores with price comparisons and delivery integration." 
                />
                <FeatureCard 
                    icon={<WasteIcon />}
                    title="Reduce Food Waste"
                    description="Get 'use-soon' alerts for expiring ingredients and meal suggestions to minimize waste." 
                />
            </div>
        </div>
      </section>

      <section className="text-center py-20">
        <div className="container mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-dark">Ready to Fall in Love With Cooking?</h2>
            <p className="text-lg text-brand-gray max-w-2xl mx-auto mt-4">
                Start your culinary adventure today. It's free to get started.
            </p>
            <button 
              onClick={() => setActivePage('demo')}
              className="mt-8 bg-brand-green text-white text-lg px-8 py-4 rounded-xl font-bold hover:bg-brand-green-light transition-all duration-300 transform hover:scale-105"
            >
              Generate Your First Recipe
            </button>
        </div>
      </section>
    </div>
  );
};

export default HomePage;