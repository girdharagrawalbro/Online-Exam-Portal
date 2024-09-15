# Online Exam Portal

This project is an online exam portal built using React.js for the frontend and Node.js for the backend. It includes a robust authentication system, allows administrators to perform CRUD operations on exams and questions, and provides users with the ability to take exams and view their results. The project showcases advanced state management techniques using React Context.

Live in [https://onlineexamgirdhar.netlify.app/]

## Features

- **Authentication System**: Secure login and registration using token-based authentication.
- **Admin Panel**: Perform CRUD operations on exams and questions.
- **User Interaction**: Users can take exams, view their results, and manage their profiles.
- **State Management**: Utilizes React Context for efficient state management and data flow.
- **Backend API**: Node.js backend for handling authentication, exams, and user data.

## Getting Started

### Prerequisites

- Node.js (>=14.x)
- npm or Yarn

### Installation

1. **Install frontend dependencies**:

    ```bash
    npm install
    ```

2. **Install backend dependencies**:

    ```bash
    cd backend
    npm install
    ```

3. **Setup Environment Variables**

    Create a `.env` file in the `server` directory with the following variables:

    ```plaintext
    PORT=5000
    JWT_SECRET=your_jwt_secret
    URI=your_database_uri
    ```

4. **Run the application**:

    - Start the backend server:

        ```bash
        cd backend
        node index.js
        ```

    - Start the frontend client:

        ```bash
        npm start
        ```

    The application should now be running on `https://onlineexamgirdhar.netlify.app/` for the frontend and `https://onlineexam-rcrg.onrender.com` for the backend API.

## Usage

### Admin Features

- **Create, Read, Update, Delete (CRUD)**: Manage exams and questions via the admin panel.
- **View and Edit Exams**: Admins can view all exams, add new ones, edit existing exams, or delete them.
- **Manage Questions**: Admins can add, edit, or remove questions for each exam.

### User Features

- **Take Exams**: Users can attempt exams available in the portal.
- **View Results**: After completing an exam, users can view their results and performance.

## Technologies Used

- **Frontend**: React.js, React Context, Bootstrap
- **Backend**: Node.js, Express.js, MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **State Management**: React Context API

## Contributing

If you'd like to contribute to this project, please fork the repository and submit a pull request with your proposed changes. Make sure to adhere to the coding standards used in the project and include tests for any new features.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [React](https://reactjs.org/)
- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)
- [JWT](https://jwt.io/)

Feel free to modify any sections to better fit your project’s specifics!
