# 🌟 DotNotes

**DotNotes** is a modern platform to manage your notes efficiently. With support for multiple languages and an intuitive design, this app is ideal for organising your ideas, tasks and projects.

---

## 🚀 Features

* Note management
    * Create, read, update and delete your notes.
* Multilingual support
    * Switch between English and Spanish automatically or manually depending on the browser language.
* Secure authentication
    * Registration and login with secure password handling and JWT-based authentication.
* Modern interface
    * Designed with React and Tailwind CSS for a fluid and responsive user experience.
* REST API
    * Built with Node.js and Express, offering robust endpoints.
* Database
    * Data storage in MongoDB, optimised for fast and secure operations.

## 📦 Installation and Configuration

### Prerequisites

* Node.js v.20 or higher.
* MongoDB: An active MongoDB database.
* NPM or Yarn: To manage dependencies.

### Clone the repository

~~~
git clone https://github.com/anmamebo/dotnotes
cd dotnotes
~~~

### Configure the Backend

1. Go to the backend folder:
~~~
cd backend
~~~

2. Install the dependencies:
~~~
npm install
~~~

3. Create an `.env` file based on `.env.example`:
~~~
cp .env.example .env
~~~

Fill in the necessary environment variables:
* `MONGODB_URI`: URL of your MongoDB database.
* `JWT_SECRET`: Secret key for JWT.
* `PORT`: Server port.

4. Run the server
~~~
npm start
~~~

### Configure the Frontend

1. Go to the frontend folder:
~~~
cd frontend
~~~

2. Install the dependencies:
~~~
npm install
~~~

3. Configure the `.env.development` file. Create the file if it does not exist and define the base URL of the backend:
~~~
VITE_API_URL=http://localhost:<PORT>/api
~~~

4. Run the development server:
~~~
npm run dev
~~~

## 🛠️ Technologies Used

### Frontend
* React
* Tailwind CSS
* i18next

### Backend
* Node.js and Express
* MongoDB with Mongoose
* i18next
* JWT

## 📋 API Endpoints

### Auth
* `POST /auth/register` - Register a new user.
* `POST /auth/login` - Log in.
* `GET /auth/me` - Obtain authenticated user information.

### Notes
* `POST /notes` - Create a new note.
* `GET /notes` - Get all notes from the user.
* `PUT /notes/:id` - Update an existing note.
* `DELETE /notes/:id` - Delete a note.

## 🌍 Languages Supported

* English
* Spanish

The language is automatically selected according to the browser settings, but can be changed manually from within the application.

## 🤝 Contributions

Contributions are welcome! If you want to improve this project:

1. Make a fork of the repository.
2. Create a branch for your feature or fix:
~~~
git checkout -b feature/new-feature
~~~
3. Send a pull request.

## 📜 Licence

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.

## 📬 Contact

* Developer: Antonio Manuel
* GitHub: @anmamebo
* Email: anmamebo2001@gmail.com