# Klyora 🛍️

A modern, full-featured **MERN stack** eCommerce platform built with **TypeScript**, supporting both users and admins. Klyora allows customers to browse products, manage carts, and place secure orders using **Stripe** — while admins can manage products, users, and orders efficiently.

> Designed for scalability, maintainability, and smooth user experience with full Dockerized backend and clean architecture.

---

## 🔗 Live Demo

👉 [Visit Klyora](https://klyora.vercel.app)

---

## 🛠️ Tech Stack

Klyora is powered by the following technologies:

| Technology                                                                                                             | Description               |
| ---------------------------------------------------------------------------------------------------------------------- | ------------------------- |
| ![MongoDB](https://img.shields.io/badge/-MongoDB-47A248?logo=mongodb&logoColor=white&style=for-the-badge)              | NoSQL Database            |
| ![Express.js](https://img.shields.io/badge/-Express.js-000000?logo=express&logoColor=white&style=for-the-badge)        | Backend framework         |
| ![React](https://img.shields.io/badge/-React-61DAFB?logo=react&logoColor=black&style=for-the-badge)                    | Frontend library          |
| ![Node.js](https://img.shields.io/badge/-Node.js-339933?logo=node.js&logoColor=white&style=for-the-badge)              | Backend runtime           |
| ![TypeScript](https://img.shields.io/badge/-TypeScript-3178C6?logo=typescript&logoColor=white&style=for-the-badge)     | Typed JavaScript          |
| ![Stripe](https://img.shields.io/badge/-Stripe-635BFF?logo=stripe&logoColor=white&style=for-the-badge)                 | Payment gateway           |
| ![Docker](https://img.shields.io/badge/-Docker-2496ED?logo=docker&logoColor=white&style=for-the-badge)                 | Containerized backend     |
| ![Redux Toolkit](https://img.shields.io/badge/-Redux%20Toolkit-764ABC?logo=redux&logoColor=white&style=for-the-badge) | State management          |
| ![React Toastify](https://img.shields.io/badge/-React%20Toastify-333?logo=react&logoColor=white&style=for-the-badge)   | Notifications             |

---

## ✨ Features

### 👥 User Experience

- Browse latest and featured products
- Add to cart and manage items
- Place orders with shipping info
- Track previous orders
- Secure payments with **Stripe Checkout**

### 🔐 Authentication

- JWT-based auth with HTTP-only cookies
- Login, register, and logout flows
- Auth state persisted using cookies

### 🛒 Admin Dashboard

- Add, edit, delete products
- Manage users and orders with changing order status

### 💳 Payments

- Integrated with Stripe for real-time secure checkout
- Webhook to confirm payments and update order status

### ⚙️ Backend

- Built with TypeScript, Express, and Mongoose
- Dockerized with support for easy deployment
- Middleware for error handling and authentication

---

## 🐳 Docker Setup (Backend)

```bash
# Build the image
docker build -t klyora-backend .

# Run the container
docker run -p 5000:5000 --env-file .env klyora-backend
```

---

Feel free to contribute
