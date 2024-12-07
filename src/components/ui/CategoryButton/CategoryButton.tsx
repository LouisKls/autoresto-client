import styles from './CategoryButton.module.scss';
import { MouseEventHandler } from 'react';
import classNames from 'classnames';

export interface CategoryButtonProps {
  label: string;
  altImage?: string;
  imageLink: string;
  selected?: boolean;
  onClick?: MouseEventHandler<HTMLDivElement>;
}

export const CategoryButton = ({
  label,
  altImage,
  imageLink,
  selected,
  onClick,
}: CategoryButtonProps) => {
  return (
    <div className={styles.buttonContainer} onClick={onClick}>
      <div className={classNames(styles.categoryButton, selected && styles.selected)}>
        <div className={styles.categoryImage}>
          <img
            alt={altImage}
            src={imageLink}
          />
        </div>
        <div className={styles.categoryLabel}>{label}</div>
      </div>
    </div>
  );
};
