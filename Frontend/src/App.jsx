import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Welcome from "./components/welcome.jsx";
import ClickSafeRegistration from "./components/Register.jsx";
import ClickSafeSignIn from "./components/Sign.jsx"

// Pages
const Home = () => <h1>Home Page</h1>;
const About = () => <h1>About Page</h1>;
const Contact = () => <h1>Contact Page</h1>;
const NotFound = () => <h1>404 - Page Not Found</h1>;

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} /> {/* ✅ Fixed here */}
        <Route path="/register" element={<ClickSafeRegistration />} />
        <Route path="/Login" element={<ClickSafeSignIn />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
