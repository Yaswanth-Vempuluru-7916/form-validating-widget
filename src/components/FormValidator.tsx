import React from 'react';
import FormField from './FormField';
import ErrorMessage from './ErrorMessage';
import { useFormValidation } from '../hooks/useFormValidation';
import { ValidationRules } from '../types';

interface FieldConfig<T extends string> {
  name: T;
  label: string;
  type: string;
  validationRules: ValidationRules;
}

interface FormValidatorProps<T extends string> {
  fields: FieldConfig<T>[];
  onSubmit: (values: Record<T, string>) => void;
}

const FormValidator = <T extends string>({ fields, onSubmit }: FormValidatorProps<T>) => {
  const initialValues = fields.reduce(
    (acc, field) => ({ ...acc, [field.name]: '' }),
    {} as Record<T, string>
  );

  const validationSchema = fields.reduce(
    (acc, field) => ({ ...acc, [field.name]: field.validationRules }),
    {} as Record<T, ValidationRules>
  );

  const { values, errors, handleChange, handleSubmit } = useFormValidation(initialValues, validationSchema);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto">
      {fields.map((field) => (
        <FormField
          key={field.name}
          label={field.label}
          name={field.name}
          type={field.type}
          value={values[field.name]}
          onChange={handleChange}
          error={errors[field.name]}
        />
      ))}
      {Object.values(errors).some((error) => error) && (
        <ErrorMessage message="Please correct the errors before submitting." />
      )}
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      >
        Submit
      </button>
    </form>
  );
};

export default FormValidator;
