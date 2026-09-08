# Appointly API Reference

Base URL:

`http://localhost:8080/api`

## Authentication

### Register

`POST /auth/register`

```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "password": "Password@123"
}
```

### Login

`POST /auth/login`

```json
{
  "email": "jane@example.com",
  "password": "Password@123"
}
```

The response contains a JWT token. Send it as:

```text
Authorization: Bearer <token>
```

## Services

`GET /services`

Public endpoint.

## User Appointments

`POST /appointments`

```json
{
  "serviceId": 1,
  "appointmentDate": "2026-10-15",
  "appointmentTime": "10:30"
}
```

`GET /appointments/my`

`PATCH /appointments/{id}/cancel`

## Admin

Requires ADMIN role.

`GET /admin/appointments`

`POST /admin/services`
