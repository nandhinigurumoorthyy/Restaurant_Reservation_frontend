
# Password Reset Frontend

This repository contains the frontend code for a password reset flow application. The frontend is built using **React** with **Vite**, styled with **Bootstrap**, and deployed on **Netlify**.

---

## Features

- User Signup
- User Login
- Password Reset
- Responsive Design
- Integration with Backend API

---

## Prerequisites

- Node.js installed
- Backend URL for API integration
- Netlify account for deployment (if hosting the app on Netlify)

---

## Installation and Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/nandhinigurumoorthyy/Password-reset-flow-client.git
   cd Password-reset-flow-client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add the following variable:
   ```env
   VITE_API_URL=<your-backend-api-url>
   ```
   Replace `<your-backend-api-url>` with the URL of your deployed backend (`https://password-reset-flow-server-0ne8.onrender.com`).

4. Start the development server:
   ```bash
   npm run dev
   ```

   The application will run on `http://localhost:10000`.

---

## Deployment on Netlify

1. Create a Netlify account at [https://netlify.com](https://netlify.com).
2. Create a new site:
   - Connect your GitHub repository containing the frontend code.
   - Set up the build and deploy settings:
     - **Build Command**: `npm run build`
     - **Publish Directory**: `dist`
   - Add the following environment variable in the **Environment Variables** section of Netlify:
     - `VITE_API_URL=<your-backend-api-url>`
3. Deploy your site.
4. After deployment, Netlify will provide you with a URL (`https://password-reset-flow-client-ui.netlify.app`).

---

## API Integration

Ensure your application is using the correct backend API URL. For example, your API calls in the code should look like:
```javascript
const API_URL = import.meta.env.VITE_API_URL;
axios.post(`${API_URL}/create`, { name, email, password });
```
