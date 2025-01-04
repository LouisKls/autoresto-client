import React from 'react';
import styles from './CategoryTabs.module.scss';
import { Category } from '@/data/types';

interface CategoryTabsProps {
  categories: Category[];
  selectedCategory: string;
  onSelectCategory: (catId: string) => void;
  mobile?: boolean;
}

const CategoryTabs: React.FC<CategoryTabsProps> = ({
                                                     categories,
                                                     selectedCategory,
                                                     onSelectCategory,
                                                     mobile
                                                   }) => {
  return (
    <div className={[
      styles.categoryTabs,
      mobile ? styles.mobileCategoryTabs : '',
    ].join(' ')}>
      {categories.map((cat) => (
        <button
          key={cat.id}
          className={
            cat.id === selectedCategory ? `${styles.tab} ${styles.active}` : styles.tab
          }
          onClick={() => onSelectCategory(cat.id)}
        >
          {cat.label}
        </button>
      ))}
    </div>
  );
};

export default CategoryTabs;
