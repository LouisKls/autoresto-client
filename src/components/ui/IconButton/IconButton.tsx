import styles from './IconButton.module.scss';
import classNames from 'classnames';
import { JSX, MouseEventHandler } from 'react';
import { ButtonColor } from '@components/ui/Button/Button';

export interface IconButtonProps {
  square?: boolean;
  disabled?: boolean;
  small?: boolean;
  color?: ButtonColor;
  children: JSX.Element;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export const IconButton = ({
  onClick,
  square,
  disabled,
  small,
  color = 'primary',
  children,
}: IconButtonProps) => {
  return (
    <button
      onClick={!disabled ? onClick : undefined}
      className={classNames(styles.root, styles[color], square ? styles.square : styles.circle, disabled && styles.disabled, small && styles.small)}
    >
      {children}
    </button>
  );
};
