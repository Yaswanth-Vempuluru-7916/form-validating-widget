# Form Validating Widget

![Form Widget](public\assets\images\form-widget.png)

A customizable and reusable form validation widget built with React, TypeScript, and Tailwind CSS. This widget includes advanced validation, error handling, micro-animations, and customizable styles, all in a production-ready npm package.

# Form Validating Widget

A customizable and reusable form validation widget built with React, TypeScript, and Tailwind CSS. This widget includes advanced validation, error handling, micro-animations, and customizable styles, all in a production-ready npm package.

## Features

- **Customizable form fields** with various input types: text, email, password, tel, and select.
- **Advanced Validation** for email, password, username, phone, and gender.
- **Error Handling** with error messages displayed under each field.
- **Debouncing & Throttling** for optimized form input handling.
- **Tailwind CSS** for utility-first styling, with customizable styles.
- **Production-Ready** and fully typed with TypeScript.
- **Micro-animations** using CSS for smooth transitions and interactions.

## Installation

To install the package, run the following npm command:

```bash
npm install form-validating-widget
```

Alternatively, if you're using yarn:

```bash
yarn add form-validating-widget
```

## Usage

### Importing Components

```tsx
import { Form, InputField, useValidation } from "form-validating-widget";
```

### Example Usage

Here’s a sample `App.tsx` to demonstrate how to use the package:

```tsx
import { useState, useCallback } from "react";
import { Form, InputField, useValidation, debounce, throttle } from "form-validating-widget";

interface FormValues {
  [key: string]: string;
}

const App = () => {
  const { values, errors, handleChange } = useValidation();
  const [submittedData, setSubmittedData] = useState<FormValues | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const requiredFields = ["email", "password", "username", "phone", "gender"];
    const hasEmptyFields = requiredFields.some(field => !values[field]);
    const hasErrors = Object.values(errors).some(error => error !== null);

    if (!hasEmptyFields && !hasErrors) {
      setSubmittedData({ ...values });
      alert("Form submitted successfully!");
    } else {
      alert("Please fill all fields and fix any errors before submitting!");
    }
  };

  // Apply debounce and throttle to handleChange
  const debouncedHandleChange = useCallback(
    debounce((name: string, value: string, type: string) => {
      handleChange(name, value, type);
    }, 500),
    [handleChange]
  );

  const throttledHandleChange = useCallback(
    throttle((name: string, value: string, type: string) => {
      handleChange(name, value, type);
    }, 1000),
    [handleChange]
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-8">
      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
            Registration Form
          </h2>

          <Form onSubmit={handleSubmit}>
            <InputField
              label="Email"
              name="email"
              value={values.email || ""}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                debouncedHandleChange("email", e.target.value, "email")
              }
              error={errors.email}
              type="email"
              placeholder="Enter your email"
            />

            <InputField
              label="Password"
              name="password"
              value={values.password || ""}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                throttledHandleChange("password", e.target.value, "password")
              }
              error={errors.password}
              type="password"
              placeholder="Enter your password"
            />

            <InputField
              label="Username"
              name="username"
              value={values.username || ""}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                debouncedHandleChange("username", e.target.value, "text")
              }
              error={errors.username}
              type="text"
              placeholder="Enter your username"
            />

            <InputField
              label="Phone"
              name="phone"
              value={values.phone || ""}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                throttledHandleChange("phone", e.target.value, "tel")
              }
              error={errors.phone}
              type="tel"
              placeholder="Enter your phone number"
            />

            <InputField
              label="Gender"
              name="gender"
              value={values.gender || ""}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                debouncedHandleChange("gender", e.target.value, "select")
              }
              error={errors.gender}
              type="select"
              options={["Male", "Female", "Other"]}
            />

            <button type="submit" className="w-full bg-blue-500 text-white py-3 px-6 rounded-lg">
              Submit
            </button>
          </Form>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold mb-6 text-indigo-600">Submitted Data</h2>
          {submittedData ? (
            <pre className="p-4 bg-gray-100 rounded-lg text-gray-600">
              {JSON.stringify(submittedData, null, 2)}
            </pre>
          ) : (
            <p className="text-gray-500">No data submitted yet</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
```

### API

#### `Form`

A wrapper component to handle the form submission.

**Props:**
- `onSubmit`: The callback function that is triggered when the form is submitted. 

#### `InputField`

An individual input field component that can handle various input types (e.g., text, email, password, tel, select).

**Props:**
- `label`: The label for the input field.
- `name`: The name of the input field.
- `value`: The value of the input field.
- `onChange`: The callback to handle changes in the input.
- `error`: The error message, if any, to display below the input.
- `type`: The type of input (e.g., `text`, `email`, `password`, `tel`, `select`).
- `placeholder`: The placeholder text for the input (optional).
- `options`: An array of options for the select field (optional).

#### `useValidation`

A custom hook for form validation. This hook provides the current form values, errors, and a `handleChange` function to manage form input changes.

**Return Values:**
- `values`: The current values of the form fields.
- `errors`: The current errors for each form field.
- `handleChange`: The function to handle form input changes.

### Utilities

#### `debounce`

A utility function to debounce function calls.

**Usage:**

```ts
debounce((...args) => { /* function body */ }, delay);
```

- `func`: The function to debounce.
- `delay`: The delay in milliseconds.

#### `throttle`

A utility function to throttle function calls.

**Usage:**

```ts
throttle((...args) => { /* function body */ }, limit);
```

- `func`: The function to throttle.
- `limit`: The time interval (in milliseconds) for throttling.



