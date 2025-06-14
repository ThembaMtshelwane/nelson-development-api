# Nelson Development API

This repository contains the backend API for processing words, specifically sorting their letters alphabetically. It's built with Node.js, Express, and TypeScript, and includes robust validation and error handling.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Error Handling](#error-handling)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Word Processing**: Takes a word as input and returns its letters sorted alphabetically.
- **Data Validation**: Ensures that the input data adheres to the expected format `{ data: "your_word" }` using Zod.
- **Error Handling**: Centralized error handling for Zod validation errors and other server errors.
- **CORS Enabled**: Allows cross-origin requests.
- **Asynchronous Handling**: Uses `express-async-handler` for simplified asynchronous route handling.

## Installation

To get a local copy up and running, follow these simple steps.

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/ThembaMtshelwane/nelson-development-api.git
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

### `POST /`

**Description**: Processes a word by sorting its letters alphabetically.

---

### Request Body

**Content-Type:** `application/json`

```json
{
  "data": "example"
}
```

- `data` (string): The word to be processed. Must be a non-empty string.

---

### Success Response (200 OK)

```json
{
  "word": ["a", "e", "e", "l", "m", "p", "x"]
}
```

---

### Error Responses

#### Validation Error (400 Bad Request)

If the input does not match the schema `{ data: "word" }`, or if the data field is empty:

```json
{
  "success": false,
  "errors": [
    {
      "path": "data",
      "message": "Please enter a word, entry cannot be empty"
    }
  ],
  "message": "Validation Error"
}
```

If the `data` field is missing:

```json
{
  "success": false,
  "errors": [
    {
      "path": "data",
      "message": "Required"
    }
  ],
  "message": "Validation Error"
}
```

#### Server Error (500 Internal Server Error)

For unexpected errors during processing:

```json
{
  "message": "Error: No ordered letters"
}
```

or

```json
{
  "success": false,
  "message": "Server error",
  "stack": "..." // only in development
}
```

---

### Error Handling

The API includes centralized error handling middleware (`errorHandler`):

- **ZodError**: for validation issues, returns user-friendly messages.
- **Unhandled errors**: return a generic `"Server error"` message with a stack trace in development mode.

---

### Project Structure

```
.
├── src/
│   ├── constants/
│   │   └── env.const.ts               # Environment variables (e.g., PORT)
│   ├── controller/
│   │   └── wordProcess.controller.ts # Handles the word processing logic
│   ├── middleware/
│   │   ├── data.validator.ts         # Validates incoming request data
│   │   └── error.handling.ts         # Centralized error handling
│   ├── schema/
│   │   └── word.schema.ts            # Defines validation schemas
│   ├── services/
│   │   └── word.process.service.ts   # Core logic for sorting letters
│   └── types/                        # Type definitions
└── api/index.ts                      # Main application entry point
```
