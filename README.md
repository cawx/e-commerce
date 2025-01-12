
# E-Commerce Platform
A fully-featured e-commerce application built with Spring Boot, Next.js, PostgreSQL, and Amazon S3 for managing products, user accounts, and transactions. It includes image upload functionality, JWT authentication, and a future Stripe integration for payment processing.
## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Setup Instructions](#setup-instructions)
- [Usage examples](#usage-examples)
- [API Documentation](#api-documentation)
- [Future Improvements](#future-improvements)
- [Frontend](#frontend)
## Features
- User registration and authentication (JWT)
- Product management (CRUD operations)
- Image uploads and storage using Amazon S3
- Cart management
- Integration with PostgreSQL for data persistence
- RESTful APIs for frontend-backend communication
- [Planned] Stripe integration for payments
## Tech Stack
- **Backend**: Spring Boot
- **Frontend**: Next.js
- **Database**: PostgreSQL
- **Storage**: Amazon S3 (for image uploads)
- **Security**: Spring Security, JWT
- **Build Tool**: Maven
## Setup Instructions
### 1. Clone the Repository
```
git clone https://github.com/yourusername/e-commerce.git
cd e-commerce
```
### 2. Backend Setup
Pull the PostgreSQL image using Docker and run the engine.
Update application.properties in backend/src/main/resources/ with your database credentials.
AWS S3:
Create an S3 bucket.
Add a .env file in the backend directory with:
```
aws.accessKeyId=YOUR_ACCESS_KEY
aws.secretKey=YOUR_SECRET_KEY
aws.region=YOUR_REGION
```
Run the Backend:
```
cd backend
mvn spring-boot:run
```
The backend APIs will be available at: http://localhost:8080

### 3. Frontend Setup
Install Dependencies:
```
cd ../frontend
npm install
```
Run the Frontend:
```
npm run dev
```
The application will be available at: http://localhost:3000
## Usage examples
- **Add a Product**:
  - Use the `/products/add` endpoint with a POST request.
  - Include a `MultipartFile` (image) and product details in the form-data.

- **Get All Products**:
  - Send a GET request to `/products`.

- **User Registration and Login**:
  - POST `/register` to create a new user.
  - POST `/login` to log in and retrieve a http-only JWT token.

## API Documentation

**Base URL**: `http://localhost:8080`

| Endpoint             | Method | Description                        |
|----------------------|--------|------------------------------------|
| `/products`          | GET    | Get all products                  |
| `/products/add`      | POST   | Add a new product (Admin only)    |
| `/register`     | POST   | Register a new user               |
| `/login`        | POST   | Login and retrieve JWT token      |

If the backend is running, you can see a more comprehensive api documentation via http://localhost:8080/swagger-ui/index.html.

## Future Improvements
- Clean up, additional fixes, optimization, structure fixes.
- Integration with Stripe for payment processing
- Admin dashboard for inventory management
- Continuing the implementation of the frontend
- Dockerization

## Frontend
Screenshot of the current progress of the frontend implementation. Theres also working pages for the login and registration functionality but they're too ugly to share currently.
Homepage.
![image](https://github.com/user-attachments/assets/d41cfea0-0b3b-4bb7-b063-87dc6b5a8897)

