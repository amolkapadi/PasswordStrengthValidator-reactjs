import React, { useState } from "react";
import "./App.css"; // Custom styling file

function App() {
  const [password, setPassword] = useState("");
  const [strength, setStrength] = useState(0);
  const [showPassword, setShowPassword] = useState(false);

  const evaluatePasswordStrength = (password) => {
    let strengthScore = 0;
    if (password.length >= 9) strengthScore += 25; // 9 characters or more
    if (/[a-z]/.test(password)) strengthScore += 25; // Lowercase letters
    if (/[A-Z]/.test(password)) strengthScore += 25; // Uppercase letters
    if (/[0-9]/.test(password)) strengthScore += 15; // Numbers
    if (/[^a-zA-Z0-9]/.test(password)) strengthScore += 10; // Symbols
    setStrength(strengthScore);
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    evaluatePasswordStrength(newPassword);
  };

  const handleShowPasswordChange = () => {
    setShowPassword(!showPassword);
  };

  const getProgressColor = () => {
    if (strength < 50) return "bg-danger"; // Red for weak
    if (strength < 75) return "bg-warning"; // Yellow for medium
    return "bg-success"; // Green for strong
  };

  const getStrengthText = () => {
    if (strength < 50) return "Weak";
    if (strength < 75) return "Medium";
    return "Strong";
  };

  return (
    <div className="password-card">
      <h2>Password Strength Validator</h2>
      <input
        type={showPassword ? "text" : "password"}
        className="password-input"
        value={password}
        onChange={handlePasswordChange}
        placeholder="Enter your password"
      />
      <div className="show-password-checkbox mt-2">
        <label>
          <input
            type="checkbox"
            checked={showPassword}
            onChange={handleShowPasswordChange}
          />{" "}
          Show Password
        </label>
      </div>
      <div className="password-strength-text mt-2">
        {password && <span>{getStrengthText()}</span>}
      </div>
      <div className="progress mt-3">
        <div
          className={`progress-bar ${getProgressColor()}`}
          role="progressbar"
          style={{ width: `${strength}%` }}
          aria-valuenow={strength}
          aria-valuemin="0"
          aria-valuemax="100"
        ></div>
      </div>
    </div>
  );
}

export default App;
