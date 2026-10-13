import React, { useState } from "react";
import App from "./App.jsx";
import Login from "./Login.jsx";

export default function Root() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    () => sessionStorage.getItem("studentPortalLoggedIn") === "true"
  );

  function handleLogin() {
    sessionStorage.setItem("studentPortalLoggedIn", "true");
    setIsLoggedIn(true);
  }

  function handleLogout() {
    sessionStorage.removeItem("studentPortalLoggedIn");
    setIsLoggedIn(false);
  }

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  return <App onLogout={handleLogout} />;
}