import React from 'react';
import styles from './LeftMenu.module.scss';
import { IconButton } from '@components/ui/IconButton/IconButton';
import { X } from 'lucide-react';

interface LeftMenuProps {
  onClose: () => void;
  mobile?: boolean;
}

const LeftMenu: React.FC<LeftMenuProps> = ({ onClose, mobile }) => {
  return (
    <div className={[
      styles.leftMenuContent,
      mobile ? styles.mobileMenu : '',
      ].join(' ')}
    >
      <div className={styles.leftMenuHeader}>
        <div className={styles.leftMenuTitle}>Menu</div>
        <div className={styles.leftMenuCloseButton}>
          <IconButton
            square
            onClick={onClose}
          >
            <X color={"white"} />
          </IconButton>
        </div>
      </div>
      <ul>
        <li>Profil</li>
        <li>Paramètres</li>
        <li>Déconnexion</li>
      </ul>
    </div>
  );
};

export default LeftMenu;
