import React from "react";
import Register from "./components/Register";
import Login from "./components/Auth/Login";
import Logout from "./components/Auth/Logout";
import { useAuth } from "./contexts/AuthContext";

const AppContent = () => {
  const { currentUser } = useAuth();

  return (
    <div>
      {currentUser ? (
        <div>
          <h2>Welcome, {currentUser.email}</h2>
          <Logout />
        </div>
      ) : (
        <>
          <Register />
          <Login />
        </>
      )}
    </div>
  );
};

const App = () => {
  return <AppContent />;
};

export default App;
