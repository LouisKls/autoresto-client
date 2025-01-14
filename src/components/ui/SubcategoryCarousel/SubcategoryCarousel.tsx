import React, { useState } from 'react';
import styles from './SubcategoryCarousel.module.scss';
import { Subcategory } from '@/data/types';
import { CategoryButton } from '@components/ui/CategoryButton/CategoryButton';

interface SubcategoryCarouselProps {
  subcategories: Subcategory[];
  selectedSubcategory: string;
  onSelectSubcategory: (subcatId: string) => void;
  visibleCount?: number;
}

const SubcategoryCarousel: React.FC<SubcategoryCarouselProps> = ({
                                                                   subcategories,
                                                                   selectedSubcategory,
                                                                   onSelectSubcategory,
                                                                   visibleCount = 5,
                                                                 }) => {
  const [startIndex, setStartIndex] = useState(0);

  const handleNext = () => {
    if (startIndex + visibleCount < subcategories.length) {
      setStartIndex(startIndex + 1);
    }
  };

  const handlePrev = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
    }
  };

  const visibleSubcats = subcategories.slice(startIndex, startIndex + visibleCount);

  return (
    <div className={styles.carouselContainer}>
      {visibleSubcats.map((subcat) => (
        <div key={subcat.id} className={styles.subcat}>
        <CategoryButton imageLink={subcat.icon} label={subcat.label} selected={subcat.id === selectedSubcategory} onClick={() => onSelectSubcategory(subcat.id)}/>
        </div>
      ))}
    </div>
  );
};

export default SubcategoryCarousel;
