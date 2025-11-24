
export interface Recipe {
  title: string;
  description: string;
  prepTime: number;
  servings: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  ingredients: string[];
  instructions: string[];
  nutrition: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
  imageUrl: string;
}

export type Page = 'home' | 'demo' | 'pricing' | 'team' | 'pitch';
