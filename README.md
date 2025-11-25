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

3.  **Run Tests:**
    ```bash
    npm test
    ```

## 🐳 Docker & Cloud Deployment

This project includes a `Dockerfile` and `nginx.conf` ready for deployment services like **Google Cloud Run**.

### Build and Run with Docker Locally

```bash
# Build the image (Pass your API key as a build argument)
docker build --build-arg API_KEY=your_actual_api_key -t freshpal-app .

# Run the container on port 8080
docker run -p 8080:8080 freshpal-app
```

Visit `http://localhost:8080` to see the app.

### Deploy to Google Cloud Run

1.  **Build and Submit to Artifact Registry:**
    ```bash
    gcloud builds submit --tag gcr.io/YOUR_PROJECT_ID/freshpal-app .
    ```

2.  **Deploy to Cloud Run:**
    ```bash
    gcloud run deploy freshpal-app \
      --image gcr.io/YOUR_PROJECT_ID/freshpal-app \
      --platform managed \
      --region us-central1 \
      --allow-unauthenticated
    ```

## 🛠️ Tech Stack

*   **Framework:** React + Vite
*   **Styling:** Tailwind CSS
*   **AI:** Google Gemini API (`@google/genai`)
*   **Testing:** Vitest + React Testing Library
