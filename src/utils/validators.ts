import { ValidationRules } from '../types';

export const validateField = (name: string, value: string, rules: ValidationRules): string => {
  if (rules.required && !value.trim()) {
    return `${name} is required`;
  }
  if (rules.minLength && value.length < rules.minLength) {
    return `${name} must be at least ${rules.minLength} characters long`;
  }
  if (rules.maxLength && value.length > rules.maxLength) {
    return `${name} must be no more than ${rules.maxLength} characters long`;
  }
  if (rules.pattern && !rules.pattern.test(value)) {
    return `${name} is invalid`;
  }
  return '';
};
