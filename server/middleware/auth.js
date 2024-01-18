// Import the 'jsonwebtoken' library
import jwt from "jsonwebtoken";

// Define a middleware function named 'verifyToken' with asynchronous handling
export const verifyToken = async (req, res, next) => {
  try {
    // Extract the token from the 'Authorization' header in the request
    let token = req.header("Authorization");

    // Check if the token is missing
    if (!token) {
      // If the token is missing, send a 403 Forbidden response
      return res.status(403).send("Access Denied");
    }

    // Check if the token starts with "Bearer "
    if (token.startsWith("Bearer ")) {
      // If it does, remove "Bearer " from the token string
      token = token.slice(7, token.length).trimLeft();
    }

    // Verify the token using the 'jsonwebtoken' library and the provided secret key
    const verified = jwt.verify(token, process.env.JWT_SECRET);

    // Attach the decoded user information from the token to the request object
    req.user = verified;

    // Call the 'next' function to proceed to the next middleware or route handler
    next();
  } catch (err) {
    // If an error occurs during token verification, send a 500 Internal Server Error response
    res.status(500).json({ error: err.message });
  }
};
