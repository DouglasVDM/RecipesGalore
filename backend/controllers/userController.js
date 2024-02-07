require("dotenv").config();
const axios = require("axios");

const signIn = async (req, res) => {
  try {
    const { code } = req.body;
    const client_id = process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID;
    const client_secret = process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_SECRET;
    const redirect_uri = "postmessage";
    const grant_type = "authorization_code";

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

    const profileResponse = await axios.get(
      "https://www.googleapis.com/oauth2/v3/userinfo",
      {
        headers: {
          Authorization: `Bearer ${tokens.access_token}`,
        },
      }
    );

    const profile = profileResponse.data;

    req.session.user = {
      tokens,
      profile,
    };

    res.json({ message: "Login successful", data: req.session.user });
  } catch (error) {
    console.error("Token exchange error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const logOut = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Logout error:", err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      console.log("User logged out");
      res.json({ message: "Logout successful" });
    }
  });
};

module.exports = { signIn, logOut };
