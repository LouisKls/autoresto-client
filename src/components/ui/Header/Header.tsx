import React from 'react';
import styles from './Header.module.scss';
import { IconButton } from '@components/ui/IconButton/IconButton';
import {
  ShoppingCart,
  Menu
} from 'lucide-react';

interface HeaderProps {
  onLeftMenuToggle: () => void;
  onRightCartToggle: () => void;
}

const Header: React.FC<HeaderProps> = ({ onLeftMenuToggle, onRightCartToggle }) => {
  return (
    <header className={styles.header}>
      <IconButton onClick={onLeftMenuToggle} className={styles.menuToggleBtn} square>
        <Menu color={"white"} />
      </IconButton>

      <div className={styles.searchBar}>
        <input type="text" placeholder="Rechercher un produit..." />
      </div>

      <IconButton onClick={onRightCartToggle} className={styles.cartToggleBtn} disabled={false} square>
        <ShoppingCart color={"white"} />
      </IconButton>
    </header>
  );
};

export default Header;
