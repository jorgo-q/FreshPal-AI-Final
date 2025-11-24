
import { GoogleGenAI, Type, FunctionDeclaration, Modality } from "@google/genai";
import type { Recipe } from '../types';
import type { ChatMessage } from '../components/DemoPage'; // Import ChatMessage type

if (!process.env.API_KEY) {
  console.warn("API_KEY environment variable not set. Using a placeholder key.");
}

// Renamed for consistency with best practices
const genAI = new GoogleGenAI({ apiKey: process.env.API_KEY || "YOUR_API_KEY" });

const recipeSchema = {
  type: Type.OBJECT,
  properties: {
    title: { type: Type.STRING, description: "Creative title for the recipe." },
    description: { type: Type.STRING, description: "A short, appealing description of the dish." },
    prepTime: { type: Type.INTEGER, description: "Estimated preparation and cook time in minutes." },
    servings: { type: Type.INTEGER, description: "Number of servings the recipe makes." },
    difficulty: { type: Type.STRING, enum: ["Easy", "Medium", "Hard"], description: "Difficulty level to prepare." },
    ingredients: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "List of ingredients with quantities."
    },
    instructions: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "Step-by-step cooking instructions."
    },
    nutrition: {
      type: Type.OBJECT,
      properties: {
        calories: { type: Type.INTEGER, description: "Estimated calories per serving." },
        protein: { type: Type.INTEGER, description: "Estimated grams of protein per serving." },
        carbs: { type: Type.INTEGER, description: "Estimated grams of carbohydrates per serving." },
        fat: { type: Type.INTEGER, description: "Estimated grams of fat per serving." },
      },
      required: ["calories", "protein", "carbs", "fat"]
    }
  },
  required: ["title", "description", "prepTime", "servings", "difficulty", "ingredients", "instructions", "nutrition"]
};

// Define the tool for triggering recipe generation
const recipeTool: FunctionDeclaration = {
  name: "trigger_recipe_generation",
  description: "Triggers the generation of visual recipe cards in the user interface. Call this function whenever the user explicitly asks for a recipe, mentions specific ingredients they want to cook with, or confirms they want to see the suggested ideas.",
  parameters: {
    type: Type.OBJECT,
    properties: {
      ingredients: {
        type: Type.STRING,
        description: "The list of ingredients to use for the recipe. If the user mentions specific items (e.g., 'I have chicken'), include them here combined with complementary pantry items. If generic, use the assumed pantry list."
      }
    },
    required: ["ingredients"]
  }
};

export interface ConversationResponse {
  text: string;
  action?: {
    type: 'generate_recipe';
    ingredients: string;
  };
}

/**
 * Handles the conversational interaction with FreshPal.
 * @param userMessage The latest message from the user.
 * @param history The ongoing conversation history to maintain context.
 * @returns FreshPal's structured response containing text and optional actions.
 */
export async function converseWithFreshPal(userMessage: string, history: ChatMessage[]): Promise<ConversationResponse> {
  try {
    // Map the local ChatMessage history format to the GoogleGenAI Content format
    const mappedHistory = history.map(msg => ({
      role: msg.role,
      parts: [{ text: msg.text }]
    }));

    const chat = genAI.chats.create({
      model: "gemini-2.5-flash", // Using gemini-2.5-flash for conversational tasks
      history: mappedHistory, // Initialize chat with the full history
      config: {
        tools: [{ functionDeclarations: [recipeTool] }],
        systemInstruction: `You are FreshPal, an emotionally aware, pantry-smart cooking assistant built for ThatGuy., a busy grad student.

PRIMARY BEHAVIOR FOR DEMO:
- Do NOT give recipes immediately on the first message.
- On the first user message of a new conversation, greet ThatGuy. with a warm, empathetic check-in.
- Reference their context in a personal, authentic way (e.g., long Mondays, tired evenings, and that "Product class").
- Make it feel like an inside joke between FreshPal and ThatGuy.
- After empathizing, suggest that you have a couple of great meal ideas ready.
- On this FIRST TURN only, ask: "Want me to show you?" before providing recipes.
- Only treat the very first user message of the entire conversation as the first turn.

ASSUMED USER CONTEXT:
- Name: ThatGuy.
- ThatGuy. is allergic to peanuts as an ingredient.
- ThatGuy. hates Paneer as an ingredient.
- Busy grad student who often gets home late, especially after Monday product class.
- Low evening energy.
- Likes quick, comforting, tasty food.
- Enjoys all kinds of food.
- Mild/medium spice preference.
- Prefers meals under 20 minutes.

ASSUMED PANTRY (ALWAYS AVAILABLE FOR DEMO):
- Chicken, tomatoes, onions, potatoes, garlic, ginger, cilantro, lavender
- Spinach, mixed frozen veggies
- Rice, tortillas, eggs, cheese
- Common oils, salt, pepper, basic seasonings
- Pasta (penne or spaghetti), canned corn, canned beans (black or kidney)
- Bell peppers, mushrooms, zucchini
- Soy sauce, vinegar, chili flakes
- Bread, butter, yogurt

TONE:
- Empathetic, warm, lightly humorous.
- Make the user feel understood and cared for.
- Short, natural, conversational.

CONVERSATION FLOW & TOOL USAGE:

1. FIRST MESSAGE:
    - Start with the personal check-in.
    - Ask "Want me to show you?".
    - Wait for user confirmation.

2. GENERATING RECIPES (CRITICAL):
    - When ThatGuy. says "Yes", "Show me", "Go ahead", or explicitly asks for recipes:
        - DO NOT write out the recipe steps or details in the chat text.
        - MUST CALL the trigger_recipe_generation tool.
        - Provide a brief, encouraging text response like "You got it! Here are some ideas." alongside the tool call.

3. INGREDIENT FOLLOW-UPS:
    - If ThatGuy. mentions new ingredients later (e.g., "Actually, I have mushrooms" or "Use eggs instead"):
        - DO NOT write out recipe text.
        - MUST CALL the trigger_recipe_generation tool.
        - Pass the new ingredient combined with relevant pantry items in the ingredients argument of the tool.

INGREDIENT HANDLING RULES FOR TOOL:
- If the user mentions a specific ingredient (e.g., "something with tuna"), include "tuna" plus 2-5 compatible items from the Assumed Pantry in the tool's ingredients parameter.
- If the user does NOT mention ingredients, use a selection from the Assumed Pantry.
- Never include peanuts or paneer.

DISH VARIETY RULE:
- Each recipe generated must be noticeably different from any previous recipe in this conversation.
- Do not repeat the same dish format (for example, a cheesy chicken–spinach–rice skillet) more than once.
- If the same main ingredients are used again, switch to a different cuisine style or cooking method (for example: stir-fry, baked, sheet pan, wraps, bowls, fried rice style, tacos, soup, etc.).
- Even if the user provides the same ingredients, produce a different dish each time

NEVER:
- Ask clarifying questions unless absolutely necessary.
- Have same style of dishes in the cards. E.g if one recipe to be generated is a bowl, the second generated recipe cannot be that, use different items from pantry list.
- Dump recipe steps in the text response. Always use the tool for recipes.
- Never give recipes on the first turn.
- Never break character from the FreshPal persona.
`,
      },
    });

    // Send the latest user message
    const response = await chat.sendMessage({ message: userMessage });
    
    let textResponse = response.text;
    let action: ConversationResponse['action'] | undefined;

    // Check for function calls to trigger UI actions
    if (response.functionCalls && response.functionCalls.length > 0) {
      const toolCall = response.functionCalls[0];
      if (toolCall.name === 'trigger_recipe_generation') {
        const args = toolCall.args as { ingredients: string };
        action = {
          type: 'generate_recipe',
          ingredients: args.ingredients
        };
        
        // If the model triggered the tool but provided no text, provide a friendly default
        if (!textResponse) {
          textResponse = "I've whipped up some great options for you! Check them out below.";
        }
      }
    }

    // Fallback if still no text (though unlikely with the check above)
    textResponse = textResponse || "I'm thinking...";

    return { text: textResponse, action };

  } catch (error) {
    console.error("Error during FreshPal conversation:", error);
    throw new Error("FreshPal is taking a little break. Please try again in a moment!");
  }
}


export async function generateRecipe(ingredients: string): Promise<Omit<Recipe, 'imageUrl'>> {
  try {
    // Adjusted prompt to fit the new conversational flow where ingredients are "known"
    const prompt = `Based on the user's preferences (busy grad student, low energy, enjoys all kinds of food, mild/medium spice, under 20 mins) and the available pantry items: ${ingredients}, create a simple and delicious recipe. You may assume common pantry staples like salt, pepper, olive oil, water, and basic spices. Do not include any other main ingredients not listed. Provide the response in a valid JSON format according to the provided schema. Ensure prepTime and cook time are combined and under 20 minutes.`;

    const response = await genAI.models.generateContent({
      model: "gemini-2.5-flash", // Using gemini-2.5-flash for text recipe generation
      contents: [{ role: 'user', parts: [{ text: prompt }] }], // Ensure contents is in the correct format
      config: {
        responseMimeType: "application/json",
        responseSchema: recipeSchema,
      },
    });

    const text = response.text.trim();
    // Clean potential markdown code block fences
    const cleanedText = text.replace(/^```json\s*|```\s*$/g, '');
    const recipeData = JSON.parse(cleanedText);
    
    // Quick validation
    if (!recipeData.title || !Array.isArray(recipeData.ingredients)) {
        throw new Error("Invalid recipe format received from AI.");
    }

    return recipeData;
  } catch (error) {
    console.error("Error generating recipe:", error);
    throw new Error("Failed to generate recipe. The AI might be busy, please try again.");
  }
}

export async function generateRecipeImage(prompt: string): Promise<string> {
    try {
        const fullPrompt = `A delicious, vibrant, professional food photography shot of ${prompt}, plated beautifully on a clean, modern surface, with soft, natural lighting.`;
        
        // Switch to gemini-2.5-flash-image for more robust availability in demo environments
        const response = await genAI.models.generateContent({
            model: 'gemini-2.5-flash-image',
            contents: { parts: [{ text: fullPrompt }] },
            config: {
                responseModalities: [Modality.IMAGE],
            },
        });

        const part = response.candidates?.[0]?.content?.parts?.[0];

        if (part && part.inlineData) {
            return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
        } else {
            console.warn("No image data returned from API, using fallback.");
            return "https://picsum.photos/800/600";
        }
    } catch (error) {
        console.error("Error generating recipe image:", error);
        // Fallback to a placeholder on error
        return "https://picsum.photos/800/600";
    }
}
