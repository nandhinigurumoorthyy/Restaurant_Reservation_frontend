# Restaurant Reservation Frontend

This project is a restaurant reservation system built with React, Tailwind CSS, Node.js, MongoDB, and Axios. It provides functionality for users to browse restaurants, make reservations, submit reviews, login, signup, and manage their profiles.

---

## Live Demo:
👉 [**Click here to view the deployed site**](https://restaurant-reservation-ui.netlify.app/)

---

## Backend GitHub Repository:
 [**View Backend Code**](https://github.com/nandhinigurumoorthyy/Restaurant_Reservation_backend.git)

---

## Features:
- **Restaurant Listing**: Displays a list of restaurants fetched from `restaurant.json`.
- **Search and Filter**: Allows users to search for restaurants based on cuisine, price range, location, and other criteria.
- **Reservation**: Enables users to view restaurant details and make reservations.
- **Review Management**: Users can create, edit, and delete reviews for restaurants.
- **Authentication**: Includes a login and signup page with user authentication and session management using MongoDB and Node.js.
- **Profile Page**: Users can view and manage their profile information, including past reservations and reviews.
- **Fully Responsive Design**: The application is fully responsive and works seamlessly on mobile, tablet, and desktop devices.

---

## Tech Stack:  
  - React
  - Tailwind CSS

---

## Prerequisites:
- Node.js and npm should be installed on your local machine.
- MongoDB should be set up and running on your local system.

### **Backend Setup**:
You need to set up the backend to connect to MongoDB and handle API routes for login, signup, profile, reservation, and review operations.

---

### **Frontend Setup**:

1. **Navigate to the frontend directory**:


2. **Install dependencies**:
 

3. **Start the frontend**:
 

4. **Open your browser and go to `http://localhost:10000`** to view the application.

---

## **Core Features**

### 1. **Login and Signup**:
- **Login**: Users can authenticate using their email and password, and once logged in, they receive a JWT token for authentication.
- **Signup**: Users can create a new account by entering their name, email, and password, and this information is stored in MongoDB.

#### **Backend - index.js**:
- Handles signup and login routes.
- Validates email and password.
- Uses MongoDB for user data storage.

#### **Frontend - Login.js & Signup.js**:
- Simple forms that capture user credentials and communicate with the backend via Axios.

### 2. **Profile Page**:
- **Profile**: Users can view and edit their profile information, including their name, email, and previously made reservations.
- **Reservations**: Displays a list of past and upcoming reservations made by the user.
- **Reviews**: Users can view, edit, or delete their restaurant reviews.

#### **Backend - User Model**:
- Retrieves user profile information using Mongoose and MongoDB.
- Stores and retrieves reservations and reviews associated with the user.

#### **Frontend - ProfilePage.js**:
- Displays user profile information and handles user edits.
- Displays user’s past reservations and reviews.

### 3. **Reservation Page**:
- **Reservation**: Allows users to select a restaurant, choose a date, party size, and submit a reservation request.
- **Confirmation**: Sends the reservation details to the backend, which stores it in MongoDB.

#### **Backend - index.js**:
- API routes handle creating, retrieving, editing, and deleting reservations.
- Stores reservation data in the MongoDB database.

#### **Frontend - ReservationPage.js**:
- Contains a form for users to fill out reservation details and makes API calls to the backend for storage.

### 4. **Review Page**:
- **Review**: Users can create reviews for the restaurants they have visited.
- **Edit/Delete**: Users can edit or delete their reviews.
  
#### **Backend - index.js**:
- Handles review creation, update, and deletion using MongoDB.
- Stores reviews and manages the relationship between users and reviews.

#### **Frontend - ReviewPage.js**:
- Displays a list of restaurant reviews.
- Provides forms to create and edit reviews, which are sent to the backend using Axios.
---

### **How It Works**:
1. **Restaurant Data**: The restaurant data is fetched from `restaurant.json` in the frontend and used for listing and displaying details.
2. **Filters**: Filters allow users to narrow down restaurants by cuisine, price range, location, etc.
3. **Reservation**: Users can select a date, party size, and time to make a reservation, which is sent to the backend via Axios.
4. **Review**: Users can leave reviews for the restaurants they visited.
5. **Profile**: Users can manage their profile, view past reservations, and review history.

---

## **Dependencies**:
- **Backend**: `express`, `mongoose`, `jsonwebtoken`, `cors`, `axios`
- **Frontend**: `react`, `react-router-dom`, `axios`, `tailwindcss`

---

## **Tailwind CSS**:
This project uses **Tailwind CSS** for styling. Customize Tailwind by editing the `tailwind.config.js` file according to your design needs.

---

## **License**:
This project is licensed under the MIT License.
