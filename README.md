# this is express js web server with MVC architecture 
This a backend of my final year project. My project name Eduverse. It is a Ai Classroom where teacher user auto take attendese of students. Additionally features chat with pdf, youtube video and generate MCQ questions as far.
## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Installation](#installation)
- [Prerequisites](#prerequisites)
- [Configuration](#configuration)
- [Running the Project](#running-the-project)
- [Contributing](#contributing)
- [License](#license)

## Overview
Here i used prisma for sceama with MVC architecture. Moreover here i create own authentication process with node mailer. Token code send from our own Gmail. Use hashing for password authentication, prisma for multiple database access, authenticate with bcryptjs, cookie perser for storage jsonweb token, express-rate-limit for control user request, JOI for schema validation, input secure with regex etc

## Features
- Registration
    ```api/signup```
- Login
    ```api/login```
- Logout
    ```api/logout```
- Forgot Password
    ```api/signup```
- User Verify 
    ```/:id/verify/:token/```

- Create Post
    ```/post/create```
- Delete Post
    ```/post/delete/:id```
- Modify Post
    ```/post/update/:id```
- Read Post
    ```/post/get```

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/your-project.git
   cd your-project
   npm install
   ```
## Prerequisites
    Before you begin, ensure you have the following installed:

    Node.js
    MongoDB
    Prisma

## Configuration
1. Create a .env file in the root of your project and add the following variables:
```bash
DATABASE_URL="mongodb+srv://your-username:your-password@your-mongodb-url/your-database-name?retryWrites=true&w=majority"
JWT_SECRET=your-jwt-secret

BASE_URL=http://localhost:5000/api
HOST=smtp.gmail.com
SERVICE=gmail
EMAIL_PORT=587
SECURE=true
USER=your-email@gmail.com
PASS=your-email-password
```
2. Replace placeholders like your-username, your-password, your-mongodb-url, your-database-name, your-jwt-secret, and your-email with your actual configuration.

## Running the Project
1. Generate Prisma client:
```bash
npx prisma generate
```
2. Start the development server with nodemon:
```bash
npm run dev
```
3. Your project should now be running at ```http://localhost:5000```.

## Contributing
If you'd like to contribute to the project, please follow the Contribution Guidelines.

## License
This project is licensed under the MIT License