const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();
const session = require("express-session");

const { OAuth2Client } = require("google-auth-library");

const client = new OAuth2Client(process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID);
console.log(client);

const app = express();
app.use(express.json());
app.use(cors());

// Session middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

// === Route handler for handling authentication requests
app.post("/auth", async (req, res) => {
  try {
    const { code } = req.body;
    const client_id = process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID;
    const client_secret = process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_SECRET;
    const redirect_uri = "postmessage";
    const grant_type = "authorization_code";

    // === Exchange authorization code for tokens
    const tokenResponse = await axios.post(
      "https://oauth2.googleapis.com/token",
      new URLSearchParams({
        code,
        client_id,
        client_secret,
        redirect_uri,
        grant_type,
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const tokens = tokenResponse.data;
    console.log("Tokens:", tokens);

    // === Retrieve user profile information using the access token
    const profileResponse = await axios.get(
      "https://www.googleapis.com/oauth2/v3/userinfo",
      {
        headers: {
          Authorization: `Bearer ${tokens.access_token}`,
        },
      }
    );

    const profile = profileResponse.data;
    console.log("User profile:", profile);

    // Store user data in session
    req.session.user = {
      tokens,
      profile,
    };

    // Send the combined data back to the frontend
    res.json({ message: "Login successful", data: req.session.user });
  } catch (error) {
    console.error("Token exchange error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Logout endpoint
app.post("/auth/logout", (req, res) => {
  // Destroy the session to logout the user
  req.session.destroy((err) => {
    if (err) {
      console.error("Logout error:", err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      console.log("User logged out");
      res.json({ message: "Logout successful" });
    }
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is ready at http://localhost:${PORT}`);
});
