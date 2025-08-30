# Backend - Authentication API

A robust NestJS backend API providing authentication services with JWT tokens, user management, and MongoDB integration.

## 🚀 Tech Stack

- **NestJS** - Progressive Node.js framework
- **TypeScript** - Type-safe JavaScript
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **Passport** - Authentication middleware
- **bcryptjs** - Password hashing
- **Class Validator** - Validation decorators

## 📋 Prerequisites

- Node.js (version 16 or higher)
- MongoDB (version 4.4 or higher)
- npm package manager

## 🛠️ Installation

1. Navigate to the backend directory:
```bash
cd easygenerator-auth-backend
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file (if not exists):
```bash
cp .env.example .env
```

4. Configure environment variables in `.env`:
```env
MONGODB_URI=mongodb://localhost:27018/auth-app
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=7d
PORT=3001
```

## 🗄️ Database Setup

### MongoDB Installation

**Ubuntu/Debian:**
```bash
sudo apt update
sudo apt install mongodb
sudo systemctl start mongodb
sudo systemctl enable mongodb
```

**macOS (using Homebrew):**
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb/brew/mongodb-community
```

**Windows:**
Download and install from [MongoDB Official Website](https://www.mongodb.com/try/download/community)

### Database Configuration
Make sure MongoDB is running on the port specified in your `.env` file (default: 27018).

## 🏃‍♂️ Running the Application

### Development Mode
Start the server with hot reload:
```bash
npm run start:dev
```
The API will be available at `http://localhost:3001`

### Production Mode
Build and start the production server:
```bash
npm run build
npm run start:prod
```

### Debug Mode
Start with debugging enabled:
```bash
npm run start:debug
```

## 🧪 Testing

### Unit Tests
Run unit tests:
```bash
npm run test
```

### Watch Mode
Run tests in watch mode:
```bash
npm run test:watch
```

### Coverage Report
Generate test coverage report:
```bash
npm run test:cov
```

### End-to-End Tests
Run e2e tests:
```bash
npm run test:e2e
```

## 🧹 Code Quality

### Linting
Run ESLint to check and fix code issues:
```bash
npm run lint
```

### Formatting
Format code with Prettier:
```bash
npm run format
```

## 📁 Project Structure

```
src/
├── auth/               # Authentication module
│   ├── dto/           # Data Transfer Objects
    ├── auth.controller.ts  #Authentication controller
│   ├── auth.module.ts  # Authentication module
│   ├── jwt.strategy.ts # JWT strategy
│   └── auth.service.ts  # Authentication service
├── users/             # Users module
│   ├── user.schema.ts # User schema
│   ├── users.module.ts # Users module
│   └── users.service.ts
├── app.module.ts      # Root application module
└── main.ts           # Application entry point
```

## 🔧 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run start` | Start the application |
| `npm run start:dev` | Start in development mode |
| `npm run start:debug` | Start with debugging |
| `npm run start:prod` | Start production build |
| `npm run build` | Build the application |
| `npm run lint` | Run ESLint |
| `npm run format` | Format code with Prettier |
| `npm run test` | Run unit tests |
| `npm run test:watch` | Run tests in watch mode |
| `npm run test:cov` | Generate coverage report |
| `npm run test:e2e` | Run e2e tests |

## 🌐 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `MONGODB_URI` | MongoDB connection string | `mongodb://localhost:27018/auth-app` |
| `JWT_SECRET` | Secret key for JWT tokens | Required |
| `JWT_EXPIRES_IN` | JWT token expiration time | `7d` |
| `PORT` | Server port | `3001` |

## 🔌 API Endpoints

### Authentication
- `POST /auth/signup` - Register new user
- `POST /auth/signin` - User login
- `GET /auth/profile` - Get user profile (protected)


## 🔐 Authentication Flow

1. User registers with email and password
2. Password is hashed using bcryptjs
3. User data is stored in MongoDB
4. On login, credentials are validated
5. JWT token is generated and returned
6. Protected routes require valid JWT token in Authorization header

## 📊 API Documentation

Start the server and visit `http://localhost:3001/api` .

## 🚀 Deployment

### Production Environment
1. Set production environment variables
2. Build the application: `npm run build`
3. Start production server: `npm run start:prod`


## 🤝 Contributing

1. Follow NestJS conventions
2. Write tests for new features
3. Run linting and formatting before committing
4. Ensure all tests pass
5. Update API documentation

## 📄 License

This project is licensed under the MIT License.
