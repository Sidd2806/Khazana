# MoodWear

MoodWear is a full-stack fashion e-commerce application built with React, Redux Toolkit, Express, MongoDB, and Cloudinary. It includes a customer storefront, cart and checkout flow, PayPal integration, user authentication, order management, and an admin dashboard for managing products, users, and orders.

## Features

- Responsive fashion storefront
- Product listing, filtering, search, product details, and similar products
- Cart management for guest and logged-in users
- User registration, login, profile, and order history
- Checkout and order confirmation flow
- PayPal payment integration
- Admin dashboard for users, products, and orders
- Product image upload with Cloudinary
- Local downloaded product images for seeded catalog data

## Tech Stack

**Frontend**

- React
- Vite
- Redux Toolkit
- React Router
- Tailwind CSS
- Sonner
- PayPal React SDK

**Backend**

- Node.js
- Express
- MongoDB
- Mongoose
- JWT authentication
- Multer
- Cloudinary

## Project Structure

```text
Dukaan/
├── backend/
│   ├── config/
│   ├── data/
│   ├── Middleware/
│   ├── model/
│   ├── routes/
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── public/
│   ├── src/
│   ├── package.json
│   └── vite.config.js
└── README.md
```

## Getting Started

### 1. Clone the repository

```bash
git clone <your-repository-url>
cd Dukaan
```

### 2. Install dependencies

```bash
cd backend
npm install

cd ../frontend
npm install
```

### 3. Configure environment variables

Create a `.env` file inside `backend/`:

```env
PORT=9000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

Create a `.env` file inside `frontend/`:

```env
VITE_BACKEND_URL=http://localhost:9000
VITE_PAYPAL_CLIENT_ID=your_paypal_client_id
```

### 4. Run the application locally

Start the backend:

```bash
cd backend
npm run dev
```

Start the frontend in another terminal:

```bash
cd frontend
npm run dev
```

The frontend will run on the Vite local URL, usually:

```text
http://localhost:5173
```

The backend API will run on:

```text
http://localhost:9000
```

## Useful Scripts

### Backend

```bash
npm run dev
npm start
npm run seed
npm run update:images
```

### Frontend

```bash
npm run dev
npm run lint
npm run build
npm run preview
```

## Deployment Notes

Deploy the backend and frontend separately.

### Backend

- Set the root directory to `backend`
- Build command: `npm install`
- Start command: `npm start`
- Add all backend environment variables from the `.env` section

### Frontend

- Set the root directory to `frontend`
- Build command: `npm install && npm run build`
- Publish directory: `dist`
- Set `VITE_BACKEND_URL` to the deployed backend URL
- Set `VITE_PAYPAL_CLIENT_ID` to the PayPal client ID

## API Overview

Main backend routes:

```text
GET    /api/products
GET    /api/products/:id
GET    /api/products/new-arrivals
GET    /api/products/best-seller
POST   /api/users/register
POST   /api/users/login
GET    /api/orders/my-orders
POST   /api/cart
POST   /api/checkout
POST   /api/upload
```

Admin routes:

```text
/api/admin/users
/api/admin/products
/api/admin/orders
```

## Readiness Checklist

- Frontend lint passes
- Frontend production build passes
- Product seed images use local downloaded assets
- No missing local product images found in the seed catalog
- Backend start script is deployment-friendly
