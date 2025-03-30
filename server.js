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
  if (validationError) {
    logger.error(`Addition error: Invalid input - num1=${num1}, num2=${num2}`);
    return res.status(400).json(validationError);
  }
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
  if (num2 === 0) {
    logger.error(`Division error: Division by zero - num1=${num1}, num2=${num2}`);
    return res.status(400).json({ error: "Division by zero is not allowed." });
  }
  res.json({ result: num1 / num2 });
});

//Exponentian (Power)
app.get("/power", (req, res) => {
  const num1 = parseFloat(req.query.num1);
  const num2 = parseFloat(req.query.num2);
  logger.log({
    level: "info",
    message: `New exponentiation operation requested: ${num1} ^ ${num2}`,
  });
  const validationError = validateNumbers(num1, num2);
  if (validationError) {
    logger.error(`Power error: Invalid input - num1=${req.query.num1}, num2=${req.query.num2}`);
    return res.status(400).json(validationError);
  }

});

//Square root
app.get("/sqrt", (req, res) => {
  const num = parseFloat(req.query.num);

  logger.log({
    level: "info",
    message: `New square root operation requested: √${num}`,
  });

  if (isNaN(num)) {
    logger.error(`Sqrt error: Invalid input - num=${req.query.num}`);
    return res.status(400).json({ error: "Invalid input: num must be a number." });
  }

  if (num < 0) {
    logger.error(`Sqrt error: Square root of negative number not allowed - num=${num}`);
    return res.status(400).json({ error: "Square root of negative number is not allowed." });
  }

  res.json({ result: Math.sqrt(num) });
});

app.get("/modulo", (req, res) => {
  const num1 = parseFloat(req.query.num1);
  const num2 = parseFloat(req.query.num2);

  logger.log({
    level: "info",
    message: `New modulo operation requested: ${num1} % ${num2}`,
  });

  const validationError = validateNumbers(num1, num2);
  if (validationError) {
    logger.error(`Modulo error: Invalid input - num1=${req.query.num1}, num2=${req.query.num2}`);
    return res.status(400).json(validationError);
  }

  if (num2 === 0) {
    logger.error(`Modulo error: Modulo by zero - num1=${num1}, num2=${num2}`);
    return res.status(400).json({ error: "Modulo by zero is not allowed." });
  }

  res.json({ result: num1 % num2 });
});

// Error handling for invalid routes
app.use((req, res) => {
  logger.error(`Invalid endpoint accessed: ${req.originalUrl}`);
  res.status(404).json({
    error:
      "Invalid endpoint. Use /add, /subtract, /multiply, /divide, /power, /sqrt, or /modulo with the appropriate parameters",
  });
});

// server start
app.listen(port, () => {
  console.log(`Calculator microservice is running on http://localhost:${port}`);
});