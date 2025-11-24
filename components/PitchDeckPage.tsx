
import React, { useState, useEffect } from 'react';

const ArrowRight = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>;
const ArrowLeft = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>;
const PrinterIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect></svg>;

// --- Components ---

type Theme = 'light' | 'green';

const Slide: React.FC<{ children: React.ReactNode; theme?: Theme; className?: string }> = ({ children, theme = 'light', className = "" }) => {
    let themeClasses = 'bg-brand-bg text-brand-dark';
    if (theme === 'green') themeClasses = 'bg-brand-green text-white';

    return (
        <div className={`h-full w-full flex flex-col justify-center items-center p-6 md:p-12 text-center animate-fade-in overflow-y-auto ${themeClasses} ${className} relative print:h-screen print:w-screen print:p-0 print:m-0 print:overflow-hidden`}>
            {children}
        </div>
    );
};

const SectionTitle: React.FC<{ children: React.ReactNode; theme?: Theme }> = ({ children, theme = 'light' }) => (
    <h2 className={`${theme === 'light' ? 'text-brand-green' : 'text-brand-stroke'} text-sm md:text-base font-bold uppercase tracking-widest mb-4 opacity-90`}>
        {children}
    </h2>
);

const MainTitle: React.FC<{ children: React.ReactNode; theme?: Theme }> = ({ children, theme = 'light' }) => (
    <h3 className={`text-3xl md:text-5xl font-extrabold mb-8 md:mb-10 ${theme === 'light' ? 'text-brand-dark' : 'text-white'}`}>
        {children}
    </h3>
);

// Box for grids - adapts to theme
const Box: React.FC<{ title: string; children: React.ReactNode; theme?: Theme; className?: string }> = ({ title, children, theme = 'light', className = "" }) => {
    const boxBg = theme === 'green' ? 'bg-brand-bg text-brand-dark' : 'bg-white text-brand-dark border-brand-stroke shadow-sm';
    const titleColor = 'text-brand-green'; 
    
    return (
        <div className={`${boxBg} border p-4 md:p-5 rounded-xl text-left flex flex-col gap-2 shadow-sm ${className} h-full`}>
            <h4 className={`font-bold uppercase text-sm tracking-wider border-b pb-2 mb-1 ${titleColor} border-gray-100`}>{title}</h4>
            <div className="whitespace-pre-wrap leading-relaxed">{children}</div>
        </div>
    );
};

const MetricCard: React.FC<{ label: string; value: string; desc: string }> = ({ label, value, desc }) => (
    <div className="bg-white/10 backdrop-blur-sm border border-white/20 p-6 rounded-2xl text-left hover:bg-white/20 transition-all duration-300">
        <div className="text-white/70 text-sm font-bold uppercase tracking-wider mb-2">{label}</div>
        <div className="text-4xl font-extrabold text-white mb-2">{value}</div>
        <p className="text-white/80 text-sm leading-relaxed">{desc}</p>
    </div>
);

const SprintStep: React.FC<{ number: string; title: string; desc: string }> = ({ number, title, desc }) => (
    <div className="relative flex flex-col items-center text-center group">
        <div className="w-12 h-12 rounded-full bg-brand-green text-white flex items-center justify-center font-bold text-xl mb-4 shadow-lg group-hover:scale-110 transition-transform">
            {number}
        </div>
        <h4 className="font-bold text-brand-dark text-lg mb-2">{title}</h4>
        <p className="text-sm text-brand-gray">{desc}</p>
    </div>
);

const BacklogRow: React.FC<{ priority: string; task: string; epic: string; notes: string }> = ({ priority, task, epic, notes }) => (
    <tr className="border-b border-gray-100 last:border-0 text-left text-sm hover:bg-gray-50 transition-colors">
        <td className="p-3 font-semibold text-brand-dark">{priority}</td>
        <td className="p-3 text-brand-gray">{task}</td>
        <td className="p-3"><span className="bg-brand-surface text-brand-green px-2 py-1 rounded text-xs font-bold uppercase">{epic}</span></td>
        <td className="p-3 text-gray-500 italic">{notes}</td>
    </tr>
);

const StickyNote: React.FC<{ color: string; children: React.ReactNode }> = ({ color, children }) => (
    <div className={`${color} p-2 rounded shadow-sm text-[10px] md:text-xs leading-tight border border-black/5 min-h-[60px] flex items-center justify-center text-center hover:scale-105 transition-transform`}>
        {children}
    </div>
);

interface PitchDeckPageProps {
    onClose: () => void;
}

const PitchDeckPage: React.FC<PitchDeckPageProps> = ({ onClose }) => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const slides = [
        // -----------------------------------------------------------------------------------------
        // Slide 1: Product Name, Team & Instructor
        // Theme: GREEN
        // -----------------------------------------------------------------------------------------
        <Slide key="slide-1" theme="green">
            <div className="mb-6 p-6 bg-white/10 rounded-full animate-bounce-slow backdrop-blur-sm">
                 <svg className="w-20 h-20 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M7 21V13.5C2 13.5 2 7 8 7C10 3 14 3 16 7C22 7 22 13.5 17 13.5V21Z"/></svg>
            </div>
            <h1 className="text-6xl md:text-8xl font-extrabold mb-4 tracking-tight">FreshPal</h1>
            <p className="text-2xl md:text-3xl font-light text-brand-stroke mb-2">Your Best Pal in the Kitchen 🍳</p>
            <p className="text-lg opacity-80 mb-12">Rice University • November 2025 • RCEL 503</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-left max-w-4xl mx-auto border-t border-white/20 pt-12 w-full">
                <div>
                    <h4 className="font-bold text-white uppercase tracking-wide text-lg mb-4 border-b border-white/30 pb-2">The Team 👥</h4>
                    <ul className="space-y-2 text-xl font-medium text-white">
                        <li>David Kasemervisz</li>
                        <li>Jorgo Qirjaj</li>
                        <li>Minahil Samee</li>
                        <li>Mrtunjay Gupta (MG)</li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-bold text-white uppercase tracking-wide text-lg mb-4 border-b border-white/30 pb-2">The Instructor 🎓</h4>
                    <p className="text-xl font-medium text-white">Dr. Uyiosa Abusomwan</p>
                    <p className="opacity-80 text-lg mt-1 text-white/80">Engineering Product Management</p>
                </div>
            </div>
        </Slide>,

        // -----------------------------------------------------------------------------------------
        // Slide 2: Product + Problem Statement
        // Theme: LIGHT
        // -----------------------------------------------------------------------------------------
        <Slide key="slide-2" theme="light">
            <div className="flex flex-col items-center justify-center max-w-5xl mx-auto">
                <SectionTitle theme="light">The Concept</SectionTitle>
                <MainTitle theme="light">Your Personal Sous Chef 👨‍🍳</MainTitle>
                
                <div className="grid md:grid-cols-2 gap-12 items-center text-left">
                    <div className="bg-brand-surface p-8 rounded-3xl border border-brand-stroke">
                         <div className="mb-6 bg-brand-green text-white w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shadow-lg">
                            🥕
                         </div>
                         <h3 className="text-2xl font-bold text-brand-dark mb-4">What is FreshPal?</h3>
                         <p className="text-lg text-brand-gray leading-relaxed">
                            Think of FreshPal as your personal sous chef in the kitchen! It’s a software mobile app, using AI technology to suggest personalized recipes.
                         </p>
                    </div>
                    <div className="space-y-6">
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 transform hover:scale-105 transition-transform">
                             <h4 className="text-xl font-bold text-brand-green mb-2">🔌 Integration</h4>
                             <p className="text-brand-gray">We integrate with your pantry, fridge, and kitchen and suggest recipes based on the ingredients you have available at home.</p>
                        </div>
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 transform hover:scale-105 transition-transform">
                             <h4 className="text-xl font-bold text-brand-green mb-2">✨ Personalization</h4>
                             <p className="text-brand-gray">No more "What's for dinner?". Get suggestions tailored to your specific dietary needs and skill level.</p>
                        </div>
                    </div>
                </div>
            </div>
        </Slide>,

        // -----------------------------------------------------------------------------------------
        // Slide 3: Vision (Elevator Test)
        // Theme: LIGHT
        // -----------------------------------------------------------------------------------------
        <Slide key="slide-3" theme="light">
            <SectionTitle theme="light">Product Vision</SectionTitle>
            <MainTitle theme="light">The Elevator Pitch 🚀</MainTitle>
            
            <div className="max-w-5xl bg-white p-10 md:p-14 rounded-3xl border border-gray-200 shadow-xl text-left relative">
                <div className="absolute -top-5 left-10 bg-brand-green text-white px-6 py-2 text-sm font-bold rounded-full uppercase tracking-wide shadow-md">
                    Elevator Test Statement
                </div>
                <p className="text-2xl md:text-4xl leading-relaxed text-brand-dark font-medium">
                    For <span className="text-brand-green font-bold">young adults & novice cooks</span> who struggle with <span className="text-brand-green font-bold">little cooking experience & finding ingredients</span>, <span className="text-brand-green font-bold underline decoration-brand-green/30 underline-offset-4 decoration-4">FreshPal</span> is an <span className="text-brand-green font-bold">end-to-end cooking assistant</span> that creates <span className="text-brand-green font-bold">personalized meals</span> and integrates with <span className="text-brand-green font-bold">local grocery stores</span>.
                </p>
                <div className="mt-10 pt-8 border-t border-gray-100 flex gap-6 items-start">
                    <div className="text-4xl">💡</div>
                    <p className="text-xl text-brand-gray leading-relaxed">
                        Unlike <span className="font-bold text-red-500">traditional recipe apps</span>, FreshPal offers a <span className="font-bold text-brand-green">seamless, confidence-building experience</span> that makes cooking feel accessible, nourishing, and alive.
                    </p>
                </div>
            </div>
        </Slide>,

        // -----------------------------------------------------------------------------------------
        // Slide 4: Product Vision Board
        // Theme: GREEN
        // -----------------------------------------------------------------------------------------
        <Slide key="slide-4" theme="green">
            <div className="w-full max-w-[1800px] h-full flex flex-col px-4 pb-4">
                <div className="flex justify-center items-center mb-6">
                    <MainTitle theme="green">Product Vision Board 🔭</MainTitle>
                </div>
                
                <div className="bg-white/10 text-white p-6 rounded-2xl mb-6 text-left shadow-lg border border-white/20 backdrop-blur-sm">
                    <h4 className="font-bold text-white uppercase text-xl mb-2 tracking-wider">🌟 VISION</h4>
                    <p className="text-xl md:text-2xl font-medium leading-relaxed">
                        To empower novice cooks with an intelligent, end-to-end kitchen assistant that simplifies meal creation, integrates local shopping, and eliminates food waste.
                    </p>
                </div>

                <div className="flex-1 grid grid-cols-4 grid-rows-2 gap-4 text-brand-dark">
                    <Box title="TARGET GROUP 🎯" theme="green">
                        <ul className="list-disc list-inside text-base md:text-lg font-semibold space-y-1">
                            <li>Young adults</li>
                            <li>Novice cooks</li>
                            <li>Busy grad students</li>
                            <li>People learning to cook</li>
                        </ul>
                    </Box>
                    <Box title="NEEDS 🆘" theme="green">
                        <ul className="list-disc list-inside text-base md:text-lg font-semibold space-y-1">
                            <li>No cooking experience</li>
                            <li>No ingredients</li>
                            <li>No pickup service</li>
                            <li>No knowledge of local stores</li>
                        </ul>
                    </Box>
                    <Box title="PRODUCT 🍱" theme="green">
                        <ul className="list-disc list-inside text-base md:text-lg font-semibold space-y-1">
                            <li>AI-powered recipe/cooking</li>
                            <li>End-to-end cooking</li>
                            <li>Integration with store chains</li>
                            <li>Compare prices at different stores</li>
                        </ul>
                    </Box>
                    <Box title="BUSINESS GOAL 💼" theme="green">
                        <ul className="list-disc list-inside text-base md:text-lg font-semibold space-y-1">
                            <li>Contracts with Supermarkets (HEB)</li>
                            <li>Monetize SaaS model</li>
                            <li>Partner with Universities</li>
                            <li>Build helper AI platform</li>
                        </ul>
                    </Box>

                    <Box title="COMPETITORS 🏎️" theme="green">
                        <p className="text-base md:text-lg font-semibold mb-2"><strong>Indirect:</strong> Instacart, HelloFresh</p>
                        <p className="text-base md:text-lg font-semibold"><strong>Cookbooks/Online Recipes:</strong></p>
                        <p className="text-sm text-gray-500 italic">Weakness: Not interactive, no AI, no store integration.</p>
                    </Box>
                    <Box title="REVENUE STREAMS 💸" theme="green">
                        <ul className="list-disc list-inside text-base md:text-lg font-semibold space-y-1">
                            <li>SaaS model for young pros</li>
                            <li>Free tier: In-app ads</li>
                            <li>Paid feature: Delivery + AI Builder</li>
                            <li>Convert free AI users to paid</li>
                        </ul>
                    </Box>
                    <Box title="COST FACTORS 📉" theme="green">
                        <ul className="list-disc list-inside text-base md:text-lg font-semibold space-y-1">
                            <li>Tech Development (Web/Mobile)</li>
                            <li>AI Development & Usage</li>
                            <li>Digital Marketing</li>
                            <li>Data Privacy & Security</li>
                        </ul>
                    </Box>
                    <Box title="CHANNELS 📢" theme="green">
                        <ul className="list-disc list-inside text-base md:text-lg font-semibold space-y-1">
                            <li>Web Marketing & Google Ads</li>
                            <li>Word of mouth</li>
                            <li>Influencer marketing</li>
                        </ul>
                    </Box>
                </div>
            </div>
        </Slide>,

        // -----------------------------------------------------------------------------------------
        // Slide 5: Startup Canvas
        // Theme: LIGHT
        // -----------------------------------------------------------------------------------------
        <Slide key="slide-5" theme="light">
            <div className="w-full max-w-[1800px] h-full flex flex-col p-2">
                <div className="text-center mb-6">
                    <MainTitle theme="light">Startup Canvas 🎨</MainTitle>
                </div>
                
                <div className="flex-1 grid grid-cols-5 gap-4">
                    <div className="col-span-1 flex flex-col gap-4">
                        <Box title="PROBLEM 😫" theme="light" className="flex-1">
                            <ul className="list-disc list-inside text-sm md:text-base font-medium space-y-2">
                                <li>No Cooking Experience</li>
                                <li>Lack of meal inspiration with limited ingredients</li>
                                <li>Ordering expensive take-outs</li>
                                <li>Unfamiliar with recipes</li>
                            </ul>
                        </Box>
                        <Box title="EXISTING ALTERNATIVES 🔄" theme="light" className="flex-1">
                             <ul className="list-disc list-inside text-sm md:text-base font-medium space-y-2">
                                <li>Cookbooks & Online Recipes</li>
                                <li>Instacart / Grocery Delivery</li>
                                <li>HelloFresh (Meal Kits)</li>
                                <li>Social Media tutorials</li>
                             </ul>
                        </Box>
                    </div>

                    <div className="col-span-1 flex flex-col gap-4">
                        <Box title="SOLUTION 💡" theme="light" className="flex-1">
                             <ul className="list-disc list-inside text-sm md:text-base font-medium space-y-2">
                                <li>AI powered recipe generator</li>
                                <li>Integration with local grocery chains</li>
                                <li>End-to-end cooking support</li>
                                <li>Turns pantry ingredients into new recipes</li>
                            </ul>
                        </Box>
                         <Box title="KEY METRICS 📊" theme="light" className="flex-1">
                             <ul className="list-disc list-inside text-sm md:text-base font-medium space-y-2">
                                <li>Customer Acquisition Costs</li>
                                <li>Customer Retention Rate</li>
                                <li>Free to paid conversion</li>
                                <li>User Engagement Time</li>
                             </ul>
                        </Box>
                    </div>

                    <div className="col-span-1 flex flex-col gap-4">
                        <Box title="UNIQUE VALUE PROP 🦄" theme="light" className="h-full bg-brand-surface border-brand-green border-2">
                             <p className="text-base md:text-lg font-bold leading-relaxed mb-4">
                                FreshPal is the only end-to-end cooking assistant that connects your pantry, recipes, and local grocery stores.
                             </p>
                             <div className="mt-auto pt-4 border-t border-brand-stroke text-center">
                                <strong className="text-brand-green block text-lg">"Montessori for Cooking"</strong>
                                <span className="text-sm">Polished, accessible personal sous chef.</span>
                             </div>
                        </Box>
                    </div>

                    <div className="col-span-1 flex flex-col gap-4">
                         <Box title="UNFAIR ADVANTAGE ⚡" theme="light" className="flex-1">
                             <ul className="list-disc list-inside text-sm md:text-base font-medium space-y-2">
                                <li>AI generation based on dietary needs</li>
                                <li>Takes into account existing pantry items</li>
                                <li>Real-time integration with grocery store data</li>
                                <li>Simplicity: End-to-end user engagement</li>
                            </ul>
                        </Box>
                        <Box title="CHANNELS 📢" theme="light" className="flex-1">
                             <ul className="list-disc list-inside text-sm md:text-base font-medium space-y-2">
                                <li>Social Media Marketing</li>
                                <li>Food/lifestyle influencers</li>
                                <li>Google ads</li>
                                <li>Partnerships with universities</li>
                             </ul>
                        </Box>
                    </div>

                    <div className="col-span-1 flex flex-col gap-4">
                         <Box title="CUSTOMER SEGMENTS 👥" theme="light" className="flex-1">
                             <ul className="list-disc list-inside text-sm md:text-base font-medium space-y-2">
                                <li>Young Adults beginning to cook</li>
                                <li>Busy students and professionals</li>
                                <li>Novice cooks</li>
                                <li>Price conscious households</li>
                            </ul>
                        </Box>
                        <Box title="EARLY ADOPTERS 🐣" theme="light" className="flex-1">
                             <ul className="list-disc list-inside text-sm md:text-base font-medium space-y-2">
                                <li>Students looking for cheaper alternatives to take-out</li>
                                <li>Professionals with less time</li>
                                <li>Tech savvy students</li>
                             </ul>
                        </Box>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-4 h-auto">
                    <Box title="COST STRUCTURE 💸" theme="light" className="bg-gray-50">
                        <div className="flex gap-8">
                            <div>
                                <strong>Fixed:</strong>
                                <ul className="list-disc list-inside text-sm md:text-base"><li>Product Dev</li><li>AI Dev</li><li>Legal</li></ul>
                            </div>
                            <div>
                                <strong>Variable:</strong>
                                <ul className="list-disc list-inside text-sm md:text-base"><li>AI Usage</li><li>Marketing</li><li>Support</li></ul>
                            </div>
                        </div>
                    </Box>
                    <Box title="REVENUE STREAMS 💰" theme="light" className="bg-gray-50">
                        <ul className="list-disc list-inside text-sm md:text-base grid grid-cols-2">
                            <li>Subscription Model</li>
                            <li>Advertisement (Free tier)</li>
                            <li>Paid Tier - Unlimited Recipes</li>
                            <li>Grocery chain partnerships</li>
                        </ul>
                    </Box>
                 </div>
            </div>
        </Slide>,

        // -----------------------------------------------------------------------------------------
        // Slide 6: Product Roadmap
        // Theme: LIGHT
        // -----------------------------------------------------------------------------------------
        <Slide key="slide-6" theme="light">
            <SectionTitle theme="light">Product Roadmap</SectionTitle>
            <MainTitle theme="light">Now, Next, Later 🗺️</MainTitle>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-7xl text-left h-3/4">
                {/* NOW */}
                <div className="border-t-8 border-red-400 bg-white rounded-2xl p-6 flex flex-col h-full shadow-lg">
                    <div className="flex justify-between items-center mb-6 border-b pb-4">
                        <h4 className="text-3xl font-bold text-brand-dark">NOW</h4>
                        <span className="bg-red-50 text-red-600 px-3 py-1 rounded-full text-sm font-bold">0-6 Months</span>
                    </div>
                    <ul className="space-y-3 flex-1 overflow-y-auto">
                        {['User onboarding flow (dietary restrictions)', 'AI-Powered recipe creator with ingredient input', 'Local store integration (pilot)', 'Free tier with ads (Foodie)'].map((item, i) => (
                            <li key={i} className="bg-brand-surface p-4 rounded-lg border border-brand-stroke text-base font-medium text-brand-dark">
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* NEXT */}
                <div className="border-t-8 border-blue-400 bg-white rounded-2xl p-6 flex flex-col h-full shadow-lg">
                    <div className="flex justify-between items-center mb-6 border-b pb-4">
                        <h4 className="text-3xl font-bold text-brand-dark">NEXT</h4>
                        <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-sm font-bold">6-12 Months</span>
                    </div>
                    <ul className="space-y-3 flex-1 overflow-y-auto">
                        {['Improved AI (smart filters)', 'Improved AI (smart shopping, suggest best price/proximity)', 'Official partnership with big store chains (H.E.B. API)', 'Paid tiers (Foodie, Cook, Chef, Master Chef)', 'User reviews recipes', 'Sort recipes with filters'].map((item, i) => (
                            <li key={i} className="bg-brand-surface p-4 rounded-lg border border-brand-stroke text-base font-medium text-brand-dark">
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* LATER */}
                <div className="border-t-8 border-yellow-400 bg-white rounded-2xl p-6 flex flex-col h-full shadow-lg">
                    <div className="flex justify-between items-center mb-6 border-b pb-4">
                        <h4 className="text-3xl font-bold text-brand-dark">LATER</h4>
                        <span className="bg-yellow-50 text-yellow-600 px-3 py-1 rounded-full text-sm font-bold">12-24 Months</span>
                    </div>
                    <ul className="space-y-3 flex-1 overflow-y-auto">
                        {['Order + delivery service', 'AI Cooking Assistant (end-to-end AI)', '"My Kitchen" inventory with premium plans', 'User/custom generated recipes', 'Social Media Cook Club', 'University partnerships', 'Nutrition Tracker', 'PaceSync Voice'].map((item, i) => (
                            <li key={i} className="bg-brand-surface p-4 rounded-lg border border-brand-stroke text-base font-medium text-brand-dark">
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </Slide>,

         // -----------------------------------------------------------------------------------------
         // Slide 7: Product Strategy (OKRs)
         // Theme: GREEN
         // -----------------------------------------------------------------------------------------
         <Slide key="slide-7" theme="green">
            <div className="w-full max-w-7xl">
                <SectionTitle theme="green">Product Strategy</SectionTitle>
                <MainTitle theme="green">OKRs & Metrics 📈</MainTitle>
                
                <div className="bg-white text-brand-dark p-8 md:p-10 rounded-3xl shadow-2xl mb-12 text-left relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                        <svg className="w-64 h-64 text-brand-green" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/></svg>
                    </div>
                    <div className="bg-brand-green text-white text-xs font-bold px-4 py-1.5 rounded-full inline-block mb-4 tracking-wider">PRIMARY OBJECTIVE</div>
                    <h2 className="text-3xl md:text-4xl font-bold leading-tight relative z-10">
                        Build an MVP that gets <span className="text-brand-green">users excited to start cooking</span> and becomes the <span className="text-brand-green">go-to app</span> in the SaaS food/health industry by 2028.
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <MetricCard 
                        label="KPI: MRR Growth" 
                        value="$5K / mo" 
                        desc="Target Monthly Recurring Revenue by Q3 via 'Chef' premium tier conversions."
                    />
                     <MetricCard 
                        label="KPI: ARR Scale" 
                        value="$420K" 
                        desc="Projected Annual Recurring Revenue by 2030 with active global user base."
                    />
                     <MetricCard 
                        label="KPI: Efficiency" 
                        value="↓ 50% CAC" 
                        desc="Reduce Customer Acquisition Cost by 2027 through viral loops & referrals."
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                     <div className="bg-brand-dark/30 p-6 rounded-xl border border-white/10">
                        <div className="text-brand-surface font-bold mb-1 uppercase text-xs">Key Result 1</div>
                        <p className="text-xl font-semibold text-white">30% retention rate</p>
                        <p className="text-sm opacity-70 mt-1">Users generate a 3rd recipe within a week.</p>
                     </div>
                     <div className="bg-brand-dark/30 p-6 rounded-xl border border-white/10">
                        <div className="text-brand-surface font-bold mb-1 uppercase text-xs">Key Result 2</div>
                        <p className="text-xl font-semibold text-white">100+ 5-Star Reviews</p>
                        <p className="text-sm opacity-70 mt-1">Gather positive feedback in Q1 launch.</p>
                     </div>
                     <div className="bg-brand-dark/30 p-6 rounded-xl border border-white/10">
                        <div className="text-brand-surface font-bold mb-1 uppercase text-xs">Key Result 3</div>
                        <p className="text-xl font-semibold text-white">15% Conversion</p>
                        <p className="text-sm opacity-70 mt-1">Free users converting to paid by End of Q2.</p>
                     </div>
                </div>
            </div>
         </Slide>,

        // -----------------------------------------------------------------------------------------
        // Slide 8: Word Cloud (Inserted)
        // Theme: LIGHT
        // -----------------------------------------------------------------------------------------
        <Slide key="slide-wordcloud" theme="light">
            <SectionTitle theme="light">User Research</SectionTitle>
            <MainTitle theme="light">Voice of the Customer 🗣️</MainTitle>
            <div className="flex flex-wrap justify-center items-center content-center gap-x-12 gap-y-8 max-w-6xl h-full p-8">
                {/* Large Pain Points */}
                <span className="text-6xl font-extrabold text-red-400 opacity-80 rotate-[-5deg]">"Burnt Chicken!"</span>
                <span className="text-4xl font-bold text-gray-600 opacity-90">Expensive Takeout</span>
                <span className="text-7xl font-black text-brand-dark rotate-[2deg]">"I Starved"</span>
                <span className="text-4xl font-bold text-gray-400 rotate-[-3deg]">Messy Kitchen</span>
                <span className="text-6xl font-bold text-red-300">Wasted Food</span>
                
                {/* Medium Context */}
                <span className="text-3xl font-semibold text-brand-green">Busy Student</span>
                <span className="text-5xl font-bold text-gray-700">"Chore"</span>
                <span className="text-4xl font-semibold text-gray-500 rotate-[4deg]">Running Out</span>
                <span className="text-3xl font-bold text-red-200">Smoke!</span>
                <span className="text-5xl font-bold text-brand-dark">Overwhelmed</span>

                {/* Smaller Details */}
                <span className="text-2xl text-gray-400">Miscalculated</span>
                <span className="text-4xl font-bold text-gray-600">Lack of Tools</span>
                <span className="text-3xl text-gray-500 rotate-[-2deg]">Under seasoned</span>
                <span className="text-2xl text-gray-400">No Time</span>
                <span className="text-6xl font-bold text-gray-800">"Help!"</span>
                
                {/* Solution Hints */}
                <span className="text-4xl font-bold text-brand-green opacity-80">Simple Recipes?</span>
                <span className="text-3xl font-bold text-brand-green opacity-70">Step-by-step</span>
            </div>
            <div className="mt-8 text-brand-gray italic text-lg border-t pt-4">
                Highlights from user interviews with students, young adults, and novice cooks.
            </div>
        </Slide>,

        // -----------------------------------------------------------------------------------------
        // Slide 9: Product Discovery
        // Theme: GREEN
        // -----------------------------------------------------------------------------------------
        <Slide key="slide-8" theme="green">
            <SectionTitle theme="green">Product Discovery</SectionTitle>
            <MainTitle theme="green">Validating the Need 🔍</MainTitle>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl text-left w-full mx-auto h-full items-stretch">
                <div className="bg-white/10 p-8 rounded-3xl border border-white/20 flex flex-col hover:bg-white/20 transition-all">
                    <div className="text-5xl mb-6">🗣️</div>
                    <strong className="block text-white text-3xl mb-4">Customer Interviews</strong>
                    <p className="text-brand-surface text-lg leading-relaxed">
                        Interviewed students and busy professionals to understand pain points. <br/><br/>
                        <strong>Key Insight:</strong> "I have ingredients but don't know what to make, so I order out."
                    </p>
                </div>
                <div className="bg-white/10 p-8 rounded-3xl border border-white/20 flex flex-col hover:bg-white/20 transition-all">
                    <div className="text-5xl mb-6">🛠️</div>
                    <strong className="block text-white text-3xl mb-4">Prototyping & MVP</strong>
                    <p className="text-brand-surface text-lg leading-relaxed">
                        Initial plan was a Figma prototype, but we decided to create a functional MVP with low resources leveraging <strong>Google AI Studio</strong>, <strong>GitHub</strong>, and <strong>Vercel</strong>.
                    </p>
                </div>
                <div className="bg-white/10 p-8 rounded-3xl border border-white/20 flex flex-col hover:bg-white/20 transition-all">
                     <div className="text-5xl mb-6">🧪</div>
                     <strong className="block text-white text-3xl mb-4">Testing</strong>
                    <p className="text-brand-surface text-lg leading-relaxed">
                        Conducted rigorous testing with the MVP before launch to validate the "Ingredient-to-Recipe" core loop with real users.
                    </p>
                </div>
            </div>
        </Slide>,

        // -----------------------------------------------------------------------------------------
        // Slide 10: Product Delivery (Scrum Process)
        // Theme: LIGHT
        // -----------------------------------------------------------------------------------------
        <Slide key="slide-9" theme="light">
            <div className="w-full max-w-7xl">
                <SectionTitle theme="light">Product Delivery Method</SectionTitle>
                <MainTitle theme="light">Agile Engineering & Scrum 🔄</MainTitle>
                
                <div className="bg-brand-surface p-12 rounded-3xl border border-brand-stroke mb-12 shadow-md">
                    <h4 className="text-3xl font-bold text-brand-dark mb-8 text-center">The Scrum Cycle</h4>
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4 relative">
                        {/* Connecting Line */}
                        <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-gray-200 -z-0 transform -translate-y-1/2"></div>
                        
                        <div className="relative z-10 bg-brand-surface px-4"><SprintStep number="1" title="Backlog" desc="User Stories" /></div>
                        <div className="relative z-10 bg-brand-surface px-4"><SprintStep number="2" title="Planning" desc="Commitment" /></div>
                        <div className="relative z-10 bg-brand-surface px-4"><SprintStep number="3" title="Daily" desc="Stand-ups" /></div>
                        <div className="relative z-10 bg-brand-surface px-4"><SprintStep number="4" title="Review" desc="Demo MVP" /></div>
                        <div className="relative z-10 bg-brand-surface px-4"><SprintStep number="5" title="Retro" desc="Improvement" /></div>
                    </div>
                </div>

                <div className="text-center max-w-3xl mx-auto">
                     <p className="text-xl text-brand-gray italic">
                        "FreshPal is a consumer app with evolving requirements. Scrum allows us to test small increments—like recipe generation—with real users and pivot quickly based on feedback."
                    </p>
                </div>
            </div>
        </Slide>,

        // -----------------------------------------------------------------------------------------
        // Slide 11: Artifacts - Product Backlog
        // Theme: LIGHT
        // -----------------------------------------------------------------------------------------
        <Slide key="slide-10" theme="light">
            <SectionTitle theme="light">Artifacts</SectionTitle>
            <MainTitle theme="light">Product Backlog 📝</MainTitle>
            
            <div className="w-full max-w-6xl bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden text-left h-[70vh] flex flex-col">
                <div className="overflow-auto custom-scrollbar">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-200 sticky top-0 z-10">
                            <tr>
                                <th className="p-4 text-left font-bold text-brand-dark">Priority</th>
                                <th className="p-4 text-left font-bold text-brand-dark w-1/3">User Story / Task</th>
                                <th className="p-4 text-left font-bold text-brand-dark">Epic</th>
                                <th className="p-4 text-left font-bold text-brand-dark w-1/3">Rationale</th>
                            </tr>
                        </thead>
                        <tbody>
                            <BacklogRow priority="High" task="Dietary restriction" epic="Manage recipes" notes="Aligns suggestions with user values." />
                            <BacklogRow priority="High" task="Input ingredients" epic="Generate recipe" notes="Manual entry for planning." />
                            <BacklogRow priority="High" task="AI-Recipe Generation" epic="Generate recipe" notes="Core value prop." />
                            <BacklogRow priority="High" task="Export shopping list" epic="Manage recipes" notes="Bridges recipe → shopping." />
                            <BacklogRow priority="High" task="Scan pantry items" epic="Get onboarded" notes="Inventory tracking." />
                            <BacklogRow priority="High" task="Filter/see open stores" epic="Find optimal store" notes="Key for convenience." />
                            <BacklogRow priority="High" task="Delete favorite recipes" epic="Favorite recipe" notes="User control." />
                            <BacklogRow priority="Medium" task="Add/remove cart items" epic="Manage store cart" notes="Precursor to full integration." />
                            <BacklogRow priority="Medium" task="Compare item prices" epic="Manage store cart" notes="Supports 'affordable meals' prop." />
                             <BacklogRow priority="Medium" task="Compare price of cart" epic="Manage store cart" notes="Deeper comparison." />
                             <BacklogRow priority="Medium" task="See store info" epic="Find optimal store" notes="Builds trust." />
                            <BacklogRow priority="Medium" task="Nearest + cheapest" epic="Find optimal store" notes="Location-aware value." />
                             <BacklogRow priority="Medium" task="Integrate Maps" epic="Find optimal store" notes="Enables navigation." />
                             <BacklogRow priority="Low" task="Auto add online carts" epic="Manage store cart" notes="Complex integrations." />
                             <BacklogRow priority="Low" task="Step-by-step onboarding" epic="Get onboarded" notes="Polish." />
                        </tbody>
                    </table>
                </div>
            </div>
        </Slide>,

         // -----------------------------------------------------------------------------------------
        // Slide 12: Artifacts - Priority Matrix
        // Theme: LIGHT
        // -----------------------------------------------------------------------------------------
        <Slide key="slide-11" theme="light">
            <SectionTitle theme="light">Artifacts</SectionTitle>
            <MainTitle theme="light">Prioritization Matrix ⚖️</MainTitle>
            
            <div className="w-full max-w-6xl grid grid-cols-2 gap-6 h-[70vh]">
                {/* High Value / Low Effort */}
                <div className="bg-green-50 rounded-2xl p-6 border border-green-200 relative overflow-y-auto custom-scrollbar">
                    <div className="sticky top-0 bg-green-50 pb-2 z-10 border-b border-green-200 mb-4">
                        <span className="bg-green-200 text-green-800 px-3 py-1 rounded-full text-xs font-bold uppercase">Prioritize (High Value, Low Effort)</span>
                    </div>
                    <div className="space-y-3">
                        <div className="bg-white p-3 shadow-sm rounded border border-green-100 text-sm">Create Profile & Save Prefs</div>
                        <div className="bg-white p-3 shadow-sm rounded border border-green-100 text-sm">Input Ingredients</div>
                        <div className="bg-white p-3 shadow-sm rounded border border-green-100 text-sm">Specify Allergies</div>
                        <div className="bg-white p-3 shadow-sm rounded border border-green-100 text-sm">View Essential Recipe Details</div>
                        <div className="bg-white p-3 shadow-sm rounded border border-green-100 text-sm">Receive quick AI recipe suggestions</div>
                    </div>
                </div>

                {/* High Value / High Effort */}
                <div className="bg-blue-50 rounded-2xl p-6 border border-blue-200 relative overflow-y-auto custom-scrollbar">
                    <div className="sticky top-0 bg-blue-50 pb-2 z-10 border-b border-blue-200 mb-4">
                        <span className="bg-blue-200 text-blue-800 px-3 py-1 rounded-full text-xs font-bold uppercase">Investigate (High Value, High Effort)</span>
                    </div>
                    <div className="space-y-3">
                        <div className="bg-white p-3 shadow-sm rounded border border-blue-100 text-sm">Add/Remove Items from Cart (Real-time)</div>
                        <div className="bg-white p-3 shadow-sm rounded border border-blue-100 text-sm">Compare Cart Prices Across Stores</div>
                        <div className="bg-white p-3 shadow-sm rounded border border-blue-100 text-sm">See Nearest + Cheapest Stores</div>
                        <div className="bg-white p-3 shadow-sm rounded border border-blue-100 text-sm">Filter/See Store Info</div>
                    </div>
                </div>

                 {/* Low Value / Low Effort */}
                 <div className="bg-yellow-50 rounded-2xl p-6 border border-yellow-200 relative overflow-y-auto custom-scrollbar">
                    <div className="sticky top-0 bg-yellow-50 pb-2 z-10 border-b border-yellow-200 mb-4">
                         <span className="bg-yellow-200 text-yellow-800 px-3 py-1 rounded-full text-xs font-bold uppercase">Consider (Low Value, Low Effort)</span>
                    </div>
                     <div className="space-y-3">
                        <div className="bg-white p-3 shadow-sm rounded border border-yellow-100 text-sm">Manage Profile Photo</div>
                        <div className="bg-white p-3 shadow-sm rounded border border-yellow-100 text-sm">Watch Onboarding Video</div>
                         <div className="bg-white p-3 shadow-sm rounded border border-yellow-100 text-sm">Manage Info Easily</div>
                    </div>
                </div>

                 {/* Low Value / High Effort */}
                 <div className="bg-red-50 rounded-2xl p-6 border border-red-200 relative overflow-y-auto custom-scrollbar">
                    <div className="sticky top-0 bg-red-50 pb-2 z-10 border-b border-red-200 mb-4">
                         <span className="bg-red-200 text-red-800 px-3 py-1 rounded-full text-xs font-bold uppercase">Avoid (Low Value, High Effort)</span>
                    </div>
                     <div className="space-y-3">
                        <div className="bg-white p-3 shadow-sm rounded border border-red-100 text-sm">Automated "Smart" Cart Management</div>
                    </div>
                </div>
            </div>
        </Slide>,

        // -----------------------------------------------------------------------------------------
        // Slide 13: Artifacts - User Story Map
        // Theme: LIGHT
        // -----------------------------------------------------------------------------------------
        <Slide key="slide-12" theme="light">
            <SectionTitle theme="light">Artifacts</SectionTitle>
            <MainTitle theme="light">User Story Map 🗺️</MainTitle>
            
            <div className="w-full h-full max-w-[1800px] bg-white rounded-xl shadow-sm border border-gray-200 overflow-auto p-6 text-left relative flex flex-col">
                <div className="min-w-[1200px] flex-1 flex flex-col gap-6">
                    {/* THEMES */}
                    <div className="grid grid-cols-12 gap-4">
                        <div className="col-span-1 font-bold text-xl self-center bg-lime-200 p-2 rounded">THEMES</div>
                         <div className="col-span-3 bg-brand-surface border border-brand-green/30 p-3 rounded-lg font-bold text-center flex items-center justify-center shadow-sm">Account + User Preferences</div>
                         <div className="col-span-1"></div>
                         <div className="col-span-2 bg-brand-surface border border-brand-green/30 p-3 rounded-lg font-bold text-center flex items-center justify-center shadow-sm">Generate Recipes w/ AI</div>
                         <div className="col-span-2"></div>
                         <div className="col-span-2 bg-brand-surface border border-brand-green/30 p-3 rounded-lg font-bold text-center flex items-center justify-center shadow-sm">Find Local Stores</div>
                         <div className="col-span-1"></div>
                    </div>

                    {/* EPICS */}
                    <div className="grid grid-cols-12 gap-2 border-t pt-4 border-gray-100">
                        <div className="col-span-1 font-bold text-xl self-center bg-pink-200 p-2 rounded">EPICS</div>
                        <div className="col-span-1 bg-pink-50 p-3 rounded-md text-center font-bold text-xs border border-pink-100 shadow-sm">Manage Account</div>
                        <div className="col-span-1 bg-pink-50 p-3 rounded-md text-center font-bold text-xs border border-pink-100 shadow-sm">Specify Dietary</div>
                        <div className="col-span-1 bg-pink-50 p-3 rounded-md text-center font-bold text-xs border border-pink-100 shadow-sm">Get Onboarded</div>
                        <div className="col-span-1"></div>
                        <div className="col-span-1 bg-pink-50 p-3 rounded-md text-center font-bold text-xs border border-pink-100 shadow-sm">Generate Recipe</div>
                        <div className="col-span-1 bg-pink-50 p-3 rounded-md text-center font-bold text-xs border border-pink-100 shadow-sm">Manage Recipes</div>
                        <div className="col-span-1 bg-pink-50 p-3 rounded-md text-center font-bold text-xs border border-pink-100 shadow-sm">Favorite Recipe</div>
                        <div className="col-span-1"></div>
                        <div className="col-span-1 bg-pink-50 p-3 rounded-md text-center font-bold text-xs border border-pink-100 shadow-sm">Find Optimal Store</div>
                        <div className="col-span-1 bg-pink-50 p-3 rounded-md text-center font-bold text-xs border border-pink-100 shadow-sm">Manage Store Cart</div>
                    </div>

                    {/* MVP STORIES */}
                    <div className="grid grid-cols-12 gap-2 border-t pt-4 border-gray-100 bg-blue-50/30 p-2 rounded-xl">
                        <div className="col-span-1 font-bold text-xl self-center bg-blue-200 p-2 rounded">MVP</div>
                        
                        {/* Column 1: Manage Account */}
                        <div className="col-span-1 flex flex-col gap-2">
                             <StickyNote color="bg-blue-200">Create profile, save preferences</StickyNote>
                             <StickyNote color="bg-blue-200">Manage my profile & edit info</StickyNote>
                        </div>
                        
                        {/* Column 2: Dietary */}
                        <div className="col-span-1 flex flex-col gap-2">
                             <StickyNote color="bg-blue-200">Specify allergies during sign-up</StickyNote>
                             <StickyNote color="bg-blue-200">Edit my allergies</StickyNote>
                        </div>

                        {/* Column 3: Onboarding */}
                        <div className="col-span-1 flex flex-col gap-2">
                            <StickyNote color="bg-blue-200">Watch onboarding video</StickyNote>
                        </div>

                        <div className="col-span-1"></div>

                        {/* Column 4: Generate Recipe */}
                        <div className="col-span-1 flex flex-col gap-2">
                             <StickyNote color="bg-blue-200">Input ingredients -> Get Recipe</StickyNote>
                             <StickyNote color="bg-blue-200">Quick AI suggestions from pantry</StickyNote>
                        </div>

                        {/* Column 5: Manage Recipes */}
                        <div className="col-span-1 flex flex-col gap-2">
                             <StickyNote color="bg-blue-200">View essential details</StickyNote>
                             <StickyNote color="bg-blue-200">Save recipes in folders</StickyNote>
                        </div>

                        {/* Column 6: Favorite Recipe */}
                        <div className="col-span-1 flex flex-col gap-2">
                            <StickyNote color="bg-blue-200">Delete recipes from my list</StickyNote>
                        </div>
                        
                        <div className="col-span-1"></div>

                        {/* Column 7: Find Store */}
                        <div className="col-span-1 flex flex-col gap-2">
                             <StickyNote color="bg-blue-200">See nearest + cheapest (2mi)</StickyNote>
                             <StickyNote color="bg-blue-200">Filter/see open stores</StickyNote>
                        </div>

                        {/* Column 8: Manage Cart */}
                        <div className="col-span-1 flex flex-col gap-2">
                             <StickyNote color="bg-blue-200">Add/remove items from cart</StickyNote>
                             <StickyNote color="bg-blue-200">Compare cart price across stores</StickyNote>
                        </div>
                    </div>

                    {/* LATER RELEASE */}
                    <div className="grid grid-cols-12 gap-2 border-t pt-4 border-gray-100 bg-yellow-50/30 p-2 rounded-xl mt-auto">
                        <div className="col-span-1 font-bold text-xl self-center bg-yellow-200 p-2 rounded">LATER</div>
                         
                         {/* Column 1 */}
                        <div className="col-span-1 flex flex-col gap-2">
                             <StickyNote color="bg-yellow-100">Add profile photo</StickyNote>
                             <StickyNote color="bg-yellow-100">Delete my account</StickyNote>
                        </div>
                        
                         {/* Column 2 */}
                        <div className="col-span-1 flex flex-col gap-2">
                             <StickyNote color="bg-yellow-100">Create keto recipes</StickyNote>
                        </div>

                         {/* Column 3 */}
                        <div className="col-span-1 flex flex-col gap-2">
                             <StickyNote color="bg-yellow-100">Step-by-step onboarding flow</StickyNote>
                        </div>

                        <div className="col-span-1"></div>

                        {/* Column 4 */}
                        <div className="col-span-1 flex flex-col gap-2">
                             <StickyNote color="bg-yellow-100">Suggest based on history</StickyNote>
                             <StickyNote color="bg-yellow-100">AI generated step-by-step video</StickyNote>
                        </div>

                         {/* Column 5 */}
                        <div className="col-span-1 flex flex-col gap-2">
                             <StickyNote color="bg-yellow-100">Export ingredient list</StickyNote>
                             <StickyNote color="bg-yellow-100">Flag 'wrongly' suggested recipes</StickyNote>
                        </div>
                        
                        {/* Column 6 */}
                        <div className="col-span-1 flex flex-col gap-2">
                             <StickyNote color="bg-yellow-100">Find recently deleted recipes</StickyNote>
                        </div>

                        <div className="col-span-1"></div>

                        {/* Column 7 */}
                        <div className="col-span-1 flex flex-col gap-2">
                             <StickyNote color="bg-yellow-100">See store info (hours)</StickyNote>
                             <StickyNote color="bg-yellow-100">See in-app directions</StickyNote>
                        </div>
                        
                        {/* Column 8 */}
                        <div className="col-span-1 flex flex-col gap-2">
                             <StickyNote color="bg-yellow-100">Compare individual item prices</StickyNote>
                             <StickyNote color="bg-yellow-100">Auto-add cart to online retailers</StickyNote>
                        </div>
                    </div>

                </div>
            </div>
        </Slide>,


        // -----------------------------------------------------------------------------------------
        // Slide 14: Marketing & Sales
        // Theme: GREEN
        // -----------------------------------------------------------------------------------------
        <Slide key="slide-13" theme="green">
            <SectionTitle theme="green">Go-To-Market Plan</SectionTitle>
            <MainTitle theme="green">Launch & Strategy 🚀</MainTitle>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl text-left w-full h-full">
                
                {/* Launch Details */}
                <div className="bg-white text-brand-dark p-8 rounded-3xl shadow-xl flex flex-col justify-center">
                    <h4 className="text-3xl font-bold text-brand-green mb-6 border-b pb-2">Launch Strategy</h4>
                    <div className="text-4xl font-extrabold mb-4">Jan 1st, 2026 📅</div>
                    <p className="text-lg text-brand-gray mb-6">Timed perfectly for New Year's Resolutions focused on saving money and eating healthier.</p>
                     <ul className="space-y-4 text-lg">
                        <li className="flex items-start gap-3">
                            <span className="font-bold">🎓 Busy Grads:</span>
                            <span>Targeted campus campaigns at Rice & UH.</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="font-bold">📱 Channels:</span>
                            <span>App Store, Google Play, Web-app.</span>
                        </li>
                    </ul>
                </div>

                {/* Data Strategy Board */}
                <div className="bg-white/10 p-8 rounded-3xl border border-white/20 flex flex-col gap-4 overflow-y-auto">
                    <h4 className="text-2xl font-bold text-white border-b border-white/20 pb-2">Strategy to Data-Driven Insights 🧠</h4>
                    
                    <div className="bg-brand-green-light p-4 rounded-xl">
                        <strong className="block text-white mb-1">1. Define the Value 💵</strong>
                        <p className="text-sm text-white/90">Reduce friction in onboarding. Metric: Time to generate first recipe.</p>
                    </div>
                    <div className="bg-brand-green-light p-4 rounded-xl">
                        <strong className="block text-white mb-1">2. Activate Channels 📡</strong>
                        <p className="text-sm text-white/90">Use Firebase Analytics to log lifecycle events (User inputs ingredients).</p>
                    </div>
                    <div className="bg-brand-green-light p-4 rounded-xl">
                        <strong className="block text-white mb-1">3. Visualize Data 📊</strong>
                        <p className="text-sm text-white/90">Transform behavioral signals into visual insights that pinpoint friction.</p>
                    </div>
                     <div className="bg-brand-green-light p-4 rounded-xl">
                        <strong className="block text-white mb-1">4. Enable Change 🦋</strong>
                        <p className="text-sm text-white/90">Automate insight dashboards. Focus on Efficiency & Behavioral Metrics.</p>
                    </div>
                </div>
            </div>
        </Slide>,

        // -----------------------------------------------------------------------------------------
        // Slide 15: Tech Stack - Core Engine
        // Theme: LIGHT
        // -----------------------------------------------------------------------------------------
        <Slide key="slide-14" theme="light">
            <SectionTitle theme="light">Technology Stack</SectionTitle>
            <MainTitle theme="light">The Core Engine ⚙️</MainTitle>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl text-left">
                <div className="bg-brand-surface p-6 rounded-2xl border border-brand-stroke">
                    <div className="text-3xl mb-4">🧠</div>
                    <h4 className="text-xl font-bold text-brand-green mb-2">Artificial Intelligence</h4>
                    <p className="text-sm text-brand-dark">Acts as a dynamic teacher. NLP translates anxiety into plans. Adapts to user skill level (novice vs expert) to simplify techniques.</p>
                </div>
                <div className="bg-brand-surface p-6 rounded-2xl border border-brand-stroke">
                    <div className="text-3xl mb-4">📊</div>
                    <h4 className="text-xl font-bold text-brand-green mb-2">Big Data Analytics</h4>
                    <p className="text-sm text-brand-dark">Batch-based analytics on longitudinal history. Identifies patterns (e.g., user prefers quick meals on Mondays) for proactive planning.</p>
                </div>
                <div className="bg-brand-surface p-6 rounded-2xl border border-brand-stroke">
                    <div className="text-3xl mb-4">🏗️</div>
                    <h4 className="text-xl font-bold text-brand-green mb-2">Platform Tech</h4>
                    <p className="text-sm text-brand-dark">Single Source of Truth. Normalizes messy grocery data into a standard FreshPal Schema for accurate availability.</p>
                </div>
                <div className="bg-brand-surface p-6 rounded-2xl border border-brand-stroke">
                    <div className="text-3xl mb-4">☁️</div>
                    <h4 className="text-xl font-bold text-brand-green mb-2">Cloud & Edge</h4>
                    <p className="text-sm text-brand-dark">Hybrid model. Cloud for heavy lifting (pricing). Edge (local) for OCR/Barcode scanning to ensure privacy and offline capability.</p>
                </div>
                <div className="bg-brand-surface p-6 rounded-2xl border border-brand-stroke">
                    <div className="text-3xl mb-4">🔒</div>
                    <h4 className="text-xl font-bold text-brand-green mb-2">Cybersecurity</h4>
                    <p className="text-sm text-brand-dark">End-to-end encryption. The "Teacher" knows the user, but nobody else does. Essential for trust with home data.</p>
                </div>
            </div>
        </Slide>,

         // -----------------------------------------------------------------------------------------
        // Slide 16: Tech Stack - Visionary & Competitive Adv
        // Theme: LIGHT
        // -----------------------------------------------------------------------------------------
        <Slide key="slide-15" theme="light">
            <SectionTitle theme="light">Strategic Advantage</SectionTitle>
            <MainTitle theme="light">Vision & Defense 🏰</MainTitle>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl text-left mb-8">
                 <div className="bg-white p-8 rounded-2xl shadow-lg border-l-4 border-purple-500">
                    <h4 className="text-2xl font-bold text-brand-dark mb-4">The Visionary Layer 🔮</h4>
                     <ul className="space-y-4">
                        <li className="flex gap-4">
                            <span className="text-2xl">👓</span>
                            <div>
                                <strong className="block text-brand-dark">Augmented Reality (AR)</strong>
                                <span className="text-brand-gray text-sm">Visual cues overlaid on your counter. Teaching knife skills and portion control directly in workspace.</span>
                            </div>
                        </li>
                        <li className="flex gap-4">
                            <span className="text-2xl">⛓️</span>
                            <div>
                                <strong className="block text-brand-dark">Blockchain</strong>
                                <span className="text-brand-gray text-sm">Ingredient safety tracking (recalls) and future blockchain-enabled payments.</span>
                            </div>
                        </li>
                     </ul>
                </div>

                <div className="bg-brand-dark text-white p-8 rounded-2xl shadow-lg">
                    <h4 className="text-2xl font-bold text-brand-green mb-4">Unique Value Proposition 💎</h4>
                    <p className="text-lg leading-relaxed mb-4">
                        <strong>Contextual Culinary Mastery.</strong>
                    </p>
                    <p className="text-white/80 text-sm">
                        Most apps are search engines. FreshPal is a GPS. We give turn-by-turn navigation that recalculates based on traffic (missing ingredients), road conditions (skill level), and fuel (budget).
                    </p>
                </div>
            </div>

            <div className="bg-brand-surface p-8 rounded-2xl border border-brand-stroke text-left">
                <h4 className="text-2xl font-bold text-brand-green mb-4">The Unfair Advantage: Contextual Graph 📈</h4>
                <p className="text-brand-dark text-lg leading-relaxed">
                    We link <strong>User Capability</strong> with <strong>Ingredient Reality</strong>. We build a longitudinal cooking profile that competitors cannot scrape. 
                    <br/><br/>
                    <span className="text-sm text-brand-gray">To mimic our value, a competitor would need to bridge EdTech (teaching), Grocery Logistics (procurement), and Supply Chain (safety) simultaneously.</span>
                </p>
            </div>
        </Slide>,

        // -----------------------------------------------------------------------------------------
        // Slide 17: Press Release
        // Theme: GREEN
        // -----------------------------------------------------------------------------------------
         <Slide key="slide-16" theme="green">
            <div className="max-w-4xl text-left bg-white text-brand-dark shadow-2xl p-10 md:p-14 rounded-sm relative overflow-y-auto h-full text-base leading-relaxed">
                <div className="flex justify-between items-start mb-6 border-b border-gray-200 pb-4">
                     <p className="font-bold text-xs uppercase text-gray-500 tracking-widest">FOR IMMEDIATE RELEASE</p>
                     <div className="text-right">
                        <p className="font-bold text-brand-dark">FreshPal Inc.</p>
                        <p className="text-sm text-gray-500">Houston, TX</p>
                     </div>
                </div>
               
                <h2 className="text-2xl md:text-3xl font-extrabold text-brand-dark mb-4 leading-tight">
                    FreshPal Introduces an AI-Powered Kitchen Companion That Helps Busy People Cook Smarter, Reduce Waste, and Make Confident Meal Choices
                </h2>
                
                <div className="flex gap-4 items-center mb-6 text-sm">
                     <span className="font-bold text-brand-green uppercase">HOUSTON, TX</span>
                     <span className="text-gray-300">|</span>
                     <span className="italic text-gray-500">March 2026</span>
                </div>
                
                <div className="space-y-4 text-gray-800 font-serif">
                    <p>
                        <strong>FreshPal</strong> today announced the launch of its AI-powered cooking and kitchen management assistant designed for busy students, young adults, novice cooks, and households that struggle with daily meal decisions, ingredient confusion, and unnecessary grocery waste. FreshPal transforms ordinary pantries into personalized recipe engines by connecting real-time ingredient availability, user preferences, and local store data into a simple and intuitive experience that supports healthier and more affordable cooking.
                    </p>
                    <p>
                        For many people, cooking has become a tiring chore rather than something enjoyable. Users stand in front of pantry shelves with mismatched ingredients and no idea what to make. Others scroll endlessly through food videos and social media recipes, only to give up and order out. Grocery runs often lead to frustration when items are overpriced, out of stock, or unclear in quality. At the same time, busy schedules, limited cooking experience, and rising food costs make it harder for people to stay consistent, reduce waste, and eat mindfully.
                    </p>
                    <p>
                        FreshPal solves these problems by acting as a personal sous chef, shopping guide, and confidence-building coach. Using AI, the app generates personalized recipe ideas based on the ingredients already in the kitchen, the user’s dietary needs, and their cooking comfort level. FreshPal then connects to local grocery stores to show real-time ingredient availability and price comparisons so users can make smart choices without overspending. With a simple scan of the pantry, FreshPal turns random items into tailored, step-by-step meals that fit the user’s day, taste, and budget.
                    </p>
                    <p>
                        FreshPal also brings gentle motivation into the kitchen. Instead of overwhelming users with complex recipes or unrealistic meal plans, the app encourages progress through small wins. It highlights five-ingredient recipes, provides weekly food waste summaries, and offers simple sustainability tips that fit naturally into a busy lifestyle. The goal is not to lecture people, but to help them build healthier habits in a way that feels achievable and supportive.
                    </p>
                    <p className="italic pl-4 border-l-4 border-brand-green my-6">
                        “FreshPal was built because we lived the same struggles,” said a co-founder of FreshPal. “Between classes, work, and everything else in life, cooking used to feel like a burden. You either waste ingredients because nothing matches, or you end up ordering out again. We wanted to make cooking easier, cheaper, and genuinely enjoyable. FreshPal takes what you already have, gives you smart recipes, and removes the stress from the whole process.”
                    </p>
                    <p>
                         FreshPal’s experience goes beyond recipes. The app learns the user’s rhythms, nudges them when ingredients are nearing expiration, helps plan grocery carts, and provides real-time store insights that prevent wasted trips. For households that want to live cleaner and reduce clutter, FreshPal offers gentle habit-building features that help maintain a minimal, sustainable kitchen without pressure or judgment.
                    </p>
                    <p className="italic pl-4 border-l-4 border-brand-green my-6">
                        “I used to throw out so much food and never felt in control of my kitchen,” said Nora, an early tester in Houston. “FreshPal changed that completely. It shows me what to cook, where ingredients are cheapest, and how to stay ahead of waste. My grocery bills dropped, my confidence grew, and my kitchen genuinely feels calm now.”
                    </p>
                    <p>
                        FreshPal is available on iOS, Android, and Web, making it accessible to users wherever they are. The app is designed to fit into any routine by offering fast setup, simple scanning, and instant recipe generation. Early users can explore customized meal ideas, track their pantry, and compare local store pricing through a clean and intuitive interface.
                    </p>
                    <p>
                        <strong>About FreshPal:</strong> FreshPal’s mission is to make everyday cooking feel simple, supportive, and smart. By combining AI-powered personalization with real-world kitchen data, FreshPal is redefining how people cook at home and helping them build a lifestyle that is healthier, less wasteful, and more enjoyable.
                    </p>
                    <p className="font-bold mt-4">
                         To learn more about FreshPal or start cooking with confidence, visit freshpal.com.
                    </p>
                </div>
                
                <div className="text-center mt-8 pt-6 border-t border-gray-100">
                    <p className="text-sm text-gray-400">###</p>
                </div>
            </div>
        </Slide>,
        
        // -----------------------------------------------------------------------------------------
        // Slide 18: Thank You
        // Theme: LIGHT
        // -----------------------------------------------------------------------------------------
        <Slide key="slide-17" theme="light">
            <div className="flex flex-col items-center justify-center h-full">
                <div className="mb-8 p-12 bg-green-50 rounded-full animate-bounce-slow shadow-lg">
                    {/* Animated Chef Icon */}
                   <span className="text-9xl">👨‍🍳</span>
                </div>
                <h1 className="text-6xl md:text-9xl font-extrabold text-brand-green mb-8">THANK YOU!</h1>
                <div className="text-2xl text-brand-dark font-medium max-w-2xl">
                    "The only real stumbling block is fear of failure. In cooking, you've got to have a what-the-hell attitude." <br/> <span className="text-brand-gray text-lg italic mt-2">- Julia Child</span>
                </div>
                <div className="mt-12 flex gap-4">
                     <div className="bg-brand-dark text-white px-6 py-3 rounded-full font-bold">Questions?</div>
                     <div className="bg-brand-green text-white px-6 py-3 rounded-full font-bold">Live Demo</div>
                </div>
            </div>
        </Slide>
    ];

    const handlePrint = () => {
        window.print();
    };

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowRight' || e.key === 'Space') {
                setCurrentSlide(prev => Math.min(prev + 1, slides.length - 1));
            } else if (e.key === 'ArrowLeft') {
                setCurrentSlide(prev => Math.max(prev - 1, 0));
            } else if (e.key === 'Escape') {
                onClose();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [slides.length, onClose]);

    return (
        <div className="fixed inset-0 bg-black z-50 flex items-center justify-center font-sans print:bg-white print:static print:block print:h-auto print:w-auto">
             <style>{`
                @media print {
                    @page {
                        size: landscape;
                        margin: 0;
                    }
                    body {
                        background: white;
                    }
                }
            `}</style>

            <div className="absolute top-4 right-4 z-50 flex gap-4 print:hidden">
                 <button 
                    onClick={handlePrint}
                    className="p-2 px-4 bg-brand-green hover:bg-brand-green-light rounded-full text-white transition-all backdrop-blur-sm flex items-center gap-2 font-bold shadow-lg"
                    title="Print / Save PDF"
                >
                    <PrinterIcon /> Print / Save PDF
                </button>
                <button 
                    onClick={onClose}
                    className="p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all backdrop-blur-sm"
                    title="Exit Presentation"
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>
            </div>

            <div className="relative w-full h-full md:w-[98vw] md:h-[95vh] bg-black overflow-hidden shadow-2xl flex flex-col rounded-lg print:shadow-none print:w-full print:h-auto print:bg-white print:overflow-visible">
                <div className="flex-1 relative overflow-hidden bg-brand-bg print:overflow-visible">
                     {slides.map((slide, index) => (
                        <div 
                            key={index} 
                            className={`
                                w-full h-full 
                                ${index === currentSlide ? 'block' : 'hidden'} 
                                print:block print:h-screen print:w-screen print:break-after-page print:relative
                            `}
                        >
                             {slide}
                        </div>
                    ))}
                </div>

                <div className="h-16 border-t border-gray-800 bg-brand-dark flex items-center justify-between px-8 z-20 print:hidden">
                    <div className="text-base font-bold text-gray-400">
                        Slide {currentSlide + 1} / {slides.length}
                    </div>
                    <div className="flex gap-4">
                         <button 
                            onClick={() => setCurrentSlide(prev => Math.max(prev - 1, 0))}
                            disabled={currentSlide === 0}
                            className="p-3 hover:bg-white/10 rounded-full disabled:opacity-30 text-white transition-all"
                        >
                            <ArrowLeft />
                        </button>
                        <button 
                            onClick={() => setCurrentSlide(prev => Math.min(prev + 1, slides.length - 1))}
                            disabled={currentSlide === slides.length - 1}
                            className="p-3 hover:bg-white/10 rounded-full disabled:opacity-30 text-white transition-all"
                        >
                            <ArrowRight />
                        </button>
                    </div>
                </div>

                <div className="h-1.5 bg-gray-800 w-full print:hidden">
                    <div 
                        className="h-full bg-brand-green transition-all duration-300 ease-out" 
                        style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
                    />
                </div>
            </div>
        </div>
    );
};

export default PitchDeckPage;
