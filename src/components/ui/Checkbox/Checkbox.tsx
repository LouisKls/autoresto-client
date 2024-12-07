'use client';

import styles from './Checkbox.module.scss';
import * as RadixCheckbox from '@radix-ui/react-checkbox';
import { Label } from '@radix-ui/react-label';
import { Check } from 'lucide-react';
import { forwardRef } from 'react';

export interface CheckboxProps extends RadixCheckbox.props {
  label?: string;
  disabled?: boolean;
}

export const Checkbox = forwardRef<HTMLButtonElement, CheckboxProps>(
  ({ label, required, name, ...props }, ref) => {
    return (
      <div className={styles.checkboxContainer}>
        <RadixCheckbox.Root
          {...props}
          name={name}
          className={styles.checkboxRoot}
          ref={ref}
          id={name && 'checkbox-' + name}
          style={{ cursor: props.disabled ? 'unset' : undefined }}
        >
          <RadixCheckbox.Indicator className={styles.indicator}>
            <Check size={14} strokeWidth={4} />
          </RadixCheckbox.Indicator>
        </RadixCheckbox.Root>
        {label && (
          <Label
            htmlFor={name && 'checkbox-' + name}
            style={{ cursor: props.disabled ? 'unset' : undefined }}
          >
            {label + (required ? '*' : '')}
          </Label>
        )}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';
