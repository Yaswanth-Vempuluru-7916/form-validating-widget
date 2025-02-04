// src/components/Form.tsx
import React from "react";
import InputField from "./InputField";

const Form: React.FC = () => {
  return (
    <div className="w-full max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Register</h2>

      <form className="space-y-4">
        <InputField label="Username" type="text" name="username" placeholder="Enter your username" />
        <InputField label="Email" type="email" name="email" placeholder="Enter your email" />
        <InputField label="Password" type="password" name="password" placeholder="Enter your password" />
        <InputField label="Phone" type="tel" name="phone" placeholder="Enter your phone number" />
        <InputField label="Gender" type="select" name="gender" options={["Male", "Female", "Other"]} />

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-all"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Form;
