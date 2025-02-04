// src/components/ValidationRules.ts
export const validateEmail = (email: string): string | null => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) ? null : "Invalid email format.";
  };
  
  export const validatePassword = (password: string): string | null => {
    if (password.length < 8) return "Password must be at least 8 characters.";
    if (!/[A-Z]/.test(password)) return "Must contain at least one uppercase letter.";
    if (!/[0-9]/.test(password)) return "Must contain at least one number.";
    return null;
  };
  
  export const validateUsername = (username: string): string | null => {
    return username.length >= 3 ? null : "Username must be at least 3 characters.";
  };
  
  export const validatePhone = (phone: string): string | null => {
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(phone) ? null : "Phone number must be 10 digits.";
  };
  
  export const validateGender = (gender: string): string | null => {
    return gender ? null : "Please select a gender.";
  };
  