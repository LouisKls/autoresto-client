'use client';

import styles from './TextField.module.scss';
import { useFormContext } from '@components/form/Form/Form';
import { Label, LabelProps } from '@components/ui/Label/Label';
import classNames from 'classnames';
import { Eye, EyeOff } from 'lucide-react';
import React, { forwardRef, useState } from 'react';

export interface TextFieldProps
  extends React.DetailedHTMLProps<
      React.InputHTMLAttributes<HTMLInputElement>,
      HTMLInputElement
    >,
    LabelProps {
  helperText?: string;
  prefix?: string;
}

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  (
    {
      inline,
      name,
      prefix,
      label,
      link,
      required,
      fullWidth,
      helperText,
      ...props
    },
    ref
  ) => {
    const [isPasswordShown, setIsPasswordShown] = useState<boolean>(false);
    const [inputType, setInputType] = useState<
      React.HTMLInputTypeAttribute | undefined
    >(props.type);
    const changePasswordIcon = () => {
      if (inputType === 'password') {
        setInputType('text');
      } else {
        setInputType('password');
      }
      setIsPasswordShown(!isPasswordShown);
    };

    const { error } = useFormContext(name);

    return (
      <Label
        inline={inline}
        name={name}
        label={label}
        required={required}
        fullWidth={fullWidth}
        link={link}
      >
        <div className={styles.inputContainer}>
          {prefix && <div className={styles.prefix}>{prefix}</div>}
          <input
            ref={ref}
            name={name}
            id={name}
            {...props}
            className={classNames(
              styles.input,
              error && styles.error,
              props.type === 'password' && styles.password,
              props.className,
              prefix && styles.inputWithPrefix
            )}
            type={inputType}
          />
          {props.type === 'password' && (
            <div className={styles.passwordIconContainer}>
              {!isPasswordShown ? (
                <Eye onClick={changePasswordIcon} strokeWidth={1.5} />
              ) : (
                <EyeOff onClick={changePasswordIcon} strokeWidth={1.5} />
              )}
            </div>
          )}
        </div>
        {(helperText || error) && (
          <span
            className={classNames(styles.helperText, error && styles.error)}
          >
            {error?.type ? "Error" : helperText}
          </span>
        )}
      </Label>
    );
  }
);

TextField.displayName = 'TextField';
