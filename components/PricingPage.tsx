import React from 'react';

const CheckIcon: React.FC = () => (
    <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 6L9 17L4 12" stroke="#3A7D44" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

interface PlanProps {
  name: string;
  level: string;
  price: string;
  pricePeriod?: string;
  description: string;
  features: string[];
  buttonText: string;
  isPopular?: boolean;
}

const PlanCard: React.FC<PlanProps> = ({ name, level, price, pricePeriod, description, features, buttonText, isPopular }) => {
    return (
        <div className={`p-8 rounded-2xl border transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:-translate-y-2 flex flex-col h-full ${
            isPopular 
            ? 'bg-brand-surface border-brand-green-light shadow-xl' 
            : 'bg-white border-gray-200'
        }`}>
            {isPopular && (
                <div className="text-center mb-4">
                    <span className="bg-brand-green text-white text-xs font-bold px-3 py-1 rounded-full">Most Popular</span>
                </div>
            )}
            <h3 className="text-xl font-bold text-brand-dark text-center">{name}</h3>
            <p className="text-brand-gray text-center text-sm">{level}</p>
            <div className="text-center my-6">
                <span className="text-5xl font-extrabold text-brand-dark">{price}</span>
                {pricePeriod && <span className="text-brand-gray">{pricePeriod}</span>}
            </div>
            <p className="text-brand-gray text-center h-12">{description}</p>
            <ul className="space-y-4 my-8">
                {features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 text-left">
                        <CheckIcon />
                        <span className="text-brand-gray">{feature}</span>
                    </li>
                ))}
            </ul>
            <button className={`w-full mt-auto py-3 rounded-lg font-bold transition-colors ${
                isPopular
                ? 'bg-brand-green text-white hover:bg-brand-green-light'
                : 'bg-white text-brand-green border-2 border-brand-stroke hover:bg-brand-surface'
            }`}>{buttonText}</button>
        </div>
    );
}

const PricingPage: React.FC = () => {
    const plans: PlanProps[] = [
        {
            name: "Foodie",
            level: "Free Forever",
            price: "Free",
            description: "Start cooking smarter, one recipe at a time.",
            features: [
                "Generate up to 3 AI recipes per week",
                "Apply basic dietary filters (vegan, gluten-free, etc.)",
                "Save and view your recipes"
            ],
            buttonText: "Create Free Account",
        },
        {
            name: "Chef",
            level: "Premium",
            price: "$5.99",
            pricePeriod: "/month",
            description: "Unlock the full AI cooking experience.",
            features: [
                "Unlimited AI recipe generation",
                "Smart grocery store integration",
                "Price comparison across stores",
                "Personalized meal planning",
                "Ad-free experience"
            ],
            buttonText: "Upgrade to Chef",
            isPopular: true
        },
        {
            name: "Master Chef",
            level: "Pro",
            price: "$11.99",
            pricePeriod: "/month",
            description: "For food lovers ready to take it to the next level.",
            features: [
                "Everything in Chef, plus:",
                "Delivery integration",
                "Advanced AI insights",
                "Early access to new features",
                "Priority customer support"
            ],
            buttonText: "Start Master Chef Trial",
        }
    ];

    return (
        <div className="pt-24 md:pt-32 pb-20">
            <div className="container mx-auto px-6 text-center">
                <h1 className="text-4xl md:text-5xl font-extrabold text-brand-dark">
                    Plans & Pricing
                </h1>
                <p className="text-lg text-brand-gray max-w-2xl mx-auto mt-4">
                    Choose the plan that fits your cooking journey. Cancel anytime – no obligation, no hidden fees.
                </p>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12 max-w-5xl mx-auto items-stretch">
                   {plans.map(plan => <PlanCard key={plan.name} {...plan} />)}
                </div>

                 <p className="text-sm text-brand-gray mt-8">
                    Cancel anytime – no obligation, no hidden fees.
                </p>
            </div>
        </div>
    );
};

export default PricingPage;