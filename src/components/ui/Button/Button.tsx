'use client';

import styles from './Button.module.scss';
import { LoadingIcon } from '@components/ui/Loading/Loading';
import { Colors } from '@/styles';
import classNames from 'classnames';
import React, { ReactNode } from 'react';

export type ButtonVariant = 'outlined' | 'contained';
export type ButtonColor =
  | 'danger'
  | 'success'
  | 'primary'
  | 'grey'
  | 'primaryLight'
  | 'blue'
  | 'orange';

export interface ButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  fullWidth?: boolean;
  variant?: ButtonVariant;
  loading?: boolean;
  children: ReactNode;
  thin?: boolean;
  color?: ButtonColor;
}

export const Button = ({
  fullWidth,
  variant = 'contained',
  color = 'primary',
  loading = false,
  children,
  disabled,
  onClick,
  thin,

  ...props
}: ButtonProps) => {
  return (
    <button
      {...props}
      disabled={disabled || loading}
      onClick={(e) => !loading && !disabled && onClick?.(e)}
      className={classNames(
        styles.button,
        styles[variant],
        styles[color],
        fullWidth && styles.fullWidth,
        thin && styles.thin,
        disabled && styles.disabled,
        props.className
      )}
    >
      <span>{children}</span>
      <LoadingIcon
        secondaryColor={Colors[color]}
        className={classNames(styles.loading, loading && styles.active)}
      />
    </button>
  );
};
