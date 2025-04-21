# Implement Firebase into React E-Commerce App


In this assignment, you will extend your eCommerce app by integrating Firebase for product management and user orders. You'll replace the previous FakeStore API with Firestore for managing products and implement Firebase to store and manage user orders.



**PROJECT REQUIREMENTS**


**Firebase Setup**

*Set Up Firebase in Your Project:*
- Create a Firebase project in the Firebase console.
- Add your E-commerce app to the Firebase project.
- Configure Firebase SDK in your project.
- Enable Firebase Authentication and Firestore in the Firebase console.


**Firebase Authentication**

*Implement User Registration:*
- Allow new users to register with their email and password using Firebase Authentication.
- Upon registration, create a corresponding user document in the users collection in Firestore

*Implement Login and Logout*
- Authenticate users with Firebase Authentication (email/password).
- Add a logout button that signs users out.


**User Management**

*Migrate CRUD Operations to Firestore*
- Replace any existing CRUD operations for users with Firestore operations.
- Operations to implement:
  - Create: Add a user document when a new user registers.
  - Read: Fetch user data to display their profile.
  - Update: Allow users to edit their profile information (e.g., name, address).
  - Delete: Let users delete their account and remove their data from Firestore.


  **Product Management**

*Replace FakeStore API:*
- Create a products collection in Firestore to store product data.

*CRUD Operations for Products:*
- Like before, the user should be able to fetch all existing products.  But now, they will be pulling from the data in Firestore
- Inside the app a user should be able to Create, Update, and Delete existing products


  **Order Management**
*Create Orders*
- When users place their orders in their cart, store that order in Firebase.  The order should include all products in the order as well as the user who placed the order

*Create Orders*
- Allow users to access a list of their previous carts, serving as a history of their orders.
- Fetch the list of user carts from the backend API endpoint.
- Display each cart entry with details such as the cart ID, date of creation, and the total price of the order.
- Enable users to click on individual orders to view the full details, including the list of products and the total price of the order.