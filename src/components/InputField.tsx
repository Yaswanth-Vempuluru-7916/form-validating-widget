import React from "react";

interface InputFieldProps {
  label: string;
  type: "text" | "email" | "password" | "tel" | "select";
  name: string;
  options?: string[];
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  error?: string | null;
  placeholder?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  type,
  name,
  options,
  value,
  onChange,
  error,
  placeholder,
}) => {
  return (
    <div className="relative w-full group">
      <label className={`block text-sm font-medium mb-2 ${error ? "text-red-500" : "text-gray-700"}`}>
        {label}
      </label>

      {type === "select" ? (
        <select
          name={name}
          value={value}
          onChange={onChange}
          className={`w-full p-3 border-2 ${
            error ? "border-red-500" : "border-gray-200"
          } rounded-lg outline-none bg-white transition-all duration-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100`}
        >
          <option value="">Select</option>
          {options?.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          className={`w-full p-3 border-2 ${
            error ? "border-red-500" : "border-gray-200"
          } rounded-lg outline-none bg-white transition-all duration-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100`}
        />
      )}

      {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
    </div>
  );
};

export default InputField;
