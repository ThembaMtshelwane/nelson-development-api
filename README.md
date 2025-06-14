# Nelson Development API

This repository contains the backend API for processing words, specifically sorting their letters alphabetically. It's built with Node.js, Express, and TypeScript, and includes robust validation and error handling.

## Table of Contents

* [Features](#features)
* [Installation](#installation)
* [Usage](#usage)
* [API Endpoints](#api-endpoints)
* [Error Handling](#error-handling)
* [Project Structure](#project-structure)
* [Contributing](#contributing)
* [License](#license)

## Features

* **Word Processing**: Takes a word as input and returns its letters sorted alphabetically.
* **Data Validation**: Ensures that the input data adheres to the expected format `{ data: "your_word" }` using Zod.
* **Error Handling**: Centralized error handling for Zod validation errors and other server errors.
* **CORS Enabled**: Allows cross-origin requests.
* **Asynchronous Handling**: Uses `express-async-handler` for simplified asynchronous route handling.

## Installation

To get a local copy up and running, follow these simple steps.

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/ThembaMtshelwane/nelson-development-api.git](https://github.com/ThembaMtshelwane/nelson-development-api.git)
    ```
2.  **Navigate to the project directory:**
    ```bash
    cd nelson-development-api
    ```
3.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

## Usage

1.  **Set up environment variables:**
    Create a `.env` file in the root directory and add the following:
    ```
    PORT=5000 # Or any desired port
    NODE_ENV=development # or production
    ```
2.  **Start the development server:**
    ```bash
    npm run dev
    # or
    yarn dev
    ```
    The server will typically run on `http://localhost:5000` (or your specified `PORT`).

## API Endpoints

### `GET /`

**Description**: Welcomes you to the API.
**Response**: