# 📝 Quiz App

This is a full-stack **Quiz App** built using the **MERN stack (MongoDB, Express, React, Node.js)**.  
It allows users to take quizzes, view results, and manage quiz data through an interactive UI.

---

## 🚀 Tech Stack

- **Frontend**: Vite + React.js
- **Backend**: Node.js + Express.js
- **Database**: MongoDB
- **Authentication**: JSON Web Tokens (JWT)
- **State Management**: React Context API

---

## 📂 Project Structure
```
quiz-app/ 
│── quiz-app-backend/ # Backend (Node.js, Express, MongoDB) 
│── quiz-app-frontend/ # Frontend (Vite + React) 
│── .gitignore # Git ignore file 
│── README.md # Project documentation
```
---

## 🛠️ Installation & Setup

Follow these steps to run the project locally:

### 1️⃣ Clone the Repository  
```sh
git clone https://github.com/your-username/quiz-app.git
cd quiz-app
```

### 2️⃣ Install Dependencies

Install backend dependencies:
```sh
cd quiz-app-backend
npm install

```

Install frontend dependencies:
cd ../quiz-app-frontend
npm install

## 🔧 Backend Configuration

### 3️⃣ Setup Environment Variables
Create a .env file inside the quiz-app-backend/ folder and add the following:
```
PORT=5000
MONGO_URI=YOUR_MONGODB_URL
JWT_SECRET=YOUR_JWT_SECRET
```

