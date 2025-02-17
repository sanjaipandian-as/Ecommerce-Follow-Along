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

