# Learnaholic - Your Personalized Learning Partner

Learnaholic is an engaging, full-stack e-learning platform designed to revolutionize online education. It combines interactive learning experiences with AI-driven personalization to help students, professionals, and lifelong learners achieve their academic and career goals.

## 🚀 Features

- **🎯 Personalized Learning Paths**: Tailored content recommendations based on user behavior and performance.
- **🧩 Interactive Content**: Quizzes, games, and flashcards make learning fun and memorable.
- **🔍 Smart Search**: Quickly find relevant courses, topics, or resources.
- **📊 Progress Tracking**: Visualize your learning journey with detailed progress analytics.
- **🧠 AI Quiz Generator**: Automatically creates quizzes from uploaded lecture materials.
- **🔐 Proctoring Tools**: Tab switch detection, webcam monitoring, and more to ensure academic integrity.
- **📚 Diverse Content Library**: Includes programming, soft skills, interview prep, and much more.

## 🛠️ Tech Stack

### 🔧 Frontend
- React.js (v18.3.1)
- TypeScript (v5.5.3)
- Tailwind CSS (v3.4.11)
- Vite (v5.4.1)
- React Router DOM (v6.26.2)
- React Query (TanStack Query v5.56.2)
- Radix UI components (shadcn/ui)
- Framer Motion (v12.10.5)
- React Hook Form (v7.53.0)
- Zod (v3.23.8) for validation

### ⚙️ Backend
- Node.js
- Express.js (v4.18.2)
- MongoDB (v6.3.0)
- Multer (v1.4.5-lts.2) for file uploads
- CORS (v2.8.5)
- dotenv (v16.3.1)

### 🧠 AI & ML (Planned Features)
- Python (Scikit-learn, OpenCV, YOLOv8)
- Natural Language Processing for quiz generation
- Proctoring features with webcam and browser interaction monitoring

### 🗄️ Database
- MongoDB

## 💡 Use Cases

- Students looking for a structured and interactive way to study
- Teachers who want to automate quiz generation from lecture notes
- Institutions requiring proctored assessments
- Lifelong learners seeking personalized content

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (running locally or cloud instance)
- npm or yarn package manager

### Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd learnaholic-neon-pathways-main
   ```

2. **Install dependencies for both backend and frontend**

   **Backend:**
   ```bash
   cd learnaholic-neon-pathways-main/backend
   npm install
   ```

   **Frontend:**
   ```bash
   cd learnaholic-neon-pathways-main/learnaholic-neon-pathways-main
   npm install
   ```

### Running the Application

#### Backend Server

Navigate to the backend directory and start the server:

```bash
cd learnaholic-neon-pathways-main/backend
node server.js
```

**Expected Output:**
```
Connected to MongoDB
Server running on port 5000
```

The backend API will be available at: `http://localhost:5000`

#### Frontend Development Server

In a new terminal window, navigate to the frontend directory and start the development server:

```bash
cd learnaholic-neon-pathways-main/learnaholic-neon-pathways-main
npm run dev
```

**Expected Output:**
```
VITE v5.4.10  ready in 421 ms

➜  Local:   http://localhost:8080/
➜  Network: http://192.168.177.89:8080/
```

The frontend application will be available at: `http://localhost:8080`

### Environment Configuration

Create a `.env` file in the backend directory with the following variables:

```env
MONGODB_URI=mongodb://localhost:27017/learnaholic
PORT=5000
```

### API Endpoints

The backend provides the following API endpoints:

- `POST /api/auth/register` - User registration with password validation
- `POST /api/auth/login` - User authentication
- `GET /api/users/:userId` - Get user profile
- `PUT /api/users/:userId` - Update user profile
- `DELETE /api/users/:userId` - Delete user account
- `POST /api/users/:userId/profile-picture` - Upload profile picture
- `POST /api/contact` - Submit contact form
- `POST /api/newsletter` - Subscribe to newsletter
- `POST /api/test/create-user` - Create test user (development)

## 🏗️ Project Structure

```
learnaholic-neon-pathways-main/
├── backend/
│   ├── server.js
│   ├── package.json
│   └── uploads/
├── learnaholic-neon-pathways-main/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ui/ (shadcn/ui components)
│   │   │   ├── Navbar.tsx
│   │   │   ├── Hero.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── ...
│   │   ├── pages/
│   │   │   ├── Index.tsx
│   │   │   ├── SignIn.tsx
│   │   │   ├── SignUp.tsx
│   │   │   ├── Profile.tsx
│   │   │   └── ...
│   │   ├── services/
│   │   │   ├── authService.ts
│   │   │   └── contactService.ts
│   │   ├── lib/
│   │   │   ├── mongodb.ts
│   │   │   └── utils.ts
│   │   └── hooks/
│   ├── package.json
│   ├── tailwind.config.ts
│   ├── vite.config.ts
│   └── index.html
└── README.md
```

## 🔧 Development

### Backend Development

The backend is built with Node.js and Express.js, providing RESTful API endpoints for user management, authentication, and data handling. It includes:

- Password validation with specific requirements
- File upload handling for profile pictures
- MongoDB integration with proper indexing
- CORS configuration for frontend communication

### Frontend Development

The frontend is built with React.js and TypeScript, using modern tools like Vite for fast development and Tailwind CSS for styling. Key features include:

- Modern UI components using Radix UI and shadcn/ui
- Form handling with React Hook Form and Zod validation
- State management with React Query
- Responsive design with Tailwind CSS
- Client-side routing with React Router DOM

## 🐛 Troubleshooting

### Common Issues

1. **"Cannot find module" error**: Make sure you're running commands from the correct directories
   - Backend: `learnaholic-neon-pathways-main/backend`
   - Frontend: `learnaholic-neon-pathways-main/learnaholic-neon-pathways-main`

2. **"Failed to fetch" error**: Ensure both backend and frontend servers are running
   - Backend should be on port 5000
   - Frontend should be on port 8080

3. **MongoDB connection issues**: Verify MongoDB is running on port 27017

4. **CORS errors**: The backend is configured to allow requests from the frontend

### Port Conflicts

If you encounter port conflicts:
- Backend: Change `PORT` in `.env` file or use `process.env.PORT`
- Frontend: Vite will automatically find an available port

## 📝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🤝 Support

For support and questions, please open an issue in the repository or contact the development team.

## 👨‍💻 About the Developer

Hi, I'm **Vipin S S** – a passionate full-stack developer and AI enthusiast. I built Learnaholic to make education more interactive and personalized for learners everywhere.

- 🌱 Currently enhancing Learnaholic with AI and ML features.
- 💼 Open to collaboration and internship opportunities.
- 📫 Connect with me:  
  - [GitHub](https://github.com/ivipin7)  
  - [LinkedIn](https://www.linkedin.com/in/vipin-s-s-/)  
  - ✉️ ivipin17@gmail.com

---

**Happy Learning! 🎓** 