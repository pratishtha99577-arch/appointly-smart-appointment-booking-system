# Appointly — Smart Appointment & Booking System

A full-stack appointment booking platform built to demonstrate **React, Spring Boot, MySQL, JWT authentication, REST APIs, JPA, role-based authorization, and responsive UI design**.

## Tech Stack

### Frontend
- React + Vite
- JavaScript
- Lucide React
- Responsive CSS
- JWT-based session handling

### Backend
- Java 17
- Spring Boot 3
- Spring Web
- Spring Data JPA
- Spring Security
- JWT (JJWT)
- Bean Validation
- MySQL
- Maven

## Features

- User registration and login
- BCrypt password hashing
- JWT authentication
- USER / ADMIN roles
- Browse appointment services
- Authenticated appointment booking
- View personal appointments
- Cancel appointments
- Admin service creation
- Admin appointment overview
- Validation and centralized error responses
- CORS configuration
- MySQL persistence
- Responsive premium interface

## Project Structure

```text
Smart_Appointment_Booking_System/
├── frontend/
├── backend/
├── docs/
├── .gitignore
└── README.md
```

## 1. Backend Setup

Requirements:
- Java 17+
- Maven 3.9+
- MySQL 8+

Create a MySQL database:

```sql
CREATE DATABASE appointly;
```

Copy:

```text
backend/src/main/resources/application-example.properties
```

to:

```text
backend/src/main/resources/application.properties
```

Then update your local MySQL username/password and JWT secret.

Run:

```bash
cd backend
mvn spring-boot:run
```

Backend starts at:

```text
http://localhost:8080
```

## 2. Frontend Setup

Requirements:
- Node.js 18+

Run:

```bash
cd frontend
npm install
npm run dev
```

Frontend starts at the Vite URL shown in the terminal, normally:

```text
http://localhost:5173
```

Optional `.env`:

```text
VITE_API_URL=http://localhost:8080/api
```

## Demo Admin

The backend seeds an admin account on first startup:

```text
Email: admin@appointly.local
Password: Admin@12345
```

Change the password before using this project outside a demo environment.

## Main API Endpoints

### Authentication

```text
POST /api/auth/register
POST /api/auth/login
```

### Services

```text
GET  /api/services
POST /api/admin/services
```

### Appointments

```text
POST   /api/appointments
GET    /api/appointments/my
PATCH  /api/appointments/{id}/cancel
GET    /api/admin/appointments
```

## Portfolio Notes

This project is intentionally structured as a portfolio-ready full-stack application. It demonstrates the flow:

**React UI → REST API → JWT Security → Spring Service Layer → JPA → MySQL**

For production deployment, use environment variables for database credentials and JWT secrets, HTTPS, stronger operational logging, rate limiting, and a managed database.

## Author

**Pratishtha Patel**

Built as a portfolio project to demonstrate full-stack Java development.
