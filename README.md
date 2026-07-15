# 🚀 PromptPilot AI

> **An AI-Powered Prompt Optimization Platform using Google Gemini and AWS Elastic Beanstalk**

PromptPilot AI is a full-stack AI-powered web application that transforms simple user prompts into multiple optimized prompt variations using Google's **Gemini Large Language Model (LLM)**. Built with **React.js**, **Node.js**, **Express.js**, **Docker**, and **AWS Elastic Beanstalk**, the application demonstrates modern full-stack development, prompt engineering, containerization, and cloud deployment.

---

## 🌐 Live Demo

**Application URL**

http://promptpilot-ai.ap-southeast-2.elasticbeanstalk.com

> **Note:** The current deployment is available over **HTTP**. HTTPS can be enabled in a production environment using an AWS Application Load Balancer (ALB) with AWS Certificate Manager (ACM).

---

# ✨ Features

- 🤖 AI-powered prompt optimization using Google Gemini
- 📝 Generates four optimized prompt variations:
  - Better Prompt
  - Expert Prompt
  - Short Prompt
  - Creative Prompt
- ⚡ Fast and responsive user interface
- 🔒 Secure backend API integration using environment variables
- 📡 RESTful API architecture
- 🩺 Health monitoring endpoint
- 🐳 Docker containerization
- ☁️ Cloud deployment using AWS Elastic Beanstalk
- 📱 Responsive design for desktop and mobile devices

---

# 🏗️ System Architecture

```
                 User
                   │
                   ▼
          React Frontend (UI)
                   │
           HTTP API Requests
                   │
                   ▼
       Express.js Backend Server
                   │
        Google Gemini API
                   │
                   ▼
    Optimized Prompt Variations
                   │
                   ▼
              User Interface
```

---

# 🛠️ Technology Stack

## Frontend

- React.js
- HTML5
- CSS3
- JavaScript

## Backend

- Node.js
- Express.js
- Google Gemini API
- Express Rate Limit
- CORS
- dotenv

## Cloud & Deployment

- Docker
- AWS Elastic Beanstalk
- Amazon EC2

## Development Tools

- Git
- GitHub
- Visual Studio Code

---

# 📂 Project Structure

```
PromptPilot-AI/
│
├── client/
│   ├── public/
│   ├── src/
│   └── package.json
│
├── server/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── routes/
│   ├── services/
│   ├── public/
│   ├── app.js
│   ├── server.js
│   └── package.json
│
├── Dockerfile
├── docker-compose.yml
├── .gitignore
└── README.md
```

---

# ⚙️ Environment Variables

Create a `.env` file inside the **server** directory.

```env
GEMINI_API_KEY=your_google_gemini_api_key
GEMINI_MODEL=gemini-3.1-flash-lite

PORT=8080
NODE_ENV=development

CORS_ORIGIN=*
RATE_LIMIT_WINDOW_MS=60000
RATE_LIMIT_MAX=20
```

---

# 🚀 Running the Project Locally

## Clone the repository

```bash
git clone https://github.com/Harshavardhan-1712/PromptPilot-AI.git

cd PromptPilot-AI
```

---

## Install dependencies

### Client

```bash
cd client
npm install
```

### Server

```bash
cd ../server
npm install
```

---

## Start the backend

```bash
npm run dev
```

---

## Start the frontend

```bash
cd ../client

npm run dev
```

---

Open

```
http://localhost:5173
```

---

# 🐳 Docker Deployment

Build the Docker image

```bash
docker build -t promptpilot-ai .
```

Run the container

```bash
docker run -p 8080:8080 promptpilot-ai
```

The application will be available at

```
http://localhost:8080
```

The project uses a **multi-stage Docker build** to package the React frontend and Express backend into a single production-ready container.

---

# ☁️ AWS Elastic Beanstalk Deployment

PromptPilot AI is deployed on **AWS Elastic Beanstalk** using a **Docker Single Instance Environment**.

### Deployment Steps

1. Build the Docker image.
2. Package the project into a ZIP archive.
3. Upload the ZIP to AWS Elastic Beanstalk.
4. Configure the environment variables:
   - GEMINI_API_KEY
   - GEMINI_MODEL
   - NODE_ENV
5. Deploy the application.
6. Verify deployment using the Health API.

### Live URL

http://promptpilot-ai.ap-southeast-2.elasticbeanstalk.com

---

# 📡 API Endpoints

## Health Check

```
GET /api/health
```

Example Response

```json
{
  "status": "ok",
  "timestamp": "2026-07-15T12:36:44.746Z"
}
```

---

## Generate Optimized Prompts

```
POST /api/improve
```

### Request

```json
{
  "prompt": "Build a portfolio website."
}
```

### Response

```json
{
  "betterPrompt": "...",
  "expertPrompt": "...",
  "shortPrompt": "...",
  "creativePrompt": "..."
}
```

---

# 📸 Screenshots

Include the following screenshots:

- Home Page
- Prompt Input
- Better Prompt
- Expert Prompt
- Creative Prompt
- Short Prompt
- AWS Elastic Beanstalk Dashboard
- Health API Response

---

# 🔮 Future Enhancements

- User Authentication
- Prompt History
- Multiple AI Model Support
- Prompt Templates
- Export Prompts as PDF
- Analytics Dashboard
- HTTPS using AWS Certificate Manager
- Custom Domain Support
- Team Collaboration Features

---

# 👥 Team Members

- **Harsha Vardhan B S**
- **B S Arshiya**
-  **R Pranav**

---

# 📚 References

- Google AI Studio Documentation
- Google Gemini API Documentation
- React Documentation
- Node.js Documentation
- Express.js Documentation
- Docker Documentation
- AWS Elastic Beanstalk Documentation

---

# 📄 License

This project was developed as part of the **Gen AI & Cloud Computing – Vibe Coding Project** for academic purposes.

---

## ⭐ If you found this project useful, consider giving it a star!
