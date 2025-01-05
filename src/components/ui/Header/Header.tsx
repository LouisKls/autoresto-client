import React from 'react';
import styles from './Header.module.scss';
import { IconButton } from '@components/ui/IconButton/IconButton';
import {
  ShoppingCart,
  Menu,
  Car
} from 'lucide-react';
import { useRouter } from 'next/navigation';

interface HeaderProps {
  onLeftMenuToggle: () => void;
  onRightCartToggle: () => void;
  mobile?: boolean;
}

const Header: React.FC<HeaderProps> = ({ onLeftMenuToggle, onRightCartToggle, mobile }) => {
  const router = useRouter();

  const handleCarMode = () => {
    router.push('/accueil');
  };

  return (
    <header className={[
      styles.header,
      mobile ? styles.mobileHeader : '',
      ].join(' ')}
    >
      <IconButton onClick={onLeftMenuToggle} square>
        <Menu color={"white"} />
      </IconButton>

      <div className={styles.searchBar}>
        <input type="text" placeholder="Rechercher un produit..." />
      </div>

      <div className={styles.rightButtons}>
        <IconButton onClick={handleCarMode} square>
          <Car color={"white"} />
        </IconButton>
        <IconButton onClick={onRightCartToggle} disabled={false} square>
          <ShoppingCart color={"white"} />
        </IconButton>
      </div>
    </header>
  );
};

export default Header;
