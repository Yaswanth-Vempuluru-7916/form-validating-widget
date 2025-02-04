import { useState, useCallback } from 'react';
import { useDebounce } from './useDebounce';
import { validateField } from '../utils/validators';
import { ValidationRules } from '../types';

interface UseFormValidation<T> {
  values: T;
  errors: Record<keyof T, string>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (onSubmit: (values: T) => void) => (e: React.FormEvent) => void;
}

export const useFormValidation = <T extends Record<string, string>>(
  initialState: T,
  validationRules: Record<keyof T, ValidationRules>
): UseFormValidation<T> => {
  const [values, setValues] = useState<T>(initialState);
  const [errors, setErrors] = useState<Record<keyof T, string>>({} as Record<keyof T, string>);

  const debouncedValidate = useDebounce((name: keyof T, value: string) => {
    const error = validateField(name as string, value, validationRules[name]);
    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
  }, 300);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setValues((prevValues) => ({ ...prevValues, [name]: value }));
      debouncedValidate(name as keyof T, value);
    },
    [debouncedValidate]
  );

  const handleSubmit = (onSubmit: (values: T) => void) => (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<keyof T, string> = {} as Record<keyof T, string>;

    (Object.keys(values) as (keyof T)[]).forEach((name) => {
      const error = validateField(name as string, values[name], validationRules[name]);
      if (error) {
        newErrors[name] = error;
      }
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      onSubmit(values);
    }
  };

  return { values, errors, handleChange, handleSubmit };
};
