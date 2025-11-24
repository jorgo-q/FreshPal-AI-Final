
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { generateRecipe, generateRecipeImage, converseWithFreshPal } from '../services/geminiService';
import type { Recipe } from '../types';

// Icons (retained)
const ClockIcon = () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>);
const ServingIcon = () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M17 21V19C17 16.7909 15.2091 15 13 15H8C5.79086 15 4 16.7909 4 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M12.5 8C12.5 10.2091 10.7091 12 8.5 12C6.29086 12 4.5 10.2091 4.5 8C4.5 5.79086 6.29086 4 8.5 4C10.7091 4 12.5 5.79086 12.5 8Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M17 8H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M18.5 6.5V9.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>);
const EasyIcon = () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14 20L20 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M4 20L12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M14 4L4 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M20 10L10 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>);
const SendIcon = () => (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2L2 7V17L12 22L22 17V7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M12 12L22 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M12 12L2 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M12 12V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>);

export interface ChatMessage { // Exported for use in services/geminiService.ts
    role: 'user' | 'model';
    text: string;
}

const RecipeCard: React.FC<{ recipe: Recipe }> = ({ recipe }) => (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-lg overflow-hidden max-w-5xl mx-auto mt-12 animate-fade-in text-left">
        <div className="relative">
            <img src={recipe.imageUrl} alt={recipe.title} className="w-full h-72 object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-8">
                <h2 className="text-3xl font-bold text-white">{recipe.title}</h2>
                <p className="text-white/90 mt-1 max-w-2xl">{recipe.description}</p>
            </div>
        </div>
        <div className="p-8">
            <div className="flex items-center justify-around text-brand-gray border-b pb-6 mb-6">
                <div className="flex items-center gap-2"><ClockIcon /> {recipe.prepTime} mins</div>
                <div className="flex items-center gap-2"><ServingIcon /> {recipe.servings} servings</div>
                <div className="flex items-center gap-2"><EasyIcon /> {recipe.difficulty}</div>
            </div>
            <div className="grid md:grid-cols-5 gap-x-12">
                <div className="md:col-span-2">
                    <h3 className="text-xl font-bold text-brand-dark mb-4">Ingredients</h3>
                    <ul className="space-y-2 text-brand-gray list-disc list-inside">
                        {recipe.ingredients.map((ing, i) => <li key={i}>{ing}</li>)}
                    </ul>
                </div>
                <div className="md:col-span-3 mt-8 md:mt-0">
                    <h3 className="text-xl font-bold text-brand-dark mb-4">Instructions</h3>
                    <ol className="space-y-4">
                        {recipe.instructions.map((step, i) => (
                            <li key={i} className="flex items-start gap-4">
                                <div className="flex-shrink-0 bg-brand-green text-white w-7 h-7 rounded-full flex items-center justify-center font-bold text-sm pt-px">{i + 1}</div>
                                <span className="text-brand-gray flex-1">{step}</span>
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
            <div className="mt-8 pt-6 border-t">
                <h3 className="text-xl font-bold text-brand-dark mb-4">Nutrition Facts (per serving)</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center md:text-left">
                        <p className="text-2xl font-bold text-brand-green">{recipe.nutrition.calories}</p>
                        <p className="text-brand-gray">Calories</p>
                    </div>
                    <div className="text-center md:text-left">
                        <p className="text-2xl font-bold text-brand-green">{recipe.nutrition.protein}g</p>
                        <p className="text-brand-gray">Protein</p>
                    </div>
                    <div className="text-center md:text-left">
                        <p className="text-2xl font-bold text-brand-green">{recipe.nutrition.carbs}g</p>
                        <p className="text-brand-gray">Carbs</p>
                    </div>
                    <div className="text-center md:text-left">
                        <p className="text-2xl font-bold text-brand-green">{recipe.nutrition.fat}g</p>
                        <p className="text-brand-gray">Fat</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

const loadingMessages = [
    "Whipping up something special...",
    "Preheating the AI ovens...",
    "Consulting with our virtual chefs...",
    "Sourcing the freshest ideas...",
    "Perfecting your personalized recipe...",
];

const DemoPage: React.FC = () => {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [userMessage, setUserMessage] = useState('');
    const [isChatting, setIsChatting] = useState(false);
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [isLoadingRecipes, setIsLoadingRecipes] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [loadingRecipeMessage, setLoadingRecipeMessage] = useState(loadingMessages[0]);
    const chatWindowRef = useRef<HTMLDivElement>(null);
    const recipeLoadingIntervalRef = useRef<number | null>(null);

    const ASSUMED_PANTRY_INGREDIENTS = "paneer, tomatoes, onions, potatoes, garlic, ginger, frozen peas, spinach, mixed frozen veggies, rice, tortillas, eggs, cheese, turmeric, chili powder, cumin, garam masala.";

    const scrollToBottom = () => {
        if (chatWindowRef.current) {
            chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
        }
    };

    // Recipe loading message rotator
    useEffect(() => {
        if (isLoadingRecipes) {
            recipeLoadingIntervalRef.current = window.setInterval(() => {
                setLoadingRecipeMessage(prev => loadingMessages[(loadingMessages.indexOf(prev) + 1) % loadingMessages.length]);
            }, 2500);
        } else {
            if (recipeLoadingIntervalRef.current) {
                clearInterval(recipeLoadingIntervalRef.current);
            }
        }
        return () => {
            if (recipeLoadingIntervalRef.current) {
                clearInterval(recipeLoadingIntervalRef.current);
            }
        };
    }, [isLoadingRecipes]);

    // Scroll to bottom when messages update
    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // Initial FreshPal greeting
    useEffect(() => {
        const initialGreeting = async () => {
            setIsChatting(true);
            try {
                // Pass an empty array for history on the very first message
                const response = await converseWithFreshPal("Hello", []); 
                setMessages([{ role: 'model', text: response.text } as ChatMessage]);
                
                // If the model decided to generate recipes right away (unlikely given current prompt, but good for robustness)
                if (response.action?.type === 'generate_recipe') {
                    await generateAndDisplayRecipes(response.action.ingredients);
                }
            } catch (err) {
                setError(err instanceof Error ? err.message : "Failed to connect to FreshPal.");
            } finally {
                setIsChatting(false);
            }
        };

        if (messages.length === 0) {
            initialGreeting();
        }
    }, []); // Only run once on mount

    const generateAndDisplayRecipes = useCallback(async (ingredientsOverride?: string) => {
        setIsLoadingRecipes(true);
        setError(null);
        setRecipes([]); // Clear previous recipes
        
        try {
            const ingredientsToUse = ingredientsOverride || ASSUMED_PANTRY_INGREDIENTS;
            
            // Generate 2 recipes in parallel for speed
            const recipePromises = Array(2).fill(null).map(async () => {
                const recipeData = await generateRecipe(ingredientsToUse);
                const imageUrl = await generateRecipeImage(recipeData.title);
                return { ...recipeData, imageUrl };
            });

            const generatedRecipes = await Promise.all(recipePromises);
            setRecipes(generatedRecipes);
        } catch (err) {
            setError(err instanceof Error ? err.message : "An unknown error occurred while generating recipes.");
        } finally {
            setIsLoadingRecipes(false);
        }
    }, []);

    const handleSendMessage = async (e?: React.FormEvent) => {
        e?.preventDefault();
        if (!userMessage.trim() || isChatting || isLoadingRecipes) return;

        const currentMessage = userMessage.trim();
        setUserMessage('');
        
        // Optimistically add user message to state
        const updatedMessages = [...messages, { role: 'user', text: currentMessage } as ChatMessage];
        setMessages(updatedMessages);
        setIsChatting(true);
        setError(null);

        try {
            // Send message to LLM and get response + optional actions
            const response = await converseWithFreshPal(currentMessage, updatedMessages);
            
            // Append AI text response
            setMessages(prev => [...prev, { role: 'model', text: response.text } as ChatMessage]);
            
            // Handle Tool Actions (Recipe Generation)
            if (response.action?.type === 'generate_recipe') {
                await generateAndDisplayRecipes(response.action.ingredients);
            }

        } catch (err) {
            setError(err instanceof Error ? err.message : "An unknown error occurred during conversation.");
        } finally {
            setIsChatting(false);
        }
    };

    return (
        <div className="pt-24 md:pt-32 pb-20 min-h-screen">
            <div className="container mx-auto px-6 text-center">
                <h1 className="text-4xl md:text-5xl font-extrabold text-brand-dark">
                    Your Pantry, Your Pal
                </h1>
                <p className="text-lg text-brand-gray max-w-2xl mx-auto mt-4">
                    Chat with FreshPal to get personalized recipe ideas tailored to your mood and pantry.
                </p>

                <div className="max-w-3xl mx-auto mt-10 bg-white p-4 rounded-2xl border border-gray-200 shadow-sm flex flex-col h-[70vh] md:h-[60vh]">
                    <div ref={chatWindowRef} className="flex-1 overflow-y-auto p-4 space-y-4 text-left custom-scrollbar">
                        {messages.map((msg, index) => (
                            <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[70%] p-3 rounded-lg shadow-sm ${
                                    msg.role === 'user'
                                        ? 'bg-brand-green text-white rounded-br-none'
                                        : 'bg-brand-surface text-brand-dark rounded-bl-none'
                                }`}>
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                        {isChatting && (
                            <div className="flex justify-start">
                                <div className="max-w-[70%] p-3 rounded-lg bg-brand-surface text-brand-dark rounded-bl-none">
                                    <div className="flex items-center">
                                        <span className="animate-pulse mr-2">...</span>
                                        FreshPal is typing
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    <form onSubmit={handleSendMessage} className="flex gap-2 mt-4 p-2 border-t border-brand-stroke">
                        <input
                            type="text"
                            value={userMessage}
                            onChange={(e) => setUserMessage(e.target.value)}
                            placeholder="Type your message to FreshPal..."
                            className="flex-1 p-3 bg-brand-surface rounded-lg border-2 border-transparent focus:border-brand-green focus:ring-0 transition-colors"
                            disabled={isChatting || isLoadingRecipes}
                        />
                        <button
                            type="submit"
                            className="bg-brand-green text-white px-5 py-3 rounded-lg font-bold hover:bg-brand-green-light transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
                            disabled={isChatting || isLoadingRecipes || !userMessage.trim()}
                            aria-label="Send message"
                        >
                            <SendIcon />
                        </button>
                    </form>
                </div>

                {error && <div className="mt-6 text-red-600 bg-red-100 border border-red-300 p-4 rounded-lg max-w-2xl mx-auto animate-fade-in">{error}</div>}

                {isLoadingRecipes && (
                    <div className="mt-12 flex items-center justify-center p-6 bg-white rounded-2xl border border-gray-200 shadow-sm max-w-2xl mx-auto animate-fade-in">
                        <svg className="animate-spin -ml-1 mr-3 h-6 w-6 text-brand-green" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span className="text-lg text-brand-dark font-medium">{loadingRecipeMessage}</span>
                    </div>
                )}

                {recipes.length > 0 && (
                    <div className="space-y-8">
                        {recipes.map((r, i) => <RecipeCard key={i} recipe={r} />)}
                    </div>
                )}
            </div>
        </div>
    );
};

export default DemoPage;
