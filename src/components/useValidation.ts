import { useState } from "react";
import {
  validateEmail,
  validatePassword,
  validateUsername,
  validatePhone,
  validateGender,
} from "./ValidationRules";

interface ValidationRules {
  [key: string]: (value: string) => string | null;
}

const validationFunctions: ValidationRules = {
  email: validateEmail,
  password: validatePassword,
  text: validateUsername,
  tel: validatePhone,
  select: validateGender,
};

const useValidation = () => {
  const [values, setValues] = useState<{ [key: string]: string }>({});
  const [errors, setErrors] = useState<{ [key: string]: string | null }>({});

  const validateField = (name: string, value: string, type: string) => {
    const validator = validationFunctions[type];
    if (validator) {
      setErrors((prev) => ({ ...prev, [name]: validator(value) }));
    }
  };

  const handleChange = (name: string, value: string, type: string) => {
    setValues((prev) => ({ ...prev, [name]: value }));
    validateField(name, value, type);
  };

  return { values, errors, handleChange, setValues };
};

export default useValidation;
