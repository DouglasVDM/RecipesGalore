import React, { useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";

function SignIn() {
  const [user, setUser] = useState(null);


  // === STEP 1
  const googleLogin = useGoogleLogin({
    onSuccess: (codeResponse) => {
      // Send the authorization code to the backend server
      axios
        .post(
          "/auth",
          { code: codeResponse.code },
          {
            headers: {
              "Content-Type": "application/json",
              "Cross-Origin-Opener-Policy": "same-origin allow-popups",
            },
          }
        )
        .then((response) => {
          console.log("Backend response:", response.data);
          handleLoginSuccess(response.data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    },
    onError: () => {
      console.error("Google login failed");
    },
    flow: "auth-code",
  });


  // === STEP 2
  const handleLoginSuccess = (tokens) => {
    // tokens contain user details and the access token
    setUser({
      accessToken: tokens.access_token,
      refreshToken: tokens.refresh_token,
      profile: tokens.data.profile || {},
    });

    // Store the access token in local storage for persistence
    localStorage.setItem("accessToken", tokens.access_token);
  };
  

  // === STEP 3
  const handleLogout = () => {
    // Clear user data from state
    setUser(null);
    // Clear user data from local storage
    localStorage.removeItem("accessToken");

    // API call to backend to logout the user
    axios
      .post("/auth/logout")
      .then(() => {
        console.log("User logged out");
      })
      .catch((error) => {
        console.error("Logout error:", error);
      });
  };
  return (
    <div>
      {user ? (
        <div>
          <h4>Welcome, {user.profile ? user.profile.name : "User"}</h4>

          <p>{user.profile ? user.profile.email : "Email"}</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <button className="rounded-pill btn btn-light" onClick={googleLogin}> Sign in with Google 🚀</button>
      )}
    </div>
  );
}

export default SignIn;
