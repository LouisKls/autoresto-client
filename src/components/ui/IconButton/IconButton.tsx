import styles from './IconButton.module.scss';
import classNames from 'classnames';
import { JSX, MouseEventHandler } from 'react';

export interface IconButtonProps {
  square?: boolean;
  disabled?: boolean;
  children: JSX.Element;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export const IconButton = ({
  onClick,
  square,
  disabled,
  children,
}: IconButtonProps) => {
  return (
    <button
      onClick={!disabled ? onClick : undefined}
      className={classNames(styles.root, square ? styles.square : styles.circle, disabled && styles.disabled)}
    >
      {children}
    </button>
  );
};
