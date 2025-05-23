# 📝 Task Management System API

A mini task management system backend built with **Express.js**, **TypeScript**, **MongoDB**, and **JWT** authentication. Features include user registration, task management, Swagger API documentation, cron jobs, and unit testing.

---

## 🚀 Features

- User registration with encrypted passwords
- Token-based authentication using JWT
- Task creation, listing, status updates, and deletion
- Duplicate task prevention per user
- Auto-close in-progress tasks after 2 hours via `node-cron`
- Swagger/OpenAPI documentation
- Unit testing using Jest

---

## 🧰 Tech Stack

- **Node.js** + **Express**
- **TypeScript**
- **MongoDB** with **Mongoose**
- **JWT** for authentication
- **bcrypt** for password hashing
- **Swagger** for API docs
- **node-cron** for scheduling
- **Jest** + **Supertest** for testing

---

## 📦 Installation

```bash
git clone https://github.com/Priyanshu15092001/Logictrix-backend-assignment.git
cd Logictrix-backend-assignment
npm install
```

---

## 🛠️ Environment Variables
Create a .env file in the root and add:

```bash
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

---

## 🚦 Start the Server

```bash
# For development
npm run dev

# For production
npm run build
npm start
```

---

## 🔁 API Endpoints

| Method | Route                   | Description              |
| ------ | ----------------------- | ------------------------ |
| POST   | `/api/users`            | Register new user        |
| POST   | `/api/tasks`            | Create a task            |
| GET    | `/api/tasks?userId=`    | Get all tasks for a user |
| PATCH  | `/api/tasks/:id/status` | Update task status       |
| DELETE | `/api/tasks/:id`        | Delete a task            |

---

## 📚 Swagger Docs
After running the server, visit:

```bash
http://localhost:5000/api-docs
```

---

## 🕒 Cron Job

- A node-cron job runs every 10 minute to auto-close tasks that are in-progress for more than 2 hours.

---

## 🧪 Testing with Jest
This project uses Jest and Supertest for unit and integration testing of API endpoints.

### ✅ Example Tested Endpoint
POST /api/users is tested to verify:
- User registration works
- Duplicate users are rejected
- Token is returned upon successful registration

### 🛠 Test Setup
The test suite connects to a separate test database defined by the environment variable MONGO_TEST_URI.

Make sure you have a .env.test file with:

```bash
MONGO_TEST_URI=your_test_mongodb_uri
```

Also, ensure tsconfig.json has the following to allow JSON imports (used for Swagger, etc.):

```bash
{
  "compilerOptions": {
    "resolveJsonModule": true,
    "esModuleInterop": true,
    ...
  }
}
```

### ▶️ Running Tests
To execute all tests:

```bash
npx jest
```

---

## 📁 Folder Structure

```bash
src/
├── controllers/
├── models/
├── routes/
├── middleware/
├── cron/
├── config/
├── swagger/
├── tests/
└── app.ts
```

---

## 🧑‍💻 Author
- Priyanshu Ghosh