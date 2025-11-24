# FreshPal - AI Kitchen Assistant 🥦

FreshPal is an AI-powered sous-chef that turns your pantry ingredients into delicious, personalized recipes.

## 🚀 Getting Started

1.  **Install dependencies:**
    ```bash
    npm install
    ```

2.  **Run locally:**
    ```bash
    # Create a .env file with your API_KEY
    echo "API_KEY=your_google_ai_key_here" > .env
    
    npm run dev
    ```

## ☁️ Deploying to Vercel

1.  Push this code to a GitHub repository.
2.  Go to [Vercel](https://vercel.com) and "Add New Project".
3.  Import your GitHub repository.
4.  **Important:** In the Vercel Project Settings, go to **Environment Variables**.
5.  Add a new variable:
    *   **Key:** `API_KEY`
    *   **Value:** Your Google Gemini API Key.
6.  Click **Deploy**.

## 🛠️ Tech Stack

*   **Framework:** React + Vite
*   **Styling:** Tailwind CSS
*   **AI:** Google Gemini API (`@google/genai`)
