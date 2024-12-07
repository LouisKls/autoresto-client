'use client';

import { get } from 'lodash';
import React, { ReactNode, createContext, useContext } from 'react';
import { FieldErrors } from 'react-hook-form';

export type FormError = { message: string; type: string };
export type FormErrors = Record<string, FormError>;

export interface FormContextValue {
  errors: FormErrors;
}

export const FormContext = createContext<FormContextValue>({ errors: {} });

export const useFormContext = (
  name?: string
): FormContextValue & { error?: FormError } => {
  const context = useContext(FormContext);

  if (name) {
    return {
      ...context,
      error: get(context.errors, name),
    };
  }

  return context;
};

export interface FormProps
  extends React.DetailedHTMLProps<
    React.FormHTMLAttributes<HTMLFormElement>,
    HTMLFormElement
  > {
  errors: FieldErrors;
  children: ReactNode;
}

export const Form = ({ errors, children, ...props }: FormProps) => {
  return (
    <FormContext.Provider value={{ errors: errors as FormErrors }}>
      <form {...props}>{children}</form>
    </FormContext.Provider>
  );
};
