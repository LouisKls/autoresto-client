import styles from './Label.module.scss';
import { Label as RadixLabel } from '@radix-ui/react-label';
import classNames from 'classnames';
import Link from 'next/link';
import React, { PropsWithChildren } from 'react';

export interface LabelProps {
  name?: string;
  label?: string;
  inline?: boolean;
  fullWidth?: boolean;
  required?: boolean;
  link?: { label: string; href: string };
}

export const Label = ({
  name,
  link,
  label,
  inline,
  fullWidth,
  children,
  required,
}: PropsWithChildren<LabelProps>) => {
  return (
    <div
      className={classNames(
        styles.root,
        inline && styles.inline,
        fullWidth && styles.fullWidth
      )}
    >
      {label && (
        <div className={styles.labelContainer}>
          <RadixLabel htmlFor={name}>
            {label + (required ? '*' : '')}
          </RadixLabel>
          {link && (
            <Link href={link.href} tabIndex={-1}>
              {link.label}
            </Link>
          )}
        </div>
      )}
      {children}
    </div>
  );
};
