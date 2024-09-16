
# E-Auction Hub

The Auction website is a student-built project combining Django and React for a college assignment. It enables users to participate in live auctions, place bids, and manage their auction history. With Django handling the backend and React providing a smooth, responsive interface, the platform offers real-time bidding, product details, and user profiles. This project highlights the student’s full-stack development skills in creating a dynamic, user-friendly auction site.


## Documentation

- [React](https://react.dev/)
- [Django](https://www.djangoproject.com/)
- [djangorestframework](https://www.django-rest-framework.org/)
- [Tailwind CSS](https://tailwindcss.com/)

## Project Structure

```
E-Auction-HUB/
│
├── backend/                  # Django backend
│   ├── project/              # Django project settings and configurations
│   ├── app/                  # Django app(s) (e.g., auctions, users)
│   ├── manage.py             # Django management script
│   └── requirements.txt      # Python package dependencies
│
├── frontend/                 # React frontend
│   ├── public/               # Static files like index.html
│   ├── src/                  # React components and source files
│   ├── package.json          # Node.js dependencies
│
└── README.md                 # This README file
```


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`REACT_APP_API_TOKEN` : 
 token will be in Tokens model at `localhost:8000/admin` (Note : You have to create token for Superuser at admin panel and then you have to apply that token here)

`REACT_APP_SECRET_KEY` : "you can use any string here for your key"


## Installation

1. **Clone the repository:**

   Open Command Prompt (cmd) or PowerShell (Windows) or a terminal (Linux/Mac) and run:

   ```bash
   git clone https://github.com/Darshil0109/E-Auction-Hub.git
   cd E-Auction-HUB/backend
   ```

4. **Create and activate a virtual environment:**

   - **Windows:**

     ```bash
     python -m venv env
     .\env\Scripts\activate
     ```

   - **Linux/Mac:**

     ```bash
     python3 -m venv env
     source env/bin/activate
     ```

5. **Install the required packages:**

   ```bash
   pip install -r requirements.txt
   ```


6. **Run migrations:**

   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```

7.  **Create a superuser:**

   ```bash
   python manage.py createsuperuser
   ```
 
8. **Start the Django development server:**

   ```bash
   python manage.py runserver
   ```

### Frontend (React)

1. **Navigate to the frontend directory:**

   ```bash
   cd ../frontend
   ```

2. **Install Node.js and npm:**

   Ensure you have Node.js and npm installed. You can download and install them from [nodejs.org](https://nodejs.org/).

3. **Install the Node.js dependencies:**

   ```bash
   npm install
   ```

4. **Run the React development server:**

   ```bash
   npm start
   ```


# API Documentation



## Authentication Endpoints

**Base URL**
```http
localhost:8000/
```
### Login
- **URL:** `/auth/login/`
- **View:** `LoginAuthTokenViewSet`
- **Method:** POST
- **Description:** Authenticate a user and receive an auth token.

### Signup
- **URL:** `/auth/signup/`
- **View:** `SignupAuthTokenViewSet`
- **Method:** POST
- **Description:** Register a new user and receive an auth token.

## API Endpoints

### Users
- **URL:** `/api/users/`
- **View:** `UserViewSet`
- **Methods:** GET, POST, PUT, DELETE
- **Description:** CRUD operations for user management.

### Categories
- **URL:** `/api/category/`
- **View:** `CategoryViewSet`
- **Methods:** GET, POST, PUT, DELETE
- **Description:** CRUD operations for managing categories.

### Items
- **URL:** `/api/items/`
- **View:** `ItemViewSet`
- **Methods:** GET, POST, PUT, DELETE
- **Description:** CRUD operations for managing items.

### Bids
- **URL:** `/api/bids/`
- **View:** `BidViewSet`
- **Methods:** GET, POST, PUT, DELETE
- **Description:** CRUD operations for managing bids.

### User Info
- **URL:** `/api/userinfo/`
- **View:** `UserInfoViewSet`
- **Methods:** GET, POST, PUT, DELETE
- **Description:** CRUD operations for managing user information.


## Notes
- All API endpoints (except login and signup) are managed by Django Rest Framework's DefaultRouter.
- Authentication is required for all endpoints. Refer to the view implementations for details on permissions and authentication requirements.
- Access all Endpoints with POSTMAN or any other API tester and give Authorization Header the value of SuperUser Token you get from Admin panel to access all endpoints
- For detailed information on request/response formats and available actions, please refer to the individual ViewSet implementations.


# React Router Endpoints 

This document outlines the client-side routes defined in the React application using React Router.

## Base URL

```bash
localhost:3000/
```

## Routes

### Landing Page
- **Path:** `/`
- **Component:** `Landing`
- **Description:** The main landing page of the application.

### Products Page
- **Path:** `/products`
- **Component:** `Products`
- **Description:** Displays a list or grid of products.

### Product Details Page
- **Path:** `/products/:product_id`
- **Component:** `ProductDetails`
- **Description:** Shows detailed information for a specific product. The `product_id` is a dynamic parameter.

### About Page
- **Path:** `/about`
- **Component:** `About`
- **Description:** Provides information about the company or application.

### Services Page
- **Path:** `/services`
- **Component:** `Services`
- **Description:** Outlines the services offered by the company or application.

### Help Page
- **Path:** `/help`
- **Component:** `HelpPage`
- **Description:** Offers help and support information for users.

### Login Page
- **Path:** `/auth/login`
- **Component:** `Login`
- **Description:** Allows users to log into their accounts.

### Signup Page
- **Path:** `/auth/signup`
- **Component:** `Signup`
- **Description:** Allows new users to create an account.

### Terms Page
- **Path:** `/terms`
- **Component:** `Terms`
- **Description:** Displays the terms and conditions or terms of service.

### User Profile Page
- **Path:** `/profile`
- **Component:** `Profile`
- **Description:** Shows the user's profile information.

### Edit Profile Page
- **Path:** `/profile/edit`
- **Component:** `InformationForm`
- **Description:** Allows users to edit their profile information.

### Create Auction Page
- **Path:** `/createauction`
- **Component:** `ProductForm`
- **Description:** Provides a form for users to create a new auction or product listing.

## Notes
- Some Endpoints only accessible by Authenticated User so it will Redirect to ```/auth/login``` if the endpoint requires Authentication
## Authors

- [@Darshil0109](https://github.com/Darshil0109)


## Support

For support or Any Help Related to Access Projects Repositories, email darshil01092004@gmail.com. Follow for More Such Amazing Projects

