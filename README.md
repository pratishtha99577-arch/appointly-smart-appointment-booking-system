
Appointly — Smart Appointment & Booking System

A full-stack appointment booking platform built with React, Spring Boot, MySQL, and JWT authentication.

Appointly allows users to register, securely log in, browse available services, book appointments, view their appointments, and cancel bookings. It also includes role-based admin functionality for managing services and viewing appointments.

The project was developed as a portfolio project to demonstrate full-stack Java development, REST API design, authentication, authorization, database integration, and responsive frontend development.

---

✨ Features

👤 User Features

- User registration and login
- Secure password hashing using BCrypt
- JWT-based authentication
- Browse available services
- Book appointments
- View personal appointments
- Cancel appointments
- Form validation and error handling
- Responsive user interface

🛡️ Admin Features

- Role-based "USER" / "ADMIN" authorization
- Create appointment services
- View all appointments
- Backend-protected admin endpoints
- Automatic admin account seeding for local development

🔐 Security

- Spring Security integration
- JWT authentication
- BCrypt password hashing
- Role-based authorization
- Protected REST endpoints
- Environment-based configuration for sensitive credentials
- CORS configuration
- Centralized exception handling
- Validation of incoming requests

---

🛠️ Tech Stack

Frontend

Technology| Purpose
React| User interface
Vite| Frontend development/build tool
JavaScript| Application logic
CSS| Responsive UI styling
Lucide React| Icons

Backend

Technology| Purpose
Java 17| Backend programming language
Spring Boot 3| Backend framework
Spring Web| REST APIs
Spring Data JPA| Database access
Spring Security| Authentication & authorization
JJWT| JWT generation and validation
Bean Validation| Request validation
Maven| Dependency management/build

Database

- MySQL 8+
- Hibernate / JPA

---

🏗️ Application Architecture

                    ┌──────────────────────┐
                    │      React UI        │
                    │      Frontend        │
                    └──────────┬───────────┘
                               │
                               │ HTTP / REST API
                               ▼
                    ┌──────────────────────┐
                    │   Spring Boot API    │
                    │      Backend         │
                    └──────────┬───────────┘
                               │
                    ┌──────────┴───────────┐
                    │                      │
                    ▼                      ▼
             JWT Authentication       Service Layer
                    │                      │
                    │                      ▼
                    │               Spring Data JPA
                    │                      │
                    └──────────┬───────────┘
                               ▼
                       ┌──────────────┐
                       │    MySQL     │
                       │   Database   │
                       └──────────────┘

Request Flow

React Frontend
      ↓
REST API
      ↓
JWT Authentication
      ↓
Spring Security
      ↓
Controller
      ↓
Service / Business Logic
      ↓
JPA Repository
      ↓
MySQL

---

📁 Project Structure

appointly-smart-appointment-booking-system/
│
├── backend/
│   ├── src/
│   │   └── main/
│   │       ├── java/com/appointly/
│   │       │   ├── config/
│   │       │   ├── controller/
│   │       │   ├── dto/
│   │       │   ├── model/
│   │       │   ├── repository/
│   │       │   └── security/
│   │       │
│   │       └── resources/
│   │           └── application-example.properties
│   │
│   └── pom.xml
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
├── docs/
│   ├── API.md
│   └── SCREENSHOTS.md
│
├── .gitignore
└── README.md

---

🚀 Getting Started

Follow these steps to run Appointly locally.

Prerequisites

Make sure you have installed:

- Java 17+
- Maven 3.9+
- Node.js 18+
- MySQL 8+
- Git

---

⚙️ Backend Setup

1. Clone the repository

git clone https://github.com/pratishtha99577-arch/appointly-smart-appointment-booking-system.git
cd appointly-smart-appointment-booking-system

2. Create the MySQL database

Open MySQL Workbench or MySQL CLI and run:

CREATE DATABASE appointly;

3. Configure the backend

Copy:

backend/src/main/resources/application-example.properties

to:

backend/src/main/resources/application.properties

Update the local database credentials and JWT configuration.

Example:

spring.datasource.url=jdbc:mysql://localhost:3306/appointly
spring.datasource.username=YOUR_USERNAME
spring.datasource.password=YOUR_PASSWORD

spring.jpa.hibernate.ddl-auto=update

jwt.secret=YOUR_SECRET_KEY

«Important: Never commit your real "application.properties", database password, or JWT secret to GitHub.»

The project ".gitignore" is configured to keep sensitive local configuration files out of the repository.

4. Start the backend

cd backend
mvn spring-boot:run

The backend will normally run at:

http://localhost:8080

---

💻 Frontend Setup

Open another terminal.

1. Navigate to frontend

cd frontend

2. Install dependencies

npm install

3. Configure API URL

Create a ".env" file if required:

VITE_API_URL=http://localhost:8080/api

4. Start the frontend

npm run dev

Vite will provide the local development URL, normally:

http://localhost:5173

---

🔑 Demo Admin

For local development, the backend automatically seeds an administrator account when the application starts for the first time.

The credentials are defined inside the backend's data seeding configuration.

«For security reasons, demo credentials should not be reused in a production environment. Change or disable the seeded credentials before deployment.»

---

📡 REST API

Authentication

Method| Endpoint| Description
POST| "/api/auth/register"| Register a new user
POST| "/api/auth/login"| Authenticate a user

Services

Method| Endpoint| Access
GET| "/api/services"| Public
POST| "/api/admin/services"| Admin

Appointments

Method| Endpoint| Access
POST| "/api/appointments"| Authenticated User
GET| "/api/appointments/my"| Authenticated User
PATCH| "/api/appointments/{id}/cancel"| Authenticated User
GET| "/api/admin/appointments"| Admin

For detailed API information, see:

docs/API.md

---

🗄️ Database

Appointly uses MySQL with Spring Data JPA.

The application manages entities including:

- Users
- Services
- Appointments
- Roles
- Appointment Status

Hibernate/JPA automatically manages the database schema during local development.

---

🧪 Functionality Tested

The application has been tested locally for the following flows:

- ✅ User registration
- ✅ User login
- ✅ JWT authentication
- ✅ Service retrieval
- ✅ Appointment booking
- ✅ Viewing personal appointments
- ✅ Appointment cancellation
- ✅ Admin authentication/authorization
- ✅ Admin service creation
- ✅ Admin appointment retrieval
- ✅ MySQL persistence
- ✅ Frontend-backend communication
- ✅ Validation and error handling

---

📸 Screenshots

Screenshots and visual documentation can be added to:

docs/SCREENSHOTS.md

Recommended screenshots include:

1. Login page
2. Registration page
3. Services page
4. Appointment booking
5. My Appointments
6. Cancellation flow
7. Admin functionality
8. MySQL database tables

---

🔒 Production Considerations

This project is currently designed as a portfolio/development application.

Before production deployment, the following improvements should be implemented:

- Use environment variables for all secrets
- Use a managed production database
- Enable HTTPS
- Replace development admin credentials
- Add rate limiting
- Add stronger authentication policies
- Add production logging and monitoring
- Add automated tests
- Configure production CORS rules
- Add API documentation using OpenAPI/Swagger
- Use production-grade database migrations

---

🔮 Future Improvements

Possible future enhancements include:

- 📅 Calendar-based appointment scheduling
- 🔔 Email appointment confirmations
- 📱 SMS notifications
- 👨‍💼 Complete admin dashboard
- 📊 Admin analytics and booking statistics
- 🔎 Advanced service search and filtering
- ⏰ Automatic appointment reminders
- 💳 Online payment integration
- 🧪 Automated unit and integration testing
- 🐳 Docker support
- ☁️ Cloud deployment
- 📖 Swagger/OpenAPI documentation

---

🎯 What This Project Demonstrates

This project demonstrates practical experience with:

- Full-stack application development
- Java and Spring Boot
- RESTful API development
- React frontend development
- JWT authentication
- Spring Security
- Role-based authorization
- BCrypt password hashing
- MySQL database integration
- JPA/Hibernate
- Maven
- Git and GitHub
- Frontend-backend integration
- Environment-based configuration
- Error handling and validation
- Responsive UI development

The complete application follows the architecture:

React
  ↓
REST API
  ↓
Spring Boot
  ↓
Spring Security + JWT
  ↓
JPA / Hibernate
  ↓
MySQL

---

👩‍💻 Author

Pratishtha Patel

Integrated MCA Student | Full-Stack Developer

GitHub:
https://github.com/pratishtha99577-arch

---

⭐ Project

If you find this project useful or interesting, consider giving the repository a ⭐ on GitHub.

Appointly — Smart Appointment & Booking System
