# Nexus Retail - Full Stack E-Commerce Platform

Live Demo:
https://smart-ecommerce-platform-xi.vercel.app

Backend API:
https://smart-ecommerce-platform-zj7d.onrender.com

Swagger Documentation:
https://smart-ecommerce-platform-zj7d.onrender.com/swagger-ui.html

---

## Project Overview

Nexus Retail is a full stack e-commerce platform built using React, Spring Boot, MySQL, JWT Authentication, Docker, and cloud deployment platforms.

The application supports:

- User authentication
- Admin authentication
- Product management
- Cart system
- Order management
- Payment simulation
- Admin analytics dashboard
- Responsive UI
- REST APIs
- Cloud deployment

---

## Tech Stack

### Frontend
- React.js
- Axios
- CSS
- Vercel Deployment

### Backend
- Spring Boot
- Spring Security
- JWT Authentication
- Spring Data JPA
- Hibernate
- REST APIs

### Database
- MySQL
- Railway Cloud Database

### DevOps
- Docker
- Render Deployment
- GitHub

---

---

## Screenshots

### Login Page
![Login](screenshots/login.png)

### Register Page
![Register](screenshots/register.png)

### Products Page
![Products](screenshots/products.png)

### Cart Page
![Cart](screenshots/cart.png)

### Admin Dashboard
![Admin](screenshots/admin.png)

### Swagger API
![Swagger](screenshots/swagger.png)

## Features

### User Features
- Register/Login
- Browse products
- Search products
- Filter products
- Add to cart
- Place orders
- View order history

### Admin Features
- Admin login
- Add products
- Update products
- Delete products
- Manage orders
- View analytics dashboard

---

## Architecture

Frontend → React + Axios

Backend → Spring Boot REST APIs

Database → MySQL

Authentication → JWT Token Based Security

Deployment:
- Frontend → Vercel
- Backend → Render
- Database → Railway

---

## API Endpoints

### Authentication
- POST /api/auth/register
- POST /api/auth/login

### Products
- GET /api/products/page
- GET /api/products/search
- POST /api/products/add
- PUT /api/products/update/{id}
- DELETE /api/products/delete/{id}

### Cart
- POST /api/cart/add
- GET /api/cart/{email}

### Orders
- POST /api/orders/place
- GET /api/orders/{email}

---

## Docker Commands

Build Docker Image

```bash
docker build -t ecommerce-backend .
```

Run Docker Container

```bash
docker run -p 8080:8080 ecommerce-backend
```

---

## Local Setup

### Frontend

```bash
npm install
npm run dev
```

### Backend

```bash
./gradlew bootRun
```

---

## Deployment

### Frontend
Deployed using Vercel

### Backend
Deployed using Render

### Database
Hosted on Railway MySQL

---

## Future Improvements

- Razorpay Integration
- Wishlist System
- Email Notifications
- Cloudinary Image Upload
- Redis Caching
- CI/CD Pipeline
- Order Invoice PDF
- Recommendation System

---

## Author

Anushree Naidu