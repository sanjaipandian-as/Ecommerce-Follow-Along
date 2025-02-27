# Ecommerce-Follow-Along

# Follow-along project milestone 1 Project Overview.

## Backend:

+ I created backend new folder.

+ Added .env files for secure passwords.

+ Created a db.js file to add Mongoose files for MongoDB.

+ Created middleware for user authentication.

+ Downloaded and set up Express.js.

+ Created the most important file, server.js, and set up an example server for the website.

These tasks were explained by my mentor during the backend files overview.

## Frontend:

+ Created frontend files.

+ Included all necessary node modules in the frontend.

+ Only created the basic frontend structure at this stage.

# This is what I accomplished in the Follow-Along Project Milestone #1.


# Follow-along project milestone 2 Project Overview.

## Frontend:

+ Created a pages folder in the src directory.

+ Inside the pages folder, created several files: Home.jsx, Login.jsx, and Navbar.jsx.

+ Developed a login page as part of the assignment using Tailwind CSS.

+ Downloaded Tailwind CSS using: 
# npm install tailwindcss @tailwindcss/vite

+ Added the modules in vite.config.js.

+ Integrated React Router for client-side routing.

+ Used react-icons from the React library for adding icons.

+ Installed React Icons using:

# npm install react-icons

+ Created a Navbar component.

+ Added navigation links to the Home and Login pages.

+ Linked the pages in the Navbar.

# For the Login page:

+ Added a "show password" feature with an eye icon for toggling password visibility.

# This is what I accomplished in the Follow-Along Project Milestone #2.


# Milestone 4: User Model, Controller and File Uploads

## Summary

+ This milestone is to create a User Model for ordered data, to build out the User Controllers for the proper CRUD operations, and finally, add in Multer for file uploads. The backend should now have user management with the ability to upload images.

## End

# Features Implemented
## 1. User Model

+ Schema Fields
+ username (String, required, unique)
+ email (String, required, unique)
+ password (String, required)
+ profileImage (String, upload path of the image)

+ createdAt & updatedAt (Timestamps) It makes use of Mongoose for schema validation and indexing.

## 2. User Controller

+ Methods:
+ createUser: It creates a new user with error checking.
+ getAllUsers: Fetch all users from the database.
+ getUserById: It fetches a single user by ID and throws an error if it is invalid.
+ updateUser: Updates user details and his profile image.

## 3. Multer File Uploads

## Config:

+ Store all uploads in the uploads/ folder
+ Only accept image/jpeg and image/png
+ Limit size to 5MB
+ Route: POST /users/:id/upload for profile pic upload
+ Technical Details
+ Database
+ MongoDB: NoSQL. It's dynamic information a user will have.
+ Mongoose: Schema modeling, query building, etc.

## Multer Setup

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/,
filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});

const upload = multer({ storage limits: { fileSize: 5 * 1024 * 1024 }, // 5MB

fileFilter: (req, file, cb) => if (file.mimetype.startsWith('image/')) cb(null, true); else cb(new Error('Only images are allowed!'), false)


# Follow-along project milestone 5 Project Overview.


# Signup Page Project

This project is a simple signup page built using **React** and **Tailwind CSS**. The aim of this assignment is to create a user-friendly and responsive signup page that can be integrated into various web applications.

## Project Description

+ The signup page project is designed to provide a clean and efficient way for users to register for an application. 

+ Utilizing React for component-based architecture and Tailwind CSS for rapid styling, this project ensures a smooth user experience and modern design.


# Milestone 6 - User Signup with Secure Data Storage

### Description
In this milestone, we’ve focused on implementing the backend endpoint for the signup page. The key objective was to ensure that user data, especially passwords, are securely stored in the database. By using *bcrypt* for password hashing, we are ensuring that passwords are encrypted before storing them, following best security practices.

### Features Implemented in Milestone 6:
- *Password Encryption:* The user’s password is hashed using bcrypt before storing it in the database.

- *Secure User Data Storage:* User details (name, email, etc.) are securely stored in the database, ensuring that sensitive information like passwords are never saved as plain text.

# Milestone 7 

### Description
In this milestone, we implemented the backend login functionality, which accepts user credentials (email/username and password), hashes the entered password using bcrypt, and compares it with the stored hashed password to validate the user's identity.


# Milestone 8

### Description 

In this milestone, we focused on developing a reusable Product Card Component and designed the homepage layout to display multiple product card dynamically.


- +Features Implemented:

- +Reusable Product Card Component: Displays product image, name, and price.

- +Dynamic Data Handling: Passed product details via props to ensure reusability.

- +Homepage Grid Layout: Used Flexbox/Grid for a structured and visually appealing product listing.

- +Array Mapping for Dynamic Rendering: Implemented mapping to iterate over product lists and render cards dynamically.

- +Consistent UI Design: Ensured uniform styling for all products




# Milestone 9 - Product Input Form  

## Overview  
In this milestone, we created a frontend form to take product details as input, including multiple images.  

## Features  
- Form to input product details  
- Supports multiple image uploads  
- Prepares data for future database storage  

## Submission  
Code is pushed to GitHub and publicly accessible.  



# Milestone 10 - Product Schema and API Endpoint  

## Overview  
In this milestone, we focused on building the backend for product management. We created a *Mongoose schema* to define product data structure and implemented a *POST API endpoint* to store product details in MongoDB.  

## Learning Goals 🎯  
By completing this milestone, we:  
- Created a *Product Schema* with validation.  
- Developed a *POST endpoint* to receive and store product details.  
- Ensured data integrity with validation techniques.  

## Features Implemented 🚀  

### 1. *Product Schema (Mongoose Model)*  
Defined a schema for storing product details with the following fields:  
- name (String, required)  
- description (String, required)  
- price (Number, required, min value set)  
- imageUrl (String, required)  
- createdAt & updatedAt (Timestamps)  

### 2. **POST API Endpoint (/api/products)**  
- Accepts product details in *JSON format*.  
- Validates required fields before storing in MongoDB.  
- Returns success/failure response.  

### 3. *Validation and Error Handling*  
- Ensures required fields are provided.  
- Validates correct data types (e.g., price must be a number).  
- Prevents duplicate entries (if necessary).  

