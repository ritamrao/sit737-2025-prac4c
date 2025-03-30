const express = require("express");
const winston = require("winston");

const app = express();
const port = 3000;

const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  defaultMeta: { service: "calculator-microservice" },
  transports: [
    new winston.transports.Console({
      format: winston.format.simple(),
    }),
    new winston.transports.File({ filename: "logs/error.log", level: "error" }),
    new winston.transports.File({ filename: "logs/combined.log" }),
  ],
});

app.use(express.json());

// Function to validate inputs
const validateNumbers = (num1, num2) => {
  if (isNaN(num1) || isNaN(num2)) {
    return { error: "Invalid input: num1 and num2 must be numbers." };
  }
  return null;
};

// Addition
app.get("/add", (req, res) => {
  const num1 = parseFloat(req.query.num1);
  const num2 = parseFloat(req.query.num2);
  logger.log({
    level: "info",
    message: `New addition operation requested: ${num1} + ${num2}`,
  });
  const validationError = validateNumbers(num1, num2);
  if (validationError) return res.status(400).json(validationError);
  res.json({ result: num1 + num2 });
});

// Subtraction
app.get("/subtract", (req, res) => {
  const num1 = parseFloat(req.query.num1);
  const num2 = parseFloat(req.query.num2);
  logger.log({
    level: "info",
    message: `New subtraction operation requested: ${num1} - ${num2}`,
  });
  const validationError = validateNumbers(num1, num2);
  if (validationError) return res.status(400).json(validationError);
  res.json({ result: num1 - num2 });
});

// Multiplication
app.get("/multiply", (req, res) => {
  const num1 = parseFloat(req.query.num1);
  const num2 = parseFloat(req.query.num2);
  logger.log({
    level: "info",
    message: `New multiplication operation requested: ${num1} * ${num2}`,
  });
  const validationError = validateNumbers(num1, num2);
  if (validationError) return res.status(400).json(validationError);
  res.json({ result: num1 * num2 });
});

// Division
app.get("/divide", (req, res) => {
  const num1 = parseFloat(req.query.num1);
  const num2 = parseFloat(req.query.num2);
  logger.log({
    level: "info",
    message: `New division operation requested: ${num1} / ${num2}`,
  });
  const validationError = validateNumbers(num1, num2);
  if (validationError) return res.status(400).json(validationError);
  if (num2 === 0)
    return res.status(400).json({ error: "Division by zero is not allowed." });
  res.json({ result: num1 / num2 });
});

// Error handling for invalid routes
app.use((req, res) => {
  res.status(404).json({
    error:
      "Invalid endpoint. Use /add, /subtract, /multiply, or /divide with num1 and num2 as query parameters.",
  });
});

// server start
app.listen(port, () => {
  console.log(`Calculator microservice is running on http://localhost:${port}`);
});