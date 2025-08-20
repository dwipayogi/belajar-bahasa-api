import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./src/routes/userRoutes.ts";
import questionAnswerRoutes from "./src/routes/questionAnswerRoutes.ts";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

// Body parsing middleware with size limits and better error handling
app.use((req, res, next) => {
  // Skip body parsing for GET requests completely
  if (req.method === "GET") {
    return next();
  }

  express.json({ limit: "10mb" })(req, res, (err) => {
    if (err) {
      if (err.type === "entity.parse.failed") {
        return res.status(400).json({
          success: false,
          error: "Invalid JSON in request body",
        });
      }
      if (err.type === "entity.too.large") {
        return res.status(413).json({
          success: false,
          error: "Request body too large",
        });
      }
      if (err.message.includes("content length")) {
        return res.status(400).json({
          success: false,
          error: "Request size did not match content length",
        });
      }
      return res.status(400).json({
        success: false,
        error: "Bad request",
      });
    }
    next();
  });
});

app.use((req, res, next) => {
  // Skip URL encoded parsing for GET requests completely
  if (req.method === "GET") {
    return next();
  }

  express.urlencoded({ extended: true, limit: "10mb" })(req, res, (err) => {
    if (err) {
      if (err.type === "entity.too.large") {
        return res.status(413).json({
          success: false,
          error: "Request body too large",
        });
      }
      if (err.message.includes("content length")) {
        return res.status(400).json({
          success: false,
          error: "Request size did not match content length",
        });
      }
      return res.status(400).json({
        success: false,
        error: "Bad request",
      });
    }
    next();
  });
});

// Root route
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to Belajar Bahasa API",
  });
});

// API routes
app.use("/api/users", userRoutes);
app.use("/api/answer", questionAnswerRoutes);

// 404 handler
app.use("*", (req, res) => {
  res.status(404).json({
    success: false,
    error: "Endpoint not found",
  });
});

// Error handler
app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error(err.stack);
    res.status(500).json({
      success: false,
      error: "Something went wrong!",
    });
  }
);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

export default app;
