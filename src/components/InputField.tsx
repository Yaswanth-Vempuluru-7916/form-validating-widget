// src/components/InputField.tsx
import React, { useState } from "react";
import {
  validateEmail,
  validatePassword,
  validateUsername,
  validatePhone,
  validateGender,
} from "./ValidationRules";

interface InputFieldProps {
  label: string;
  type: "text" | "email" | "password" | "tel" | "select";
  name: string;
  options?: string[]; // For select dropdown
  placeholder?: string;
  required?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  type,
  name,
  options,
  placeholder,
  required,
}) => {
  const [value, setValue] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleValidation = (val: string) => {
    let validationError: string | null = null;
    switch (type) {
      case "email":
        validationError = validateEmail(val);
        break;
      case "password":
        validationError = validatePassword(val);
        break;
      case "text":
        validationError = validateUsername(val);
        break;
      case "tel":
        validationError = validatePhone(val);
        break;
      case "select":
        validationError = validateGender(val);
        break;
      default:
        break;
    }
    setError(validationError);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setValue(e.target.value);
    handleValidation(e.target.value);
  };

  return (
    <div className="relative w-full">
      <label
        className={`block text-sm font-medium transition-all ${
          error ? "text-red-500" : "text-gray-700"
        }`}
      >
        {label}
      </label>

      {type === "select" ? (
        <select
          name={name}
          className={`w-full p-2 border ${
            error ? "border-red-500" : "border-gray-300"
          } rounded-lg outline-none focus:ring-2 focus:ring-blue-500 transition-all`}
          onChange={handleChange}
          value={value}
        >
          <option value="">Select</option>
          {options?.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      ) : (
        <div className="relative">
          <input
            type={showPassword ? "text" : type}
            name={name}
            value={value}
            placeholder={placeholder}
            onChange={handleChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className={`w-full p-2 border ${
              error ? "border-red-500" : "border-gray-300"
            } rounded-lg outline-none focus:ring-2 ${
              isFocused ? "focus:ring-blue-500 scale-105" : "focus:ring-gray-300"
            } transition-all`}
          />
          {type === "password" && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 top-2 text-gray-500"
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          )}
        </div>
      )}

      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

export default InputField;
