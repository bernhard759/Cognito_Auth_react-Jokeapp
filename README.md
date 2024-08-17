# React AWS Cognito Authentication

This project is a simple React application that demonstrates user authentication using AWS Cognito. The application allows users to sign up, verify their email, log in, and handle password change requirements. This is based on the blog [here](https://medium.com/@adi2308/aws-cognito-with-reactjs-for-authentication-c8916b873ccb).

## Features

- **User Signup**: Allows users to sign up using their email and password. After signing up, users must verify their email address using a code sent to their email.
- **Email Verification**: After signing up, users are prompted to enter a verification code sent to their email.
- **User Login**: Allows users to log in with their email and password. If the user's password needs to be changed (e.g., after account creation via the AWS Console), they are prompted to set a new password.
- **Dashboard**: After successful login or email verification, users are redirected to a protected dashboard.

## Technologies Used

- **React**: Frontend library for building the user interface.
- **AWS Cognito**: Used for managing user authentication and authorization.
- **MUI (Material-UI)**: Provides a set of components to create a modern, responsive UI.
- **react-hook-form**: Library for managing forms and validation.

## Setup and Installation

1. **Clone the Repository**:

2. **Install Dependencies**:
    Make sure you have Node.js and npm installed. Then, install the project dependencies:
    ```bash
    npm install
    ```

3. **AWS Cognito Setup**:
    - Create a User Pool in AWS Cognito.
    - Note down the `User Pool ID` and `App Client ID`.
    - Configure the environment variables or update the `userpool.js` file with your Cognito details.

4. **Run the Application**:
    Start the development server:
    ```bash
    npm start
    ```
    The application will be available at `http://localhost:5173`.

## Project Structure

- **src/components/Login.js**: The login component that handles user login and password change requirements.
- **src/components/Signup.js**: The signup component that handles user registration and email verification.
- **src/services/authenticate.js**: The service file that manages interaction with AWS Cognito for authentication.
- **src/userpool.js**: Configuration file for AWS Cognito User Pool.

## Usage

- **Sign Up**: Register a new account by providing an email and password.
- **Email Verification**: Enter the verification code sent to your email after signing up.
- **Login**: Log in with your email and password. If the account requires a password change, you'll be prompted to set a new password.
- **Dashboard**: Access the protected dashboard after successful login or email verification.
