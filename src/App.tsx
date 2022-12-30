import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import AnimatedRoutes from "./components/AnimatedRoutes";

function App() {
  return (
    <>
      <Router>
        <div>
          <AnimatedRoutes/>
        </div>
      </Router>
    </>
  );
}

export default App;
