# Calculator Microservice  
**SIT737 - Cloud Native Application Development**  
**Task 4.1P: Building a Simple Calculator Microservice**

---

## Overview

This microservice provides basic calculator functionalities via a REST API, including addition, subtraction, multiplication, and division. Built with Node.js and Express. Winston is used for logging.

---

## Features

- Supports four operations: addition, subtraction, multiplication, division  
- Accepts two numbers via query parameters (`num1`, `num2`)  
- Logs all incoming requests  
- Error handling for invalid inputs and division by zero  

---

## Prerequisites

- [Node.js](https://nodejs.org/en/download/)  
- [Git](https://git-scm.com/downloads)  
- [Visual Studio Code](https://code.visualstudio.com/)  
- (Optional) [Postman](https://www.postman.com/) or browser for testing  

---

## Setup Instructions

1. **Clone the repository**

   ```bash
   git clone https://github.com/username/sit737-2025-prac4p.git
   cd sit737-2025-prac4p
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Run the microservice**

   ```bash
   node index.js
   ```

---

## API Endpoints

All endpoints use `GET` requests with two query parameters: `num1` and `num2`

| Operation     | Endpoint      | Example Request                   |
|---------------|---------------|-----------------------------------|
| Addition      | `/add`        | `/add?num1=10&num2=5`             |
| Subtraction   | `/subtract`   | `/subtract?num1=10&num2=5`        |
| Multiplication| `/multiply`   | `/multiply?num1=6&num2=7`         |
| Division      | `/divide`     | `/divide?num1=20&num2=4`          |
![image](https://github.com/user-attachments/assets/c9f99873-c6f6-4e2c-a7e7-0e59ccbd9635)

---

## Error Handling

- Missing or invalid parameters return:  
  `{ "error": "Invalid input: num1 and num2 must be numbers." }`

- Division by zero returns:  
  `{ "error": "Division by zero is not allowed." }`

- Invalid endpoint returns:  
  `{ "error": "Invalid endpoint. Use /add, /subtract, /multiply, or /divide with num1 and num2 as query parameters." }`

---

## Logging (Winston)

The microservice logs:

- Operation type and input values  
- Request method and path  
- Errors (invalid input, division by zero)

### Log Files

- All logs: `logs/combined.log`  
- Errors only: `logs/error.log`

### View live logs:

```Git Bash
tail -f logs/combined.log
```

---

## Project Structure

```
sit737-2025-prac4p/
├── index.js
├── package.json
├── logs/
│   ├── combined.log
│   └── error.log
```

---
