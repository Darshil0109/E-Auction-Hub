---
# E-Auction HUB

## Overview

**E-Auction HUB** is a web application designed to facilitate online auctions. It leverages Django for a powerful backend and React for an interactive frontend, providing a seamless user experience for auction management and participation.

## Technologies Used

- **Django**: A high-level Python web framework for rapid development and clean design.
- **React**: A JavaScript library for building user interfaces, especially single-page applications.
- **Django REST Framework**: A toolkit for building Web APIs in Django.
- **Webpack**: A module bundler for JavaScript applications.
- **Axios**: A promise-based HTTP client for making requests from the frontend.

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

## Setup Instructions

### Backend (Django)

1. **Clone the repository:**

   Open Command Prompt (cmd) or PowerShell (Windows) or a terminal (Linux/Mac) and run:

   ```bash
   git clone https://github.com/Darshil0109/E-Auction-Hub.git
   cd E-Auction-HUB/backend
   ```

2. **Create and activate a virtual environment:**

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

3. **Install the required packages:**

   ```bash
   pip install -r requirements.txt
   ```

4. **Run migrations:**

   ```bash
   python manage.py migrate
   ```

5. **Create a superuser (optional but recommended):**

   ```bash
   python manage.py createsuperuser
   ```

6. **Start the Django development server:**

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

## API Endpoints

- **GET /api/items/**: Retrieve a list of auction items.
- **POST /api/items/**: Create a new auction item.
- **GET /api/items/{id}/**: Retrieve details of a specific auction item.
- **PUT /api/items/{id}/**: Update a specific auction item.
- **DELETE /api/items/{id}/**: Delete a specific auction item.

## Additional Notes

- **Database Migrations**: Whenever there are changes to the database model or when registering a new model, remember to run migrations:

  ```bash
  python manage.py makemigrations
  python manage.py migrate
  ```

- **Image Handling**: To handle images in the application, make sure to install the Pillow library:

  ```bash
  pip install pillow
  ```
